// import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [currentUser, setCurrentUser] = useState({ email: "", name: "" });

    const getCurrentUser = () => {
        axios.get("http://localhost:5000/user/currentuser", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            if (response.data.success) {
                // console.log(response.data)
                setCurrentUser({ name: response.data.name, email: response.data.email })
            }
            else {
                alert(response.message);
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        getCurrentUser();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    return (
        <div className="home">
            <h1>Hi {currentUser.name}</h1>
            <button className="logout" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Home
