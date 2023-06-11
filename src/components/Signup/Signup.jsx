import { useState } from 'react'
import './Signup.css'
// import signupImg from '../../assets/sign-up.jpg'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function Signup() {
    const [btnDisable, setBtnDisable] = useState(false)
    const [creds, setCreds] = useState({ email: "", username: "", password: "", phNumber: "" })
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }
    const handleSignin = async (e) => {
        setBtnDisable(true);
        e.preventDefault();
        const { email, username, password } = creds;
        const response = await fetch("https://task-tracking.azurewebsites.net/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                password
            }),
        });
        const json = await response.json();
        setBtnDisable(false);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem("token", json.token);
            console.log(json.token)
            toast.success("Signup Successful");
            // navigate("/home");
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } else {
            // alert(json.message);
            toast.error(json.message);
        }
    }

    return (
        <div className="card2">
            <div className="signupForm">
                <h1>Sign Up</h1>
                <div>
                    <label className='email' htmlFor="email">EMAIL</label>
                    <input type="text" name="email" id="name" required placeholder="Enter your email" onChange={onChange} />
                    <label className='username' htmlFor="username">USERNAME</label>
                    <input type="text" name="username" id="username" required placeholder="Enter your username" onChange={onChange} />
                    <label className='password' htmlFor="password">PASSWORD</label>
                    <input type="password" name="password" id="password" required placeholder="Enter your password" onChange={onChange} />
                    <button className="signupbtn" disabled={btnDisable} onClick={handleSignin}>SignUp</button>
                    <div className="alreadyamember">Already a Member? <Link to="/login">SignIn</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
