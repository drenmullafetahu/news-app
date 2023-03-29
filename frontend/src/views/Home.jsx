import axiosClient from "../axios-client.js";
import {useRef,useState,useEffect} from "react";

export default function Home() {
    const [sources, setSources] = useState([]);
    const [sourceNews, setSourceNews] = useState([]);
    const [categoryNews, setcategoryNews] = useState([]);
    const [activeCategory, setActiveCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{

        onGetSources();
        onGetSelectedCategories();
        onGetSelectedSources();
    },[])

    const onGetSources = (ev) => {
        axiosClient.post('/getSources')
            .then((data) => {
                setSources(data.data.sources)
            })
    }
    const onGetSelectedCategories = (ev) => {
        axiosClient.post('/getSelectedCategories')
            .then((data) => {
                let categories = [];
                Object.keys(data.data.result).map(key => {
                    categories.push(data.data.result[key].category_id);
                })
                setSelectedCategories(categories)
            })
    }
    const onGetSelectedSources = (ev) => {
        axiosClient.post('/getSelectedSources')
            .then((data) => {
                let sources = [];
                Object.keys(data.data.result).map(key => {
                    sources.push(data.data.result[key].source_id);
                })
                setSelectedSources(sources)
            })
    }

    const onSetSelectedCategories = (category) => {
        if(!selectedCategories.includes(category)){
            setSelectedCategories([...selectedCategories,category])
        }else{
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        }
        onCategoryNews(category)

    }

    const onCategoryNews = (category) => {
        setLoading(true)
        const categoryPayload = {
            category_id: category
        }
        axiosClient.post('/getCategoryNews',categoryPayload)
            .then((data) => {
                setcategoryNews(data.data.articles)
                setLoading(false)
            })
    }
    const onSourceNews = (id) => {
        setLoading(true)
        setSelectedSources([id])

            const sourceNewsPayload = {
                source_id: id
            }
        axiosClient.post('/getSourceNews', sourceNewsPayload)
            .then((data) => {
                setSourceNews(data.data.articles)
                setLoading(false)
            })
    }
    return(
        <div>
            <section className="whats-news-area pt-50 pb-20 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="whats-news-wrapper">
                                <div className="row justify-content-between align-items-end mb-15">
                                    <div className="col-xl-4">
                                        <div className="section-tittle mb-30">
                                            <h3>Whats New</h3>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-md-9">
                                        <div className="properties__button">
                                            <nav>
                                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                    {Object.keys(selectedCategories).map(key => (
                                                        <a className="nav-item nav-link active" id="nav-home-tab"
                                                           data-toggle="tab" href={'#'+ selectedCategories[key]} role="tab"
                                                           aria-controls={selectedCategories[key]} aria-selected="true" onClick={() => onCategoryNews(selectedCategories[key])}>{selectedCategories[key]}</a>
                                                    ))}
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="tab-content" id="nav-tabContent">
                                                <div className="tab-pane fade show active" id={activeCategory} role="tabpanel"
                                                     aria-labelledby="nav-home-tab">
                                                    <div className="row">
                                                        {categoryNews[Object.keys(categoryNews)[0]] &&
                                                            <div className="col-xl-6 col-lg-12">
                                                                <div className="whats-news-single mb-40 mb-40">
                                                                    <div className="whates-img">
                                                                        <img
                                                                            src={(categoryNews[Object.keys(categoryNews)[0]]) ? categoryNews[Object.keys(categoryNews)[0]].urlToImage : '' }
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="whates-caption">
                                                                        <h4><a href={categoryNews[Object.keys(categoryNews)[0]].url}>{categoryNews[Object.keys(categoryNews)[0]].title}</a></h4>
                                                                        <span>by {categoryNews[Object.keys(categoryNews)[0]].author}</span>
                                                                        <p>{categoryNews[Object.keys(categoryNews)[0]].description}.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="col-xl-6 col-lg-12">
                                                            <div className="row">
                                                                {Object.keys(categoryNews.slice(1, 5)).map(key => (
                                                                    <div className="col-xl-12 col-lg-6 col-md-6 col-sm-10">
                                                                        <div className="whats-right-single mb-20">
                                                                            <div className="whats-right-img">
                                                                                <img
                                                                                    style={{width: '170px'}}
                                                                                    src={(categoryNews[Object.keys(categoryNews)[key]]) ? categoryNews[Object.keys(categoryNews)[key]].urlToImage : '' }
                                                                                    alt="" />
                                                                            </div>
                                                                            <div className="whats-right-cap">
                                                                                <span className="colorb">{categoryNews[key].source.name}</span>
                                                                                <h4><a href={categoryNews[Object.keys(categoryNews)[key]].url}>{categoryNews[key].title}.</a></h4>
                                                                                <p>{categoryNews[key].author}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-heading">Choose your Categories</h3>
                                <div className="button-group-area mt-40">
                                    <a href="javascript:void(0)" onClick={() => onSetSelectedCategories('business')} className={(selectedCategories.includes("business")) ? 'primary genric-btn medium' : 'primary-border genric-btn medium'}>Business</a>
                                    <a href="javascript:void(0)" className={(selectedCategories.includes("entertainment")) ? 'primary genric-btn medium' : 'primary-border genric-btn medium'} onClick={() => onSetSelectedCategories('entertainment')}>Entertainment</a>
                                    <a href="javascript:void(0)" className={(selectedCategories.includes("science")) ? 'primary genric-btn medium' : 'primary-border genric-btn medium'} onClick={() => onSetSelectedCategories('science')}>Science</a>
                                    <a href="javascript:void(0)" className={(selectedCategories.includes("sports")) ? 'primary genric-btn medium' : 'primary-border genric-btn medium'} onClick={() => onSetSelectedCategories('sports')}>Sports</a>
                                    <a href="javascript:void(0)" className={(selectedCategories.includes("technology")) ? 'primary genric-btn medium' : 'primary-border genric-btn medium'} onClick={() => onSetSelectedCategories('technology')}>Technology</a>
                                </div>
                            </div>
                            <div className="banner-one mt-20 mb-30">
                                <img src="assets/img/gallery/body_card1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-follow mb-45">
                                <div className="single-box">
                                    <div className="follow-us d-flex align-items-center">
                                        <div className="follow-social">
                                            <a href="#"><img src="assets/img/news/icon-fb.png" alt="" /></a>
                                        </div>
                                        <div className="follow-count">
                                            <span>8,045</span>
                                            <p>Fans</p>
                                        </div>
                                    </div>
                                    <div className="follow-us d-flex align-items-center">
                                        <div className="follow-social">
                                            <a href="#"><img src="assets/img/news/icon-tw.png" alt="" /></a>
                                        </div>
                                        <div className="follow-count">
                                            <span>8,045</span>
                                            <p>Fans</p>
                                        </div>
                                    </div>
                                    <div className="follow-us d-flex align-items-center">
                                        <div className="follow-social">
                                            <a href="#"><img src="assets/img/news/icon-ins.png" alt="" /></a>
                                        </div>
                                        <div className="follow-count">
                                            <span>8,045</span>
                                            <p>Fans</p>
                                        </div>
                                    </div>
                                    <div className="follow-us d-flex align-items-center">
                                        <div className="follow-social">
                                            <a href="#"><img src="assets/img/news/icon-yo.png" alt="" /></a>
                                        </div>
                                        <div className="follow-count">
                                            <span>8,045</span>
                                            <p>Fans</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="most-recent-area">
                                <div className="small-tittle mb-20">
                                    <h4>Most Recent</h4>
                                </div>
                                <div className="most-recent mb-40">
                                    <div className="most-recent-img">
                                        <img src="assets/img/gallery/most_recent.png" alt="" />
                                        <div className="most-recent-cap">
                                            <span className="bgbeg">Vogue</span>
                                            <h4><a href="#">What to Wear: 9+ Cute Work <br/>
                                                Outfits to Wear This.</a></h4>
                                            <p>Jhon | 2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="most-recent-single">
                                    <div className="most-recent-images">
                                        <img src="assets/img/gallery/most_recent1.png" alt="" />
                                    </div>
                                    <div className="most-recent-capt">
                                        <h4><a href="#">Scarlett’s disappointment at latest
                                            accolade</a></h4>
                                        <p>Jhon | 2 hours ago</p>
                                    </div>
                                </div>
                                <div className="most-recent-single">
                                    <div className="most-recent-images">
                                        <img src="assets/img/gallery/most_recent2.png" alt="" />
                                    </div>
                                    <div className="most-recent-capt">
                                        <h4><a href="#">Most Beautiful Things to Do in Sidney with
                                            Your BF</a></h4>
                                        <p>Jhon | 3 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="weekly2-news-area pt-50 pb-30 gray-bg">
                <div className="container">
                    <div className="weekly2-wrapper">
                        <div className="row">

                            <div className="col-lg-3">
                                <div className="home-banner2 d-none d-lg-block">
                                    <img src="assets/img/gallery/body_card2.png" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="slider-wrapper">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="small-tittle mb-30">
                                                <h4>Top trending Sources</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="weekly2-news-active d-flex">
                                                {Object.keys(sourceNews.slice(0, 4)).map(key => (
                                                    <div className="weekly2-single">
                                                        <div className="weekly2-img">
                                                            <img src={sourceNews[key].urlToImage} alt="" />
                                                        </div>
                                                        <div className="weekly2-caption">
                                                            <h4><a href="#">{sourceNews[key].title}</a></h4>
                                                            <p>{sourceNews[key].source.name} </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="text-heading">Choose your Source</h5>
                                    <div className="button-group-area mt-40">
                                        {Object.keys(sources.slice(0, 26)).map(key => (
                                            <a href="javascript:void(0)" onClick={() => onSourceNews(sources[key].id)} className={(selectedSources.includes(sources[key].id)) ? 'primary genric-btn small' : 'primary-border genric-btn small'}>{sources[key].name}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="banner-area gray-bg pt-90 pb-90">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10">
                                <div className="banner-one">
                                    <img src="assets/img/gallery/body_card3.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
