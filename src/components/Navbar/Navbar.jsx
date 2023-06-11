import "./Navbar.css"
import logo from "../../assets/task-tracker-logo.png"
import LogoutIcon from '@material-ui/icons/ExitToApp';

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
  return (
    <div className="navbar">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <div className="navHeading">
            TASK TRACKER
        </div>
        <div className="logout" onClick={handleLogout}>
          <LogoutIcon/>
        </div>
    </div>
  )
}

export default Navbar
