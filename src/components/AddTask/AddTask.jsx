import { useState } from "react";
import "./AddTask.css"
import { toast } from "react-hot-toast";
// import axios from "axios";

function AddTask() {
    const [task, setTask] = useState("");
    const [disable, setDisable] = useState(false);
    const handleOnChange = (e) => {
        setTask(e.target.value)
    }
    let body = {
        task: task
    };
    const handleAddTask = async (e) => {
        e.preventDefault();
        setDisable(true);
        const response = await fetch("https://task-tracking.azurewebsites.net/user/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        if (json.success) {
            toast.success("Task Added Successfully");
            setDisable(false);
            window.location.reload();
        }
        else {
            toast.error(json.message);
            setDisable(false);
        }
    }
    // console.log(localStorage.getItem('token'))


    return (
        <div className="addtask">
            <div className="addTaskField">
                <textarea rows={4} type="text" placeholder="Add Task" onChange={handleOnChange} />
            </div>
            <button className="addTaskBtn" onClick={handleAddTask} disabled={disable}>
                Add Task
            </button>
        </div>
    )
}

export default AddTask
