import {useState,useRef} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Login() {
    let container;
    const nameRef = useRef();
    const emailRef = useRef();
    const loginEmailRef = useRef();
    const passwordRef = useRef();
    const loginPasswordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const signUpButton = (ev) =>{
        container = document.getElementById('container');
        container.classList.add('right-panel-active');
    }
    const signInButton = (ev) =>{
        container = document.getElementById('container');
        container.classList.remove('right-panel-active');
    }
    const onRegister = (ev) =>{
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        setErrors(null);
        axiosClient.post('/register', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response  = err.response;
                if(response && response.status === 422) {
                   setErrors(response.data.errors);
                }
            })
    }

    const onLogin = (ev) =>{
        ev.preventDefault()
        const payload = {
            email: loginEmailRef.current.value,
            password: loginPasswordRef.current.value
        }
        setErrors(null);
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response  = err.response;
                if(response && response.status === 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                }
            })
    }

    return(
        <div>
            <link rel="stylesheet" href="/assets/css/login.css" />
            <div className="alert-danger">
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p style={{lineHeight: 0}} key={key}>{errors[key][0]}</p>
                    ))}
                </div> }
            </div>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#" onSubmit={onRegister}>
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input ref={nameRef} type="text" placeholder="Name"/>
                            <input ref={emailRef} type="email" placeholder="Email"/>
                            <input ref={passwordRef} type="password" placeholder="Password"/>
                            <input ref={passwordConfirmationRef} type="password" placeholder="Confirm Password"/>
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#" onSubmit={onLogin}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input ref={loginEmailRef} type="email" placeholder="Email"/>
                            <input ref={loginPasswordRef} type="password" placeholder="Password"/>
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 style={{color: 'white'}} >Welcome Back!</h1>
                                <p style={{color: 'white'}}>To keep connected with us please login with your personal info</p>
                                <button className="ghost" onClick={signInButton} id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 style={{color: 'white'}}>Hello, Friend!</h1>
                                <p style={{color: 'white'}}>Enter your personal details and start journey with us</p>
                                <button style={{marginTop: '10px'}} className="ghost" onClick={signUpButton} id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
