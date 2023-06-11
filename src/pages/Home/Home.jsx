// import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard";
import Navbar from '../../components/Navbar/Navbar';
import AddTask from "../../components/AddTask/AddTask";
import { toast } from "react-hot-toast";

function Home() {
    const [currentUser, setCurrentUser] = useState({ email: "", name: "" });
    const [tasks, setTasks] = useState([]);
    // const [tasksId, setTaskId] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/user/fetchtask", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            if (response.data.success) {
                // console.log(response.data.tasks)
                setTasks(response.data.tasks)
                // setTaskId(response.data.tasks.taskid)
            }
            else {
                toast.error(response.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])



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

    return (
        <div className="home">
            <Navbar/>
            <h1 className="mainHeading">Welcome, {currentUser.name}</h1>
            <AddTask className="addTaskComponent"/>
            <div className="cards">
                {tasks.map((task,key) => {
                    return <TaskCard task={task.task} id={task.taskid} key={key} />
                })}
            </div>
        </div>
    )
}

export default Home
