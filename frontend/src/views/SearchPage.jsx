import {useSearchParams, useNavigate} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function SearchPage() {
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] =  useSearchParams();
    const [searchResults, setSearchResults] = useState();
    const fromDateInput = useRef();
    const toDateInput = useRef();
    const source = useRef();
    const navigate = useNavigate();
    let searchRender = [];

    useEffect(() =>{
        const searchPayload = {
            searchInput: searchParams.get('q'),
            fromdateInput: searchParams.get('fromdateInput'),
            todateInput: searchParams.get('todateInput'),
            source: searchParams.get('source')
        }
        setLoading(true)
        setSearchResults(null)
        axiosClient.post('/search', searchPayload)
            .then(({data}) => {
                setLoading(false)
                if(data.articles){
                    Object.keys(data.articles).map(key => {
                        searchRender.push({
                            title: data.articles[key].title,
                            description: data.articles[key].description,
                            image: data.articles[key].urlToImage,
                            source: data.articles[key].source.name,
                            published_at: data.articles[key].publishedAt
                        })
                    });
                }else if(searchParams.get('source') === 'new_york_times') {
                    Object.keys(data.response.docs).map(key => {
                        searchRender.push({
                            title: data.response.docs[key].headline.main,
                            description: data.response.docs[key].snippet,
                            image: (data.response.docs[key].multimedia[0] ? 'https://www.nytimes.com/' + data.response.docs[key].multimedia[0].url : null),
                            source: data.response.docs[key].source.name,
                            published_at: data.response.docs[key].pub_date
                        })
                    });
                }else{
                    Object.keys(Object.assign({}, data.response.results)).map(key => {
                        searchRender.push({
                            title: data.response.results[key].webTitle,
                            description: null,
                            image: null,
                            source: data.response.results[key].sectionName,
                            published_at: data.response.results[key].webPublicationDate
                        })
                    });
                }
                setSearchResults(searchRender)
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    },[searchParams])

    const onNewsClick = (e) => {
        e.preventDefault()
        navigate({
            pathname: '/singleArticle',
            search: 'id=123&source=newsApi'
        })
    }
    const onFilter = (e) => {
        e.preventDefault()
        const searchPayload = {
            q: searchParams.get('q'),
            fromdateInput: fromDateInput.current.value,
            todateInput: toDateInput.current.value,
            source: source.current.value
        }
        setSearchParams(searchPayload)
    }
    return(
        <div>
            {console.log(searchResults)}
            {loading &&
                <div id="preloader-active">
                    <div className="preloader d-flex align-items-center justify-content-center">
                        <div className="preloader-inner position-relative">
                            <div className="preloader-circle"></div>
                            <div className="preloader-img pere-text">
                                <img src="assets/img/logo/logo.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-lg-12">
                    <div className="single_sidebar_widget " style={{padding: '15px'}}>
                        <h4 className="widget_title">Filters</h4>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <input ref={fromDateInput} type='date' className="form-control" style={{width: '140px', flex: 'unset'}} />
                                <input ref={toDateInput} type='date' className="form-control" style={{width: '140px', flex: 'unset'}} />
                                    <select ref={source} className="form-control " style={{width: '140px', flex: 'unset'}}>
                                        <option value="news_api">News Api</option>
                                        <option value="guardian">Guardian</option>
                                        <option value="new_york_times">New York Times</option>
                                    </select>
                                <div className="input-group-append">
                                    <button className="btns btn-filter" type="button" onClick={onFilter} style={{cursor: 'pointer'}}>
                                        <i className="ti-filter"> </i>Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mb-5 mb-lg-0">
                    <div className="blog_left_sidebar">
                        {searchResults &&
                            Object.keys(searchResults).map(key => (
                            <article key={key} className="blog_item">
                                <div className="blog_item_img">
                                    <img className="card-img rounded-0" src={searchResults[key].image} alt="" />
                                    {searchResults[key].image &&
                                        <a href="#" className="blog_item_date">
                                            <p>{searchResults[key].source}</p>
                                        </a>
                                    }
                                </div>
                                <div className="blog_details">
                                    <a className="d-inline-block" onClick={onNewsClick}>
                                        <h2>{searchResults[key].title}</h2>
                                    </a>
                                    <p>{searchResults[key].description}</p>
                                    <ul className="blog-info-link">
                                        <li><a href="#javascript.void(0)"><i className="fa fa-user"></i>
                                            Source: {searchResults[key].source}</a></li>
                                        <li><a href="#javascript.void(0)"><i className="fa fa-calendar"></i>{searchResults[key].published_at}</a></li>
                                    </ul>
                                </div>
                            </article>
                        ))}
                        <nav className="blog-pagination justify-content-center d-flex">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a href="#" className="page-link" aria-label="Previous">
                                        <i className="ti-angle-left"></i>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">1</a>
                                </li>
                                <li className="page-item active">
                                    <a href="#" className="page-link">2</a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link" aria-label="Next">
                                        <i className="ti-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="blog_right_sidebar">
                        <aside className="single_sidebar_widget post_category_widget">
                            <h4 className="widget_title">Category</h4>
                            <ul className="list cat-list">
                                <li>
                                    <a href="#" className="d-flex">
                                        <p>Resaurant food</p>
                                        <p>(37)</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-flex">
                                        <p>Travel news</p>
                                        <p>(10)</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-flex">
                                        <p>Modern technology</p>
                                        <p>(03)</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-flex">
                                        <p>Product</p>
                                        <p>(11)</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-flex">
                                        <p>Inspiration</p>
                                        <p>21</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-flex">
                                        <p>Health Care (21)</p>
                                        <p>09</p>
                                    </a>
                                </li>
                            </ul>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget">
                            <h3 className="widget_title">Recent Post</h3>
                            <div className="media post_item">
                                <img src="assets/img/post/post_1.png" alt="post" />
                                    <div className="media-body">
                                        <a href="#">
                                            <h3>From life was you fish...</h3>
                                        </a>
                                        <p>January 12, 2019</p>
                                    </div>
                            </div>
                            <div className="media post_item">
                                <img src="assets/img/post/post_2.png" alt="post" />
                                    <div className="media-body">
                                        <a href="#">
                                            <h3>The Amazing Hubble</h3>
                                        </a>
                                        <p>02 Hours ago</p>
                                    </div>
                            </div>
                            <div className="media post_item">
                                <img src="assets/img/post/post_3.png" alt="post" />
                                    <div className="media-body">
                                        <a href="#">
                                            <h3>Astronomy Or Astrology</h3>
                                        </a>
                                        <p>03 Hours ago</p>
                                    </div>
                            </div>
                            <div className="media post_item">
                                <img src="assets/img/post/post_4.png" alt="post" />
                                    <div className="media-body">
                                        <a href="#">
                                            <h3>Asteroids telescope</h3>
                                        </a>
                                        <p>01 Hours ago</p>
                                    </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget tag_cloud_widget">
                            <h4 className="widget_title">Tag Clouds</h4>
                            <ul className="list">
                                <li>
                                    <a href="#">project</a>
                                </li>
                                <li>
                                    <a href="#">love</a>
                                </li>
                                <li>
                                    <a href="#">technology</a>
                                </li>
                                <li>
                                    <a href="#">travel</a>
                                </li>
                                <li>
                                    <a href="#">restaurant</a>
                                </li>
                                <li>
                                    <a href="#">life style</a>
                                </li>
                                <li>
                                    <a href="#">design</a>
                                </li>
                                <li>
                                    <a href="#">illustration</a>
                                </li>
                            </ul>
                        </aside>
                        <aside className="single_sidebar_widget instagram_feeds">
                            <h4 className="widget_title">Instagram Feeds</h4>
                            <ul className="instagram_row flex-wrap">
                                <li>
                                    <a href="#">
                                        <img className="img-fluid" src="assets/img/post/post_5.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img className="img-fluid" src="assets/img/post/post_6.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img className="img-fluid" src="assets/img/post/post_7.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img className="img-fluid" src="assets/img/post/post_8.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img className="img-fluid" src="assets/img/post/post_9.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img className="img-fluid" src="assets/img/post/post_10.png" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}

