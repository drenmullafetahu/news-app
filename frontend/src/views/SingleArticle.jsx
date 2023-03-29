import {Navigate, Outlet, useSearchParams, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useRef, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function SingleArticle() {

    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] =  useSearchParams();
    const [searchResults, setSearchResults] = useState();
    const navigate = useNavigate();

    useEffect(() =>{
        const searchPayload = {
            source: searchParams.get('source'),
            articleId: searchParams.get('id')
        }
        setLoading(true)
        setSearchResults(null)

        axiosClient.post('/search', searchPayload)
            .then(({data}) => {
                setLoading(false)
                if(data.articles){
                    setSearchResults(data.articles)
                }else{
                    setSearchResults(data)
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    },[searchParams])

    const onNewsClick = (e) => {
        e.preventDefault()


        navigate({
            pathname: '/singleNews',
            search: 'id=123'
        })
    }

    return(
        <div>
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
            <section className="blog_area single-post-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 posts-list">
                            <div className="single-post">
                                <div className="feature-img">
                                    <img className="img-fluid" src="assets/img/blog/single_blog_1.png" alt="" />
                                </div>
                                <div className="blog_details">
                                    <h2>Second divided from form fish beast made every of seas
                                        all gathered us saying he our
                                    </h2>
                                    <ul className="blog-info-link mt-3 mb-4">
                                        <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                                        <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
                                    </ul>
                                    <p className="excert">
                                        MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you
                                        should have to spend money on boot camp when you can get the MCSE study
                                        materials yourself at a
                                        fraction of the camp price. However, who has the willpower
                                    </p>
                                    <p>
                                        MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you
                                        should have to spend money on boot camp when you can get the MCSE study
                                        materials yourself at a
                                        fraction of the camp price. However, who has the willpower to actually sit
                                        through a
                                        self-imposed MCSE training. who has the willpower to actually
                                    </p>
                                    <div className="quote-wrapper">
                                        <div className="quotes">
                                            MCSE boot camps have its supporters and its detractors. Some people do not
                                            understand why you
                                            should have to spend money on boot camp when you can get the MCSE study
                                            materials yourself at
                                            a fraction of the camp price. However, who has the willpower to actually sit
                                            through a
                                            self-imposed MCSE training.
                                        </div>
                                    </div>
                                    <p>
                                        MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you
                                        should have to spend money on boot camp when you can get the MCSE study
                                        materials yourself at a
                                        fraction of the camp price. However, who has the willpower
                                    </p>
                                    <p>
                                        MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you
                                        should have to spend money on boot camp when you can get the MCSE study
                                        materials yourself at a
                                        fraction of the camp price. However, who has the willpower to actually sit
                                        through a
                                        self-imposed MCSE training. who has the willpower to actually
                                    </p>
                                </div>
                            </div>
                            <div className="navigation-top">
                                <div className="d-sm-flex justify-content-between text-center">
                                    <p className="like-info"><span className="align-middle"><i
                                        className="fa fa-heart"></i></span> Lily and 4
                                        people like this</p>
                                    <ul className="social-icons">
                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-dribbble"></i></a></li>
                                        <li><a href="#"><i className="fab fa-behance"></i></a></li>
                                    </ul>
                                </div>
                                <div className="navigation-area">
                                    <div className="row">
                                        <div
                                            className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                            <div className="thumb">
                                                <a href="#">
                                                    <img className="img-fluid" src="assets/img/post/preview.png" alt="" />
                                                </a>
                                            </div>
                                            <div className="arrow">
                                                <a href="#">
                                                    <span className="lnr text-white ti-arrow-left"></span>
                                                </a>
                                            </div>
                                            <div className="detials">
                                                <p>Prev Post</p>
                                                <a href="#">
                                                    <h4>Space The Final Frontier</h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                            <div className="detials">
                                                <p>Next Post</p>
                                                <a href="#">
                                                    <h4>Telescopes 101</h4>
                                                </a>
                                            </div>
                                            <div className="arrow">
                                                <a href="#">
                                                    <span className="lnr text-white ti-arrow-right"></span>
                                                </a>
                                            </div>
                                            <div className="thumb">
                                                <a href="#">
                                                    <img className="img-fluid" src="assets/img/post/next.png" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-author">
                                <div className="media align-items-center">
                                    <img src="assets/img/blog/author.png" alt="" />
                                        <div className="media-body">
                                            <a href="#">
                                                <h4>Harvard milan</h4>
                                            </a>
                                            <p>Second divided from form fish beast made. Every of seas all gathered use
                                                saying you're, he
                                                our dominion twon Second divided from</p>
                                        </div>
                                </div>
                            </div>
                            <div className="comments-area">
                                <h4>05 Comments</h4>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/img/comment/comment_1.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    Multiply sea night grass fourth day sea lesser rule open subdue
                                                    female fill which them
                                                    Blessed, give fill lesser bearing multiply sea night grass fourth
                                                    day sea lesser
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">Emilly Blunt</a>
                                                        </h5>
                                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a href="#" className="btn-reply text-uppercase">reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/img/comment/comment_2.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    Multiply sea night grass fourth day sea lesser rule open subdue
                                                    female fill which them
                                                    Blessed, give fill lesser bearing multiply sea night grass fourth
                                                    day sea lesser
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">Emilly Blunt</a>
                                                        </h5>
                                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a href="#" className="btn-reply text-uppercase">reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/img/comment/comment_3.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    Multiply sea night grass fourth day sea lesser rule open subdue
                                                    female fill which them
                                                    Blessed, give fill lesser bearing multiply sea night grass fourth
                                                    day sea lesser
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">Emilly Blunt</a>
                                                        </h5>
                                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a href="#" className="btn-reply text-uppercase">reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog_right_sidebar">
                                <aside className="single_sidebar_widget search_widget">
                                    <form action="#">
                                        <div className="form-group">
                                            <div class="single-element-widget mt-30">
                                                <h3 class="mb-20">Filters</h3>
                                                <div class="default-select" id="default-select">
                                                <select>
                                                    <option value="1">English</option>
                                                    <option value="1">Spanish</option>
                                                    <option value="1">Arabic</option>
                                                    <option value="1">Portuguise</option>
                                                    <option value="1">Bengali</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder='Search Keyword'
                                                       onFocus="this.placeholder = ''"
                                                       onBlur="this.placeholder = 'Search Keyword'" />
                                                    <div className="input-group-append">
                                                        <button className="btns" type="button"><i
                                                            className="ti-search"></i></button>
                                                    </div>
                                            </div>
                                        </div>
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                                                type="submit">Search
                                        </button>
                                    </form>
                                </aside>
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
                                                <p>(21)</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="d-flex">
                                                <p>Health Care</p>
                                                <p>(21)</p>
                                            </a>
                                        </li>
                                    </ul>
                                </aside>
                                <aside className="single_sidebar_widget popular_post_widget">
                                    <h3 className="widget_title">Recent Post</h3>
                                    <div className="media post_item">
                                        <img src="assets/img/post/post_1.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>From life was you fish...</h3>
                                                </a>
                                                <p>January 12, 2019</p>
                                            </div>
                                    </div>
                                    <div className="media post_item">
                                        <img src="assets/img/post/post_2.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>The Amazing Hubble</h3>
                                                </a>
                                                <p>02 Hours ago</p>
                                            </div>
                                    </div>
                                    <div className="media post_item">
                                        <img src="assets/img/post/post_3.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>Astronomy Or Astrology</h3>
                                                </a>
                                                <p>03 Hours ago</p>
                                            </div>
                                    </div>
                                    <div className="media post_item">
                                        <img src="assets/img/post/post_4.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
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
            </section>
        </div>
    )
}

