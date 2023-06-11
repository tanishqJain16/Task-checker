// import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard";
import Navbar from '../../components/Navbar/Navbar';
import AddTask from "../../components/AddTask/AddTask";
import { toast } from "react-hot-toast";
import loadingGif from "../../assets/loading.gif"

function Home() {
    const [currentUser, setCurrentUser] = useState({ email: "", name: "", totaltasks: 0 });
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = () => {
        setLoading(true);
        axios.get("https://task-tracking.azurewebsites.net/user/fetchtask", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            if (response.data.success) {
                setTasks(response.data.tasks)
                setLoading(false);
            }
            else {
                toast.error(response.message);
                setLoading(false);
            }
        }).catch((err) => {         // eslint-disable-line
            setLoading(false);
            toast.error("Something went wrong ! please try again later");
        })
    }

    const getCurrentUser = () => {
        axios.get("https://task-tracking.azurewebsites.net/user/currentuser", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            if (response.data.success) {
                setCurrentUser({ name: response.data.name, email: response.data.email, totaltasks: response.data.totaltasks })
            }
            else {
                alert(response.message);
            }
        }).catch((err) => {     // eslint-disable-line
            toast.error("Something went wrong ! please try again later");
        })

    }

    useEffect(() => {
        getCurrentUser();
        fetchTasks();
    }, [])

    return (
        <div className="home">
            <Navbar />
            <h1 className="mainHeading">Welcome, {currentUser.name}</h1>
            <AddTask className="addTaskComponent" />
            <div className="totalTasks"><h2>Total Tasks: {currentUser.totaltasks}</h2></div>
            <div className="cards">
                {loading && <img src={loadingGif} alt="loading" className="loadingGif" />}
                {!loading && tasks.length === 0 && <h1 className="noTask">No Tasks Scheduled</h1>}
                {tasks.map((task, key) => {
                    return <TaskCard task={task.task} id={task.taskid} key={key} />
                })}
            </div>
        </div>
    )
}

export default Home
