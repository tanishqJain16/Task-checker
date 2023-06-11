import "./TaskCard.css"
import Trash from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


function TaskCard(props) {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState("");
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [disable, setDisable] = useState(false);

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://task-tracking.azurewebsites.net/user/deletetask/${props.id}`, {         // eslint-disable-line
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        const json = await response.json();
        if (json.success) {
            toast.success("Task Deleted Successfully");
            window.location.reload();
        }
        else {
            toast.error(json.message);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setDisable(true);
        const response = await fetch(`https://task-tracking.azurewebsites.net/user/updatetask/${props.id}`, {         //eslint-disable-line
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ task: task })
        });
        const json = await response.json();
        if (json.success) {
            setDisable(false);
            toast.success("Task Updated Successfully");
            window.location.reload();
        }
        else {
            setDisable(false);
            toast.error(json.message);
        }
    }


    return (
        <div className="taskCard">
            <Modal open={open} onClose={onCloseModal} center>
                <h2>Edit Task</h2>
                <div className="editTaskField">
                    <textarea rows={4} type="text" placeholder="Edit Task" onChange={handleChange} />
                </div>
                <button className="editTaskBtn" onClick={handleUpdate} disabled={disable}>
                    Update
                </button>
            </Modal>
            <div className="taskCardP">
                <p>Task Id: {props.id}</p>     {/* eslint-disable-line */}
                <div className="taskCardIcons">
                    <EditIcon onClick={onOpenModal} />
                    <Trash onClick={handleDelete} />
                </div>
            </div>
            <div className="taskDetail">{props.task}</div>      {/* eslint-disable-line */}
        </div>
    )
}

export default TaskCard
