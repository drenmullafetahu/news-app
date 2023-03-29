import {Navigate, Outlet, useSearchParams, useNavigate,Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useRef, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {

    const [searchParams, setSearchParams] =  useSearchParams();
    const {user,token,setUser,setToken} = useStateContext()
    const searchInputRef = useRef();
    const navigate = useNavigate();

    useEffect(() =>{
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    },[])

    if(!token) {
        return <Navigate to="/login" />
    }
    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    const onSearch = (e) => {
        e.preventDefault()
        const searchPayload = {
            searchInput: searchParams.get('q'),
            fromdateInput: searchParams.get('fromdateInput'),
            todateInput: searchParams.get('todateInput'),
            source: searchParams.get('source')
        }
        setSearchParams(searchPayload);
        navigate({
            pathname: '/search',
            search: 'q='+ searchInputRef.current.value+'&source='+searchParams.get('source')
        })
    }
    return(
        <div>
            <header>
                <div className="header-area">
                    <div className="main-header ">
                        <div className="header-top black-bg d-none d-sm-block">
                            <div className="container">
                                <div className="col-xl-12">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="header-info-left">
                                            <ul>
                                                <li className="title"><span className="flaticon-energy"></span> trending-title</li>
                                                <li>Class property employ ancho red multi level mansion</li>
                                            </ul>
                                        </div>
                                        <div className="header-info-right">
                                            <ul className="header-date">
                                                <li><span className="flaticon-calendar"></span> Welcome {user.name} <a href='#' onClick={onLogout}>Logout</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-mid gray-bg">
                            <div className="container">
                                <div className="row d-flex align-items-center">
                                    <div className="col-xl-3 col-lg-3 col-md-3 d-none d-md-block">
                                        <div className="logo">
                                            <Link to='/home'><img src="assets/img/logo/logo.png" alt="" /></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-9">
                                        <div className="header-banner f-right ">
                                            <img src="assets/img/gallery/header_card.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-bottom header-sticky">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-xl-8 col-lg-8 col-md-12 header-flex">
                                        <div className="sticky-logo">
                                            <a href="#"><img src="assets/img/logo/logo.png" alt="" /></a>
                                        </div>
                                        <div className="main-menu d-none d-md-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link to='/home'>Home</Link></li>
                                                    <li><a href="#">about</a></li>
                                                    <li><a href="#">Category</a></li>
                                                    <li><a href="#">Latest News</a></li>
                                                    <li><a href="#">Contact</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4">
                                        <div className="header-right f-right d-none d-lg-block blog_right_sidebar">
                                            <div className='single_sidebar_widget search_widget' style={{marginBottom: 0, padding: 0, marginTop: '10px'}}>
                                                <form action='#' onSubmit={onSearch}>
                                                    <div className="form-group">
                                                        <div className="input-group mb-3">
                                                            <input ref={searchInputRef} type="text" className="form-control" placeholder='Search Keyword'/>
                                                            <div className="input-group-append">
                                                                <button className="btns" type="button" style={{border: '4px solid #f0e9ff'}}>
                                                                    <i className="ti-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-md-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <div className="footer-main footer-bg">
                    <div className="footer-area footer-padding">
                        <div className="container">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-8">
                                    <div className="single-footer-caption mb-50">
                                        <div className="single-footer-caption mb-30">
                                            <div className="footer-logo">
                                                <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt="" /></a>
                                            </div>
                                            <div className="footer-tittle">
                                                <div className="footer-pera">
                                                    <p className="info1">Lorem ipsum dolor sit amet, nsectetur
                                                        adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                                    <p className="info2">198 West 21th Street, Suite 721 New York,NY
                                                        10010</p>
                                                    <p className="info2">Phone: +95 (0) 123 456 789 Cell: +95 (0) 123
                                                        456 789</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-5 col-sm-7">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Popular post</h4>
                                        </div>
                                        <div className="whats-right-single mb-20">
                                            <div className="whats-right-img">
                                                <img src="assets/img/gallery/footer_post1.png" alt="" />
                                            </div>
                                            <div className="whats-right-cap">
                                                <h4><a href="latest_news.html">Scarlett’s disappointment at latest
                                                    accolade</a></h4>
                                                <p>Jhon | 2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="whats-right-single mb-20">
                                            <div className="whats-right-img">
                                                <img src="assets/img/gallery/footer_post2.png" alt="" />
                                            </div>
                                            <div className="whats-right-cap">
                                                <h4><a href="latest_news.html">Scarlett’s disappointment at latest
                                                    accolade</a></h4>
                                                <p>Jhon | 2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="whats-right-single mb-20">
                                            <div className="whats-right-img">
                                                <img src="assets/img/gallery/footer_post3.png" alt="" />
                                            </div>
                                            <div className="whats-right-cap">
                                                <h4><a href="latest_news.html">Scarlett’s disappointment at latest
                                                    accolade</a></h4>
                                                <p>Jhon | 2 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                                    <div className="single-footer-caption mb-50">
                                        <div className="banner">
                                            <img src="assets/img/gallery/body_card4.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="search-model-box">
                <div className="d-flex align-items-center h-100 justify-content-center">
                    <div className="search-close-btn">+</div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Searching key....." />
                    </form>
                </div>
            </div>
        </div>
    )
}
