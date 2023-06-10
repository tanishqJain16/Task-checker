import {BrowserRouter as Router,
	Routes,
	Route,
  Navigate,
} from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './pages/Home/Home';

function App() {

  return (
    <>
      <Toaster/>
      <Router>
        <Routes>
          <Route path="/" element={localStorage.getItem("token")?<Home/>:<Navigate to="/login"/>}/>
          <Route path="/login" element={!localStorage.getItem("token")?<Login/>:<Navigate to="/"/>}/>
          <Route path="/signup" element={!localStorage.getItem("token")?<Signup/>:<Navigate to="/"/>}/>
          <Route path="/home" element={localStorage.getItem("token")?<Home/>:<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
