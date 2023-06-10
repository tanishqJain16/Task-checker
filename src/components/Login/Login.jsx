import { useState } from 'react'
import { Link } from 'react-router-dom'
import signupImg from '../../assets/sign-up.jpg'
import './Login.css'
// import Home from '../../pages/home/Home'
import { toast } from 'react-hot-toast'

function Login() {
    // const navigate=useNavigate();
    const [creds, setCreds] = useState({ email: "", password: "" })
    const [btnDisable, setBtnDisable] = useState(false)
    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        setBtnDisable(true);
        const { email, password } = creds;
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const json = await response.json();
        setBtnDisable(false);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem("token", json.token);
            console.log(json.token)
            toast.success("Login Successful");
            // navigate("/home");
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
            
        } else {
            toast.error(json.message);
        }
    }

    return (
        <div className="card">
            <div className="signinImg">
                <img src={signupImg} alt="" />
            </div>
            <div className="signinForm">
                <h1>Sign In</h1>
                <div>
                    <label className='email' htmlFor="email">EMAIL</label>
                    <input type="text" name="email" id="email" placeholder="Enter your email" onChange={handleChange}/>
                    <label className='password' htmlFor="password">PASSWORD</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange}/>
                    <button className="signinbtn" disabled={btnDisable} onClick={handlesubmit}>SignIn</button>
                    {/* <div className="extraDetails">
                        <div className="rememberMecheck">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                value="rememberMe"
                            />
                            <label htmlFor="rememberMe"> Remember Me</label>
                        </div>
                        <div className="forgotPassword">
                            <Link to="/resetpassword">Forgot Password?</Link>
                        </div>
                    </div> */}
                    <div className="notamember">Not a Member? <Link to="/signup">SignUp</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login
