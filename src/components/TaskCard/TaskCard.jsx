import "./TaskCard.css"
import Trash from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { toast } from "react-hot-toast";


function TaskCard(props) {
    const handleDelete = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user/deletetask/${props.id}`, {
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
    return (
        <div className="taskCard">
            <div className="taskCardP">
                <p>Task Id: {props.id}</p>     {/* eslint-disable-line */}
                <div className="taskCardIcons">
                    <EditIcon />
                    <Trash onClick={handleDelete} />
                </div>
            </div>
            <div className="taskDetail">{props.task}</div>      {/* eslint-disable-line */}
        </div>
    )
}

export default TaskCard
