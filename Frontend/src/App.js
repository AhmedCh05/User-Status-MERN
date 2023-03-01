import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Users from "./pages/AllUsers"
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import Logout from './pages/Logout'
import ChangePassword from './pages/ChangePassword';
import "./App.css"
import UserProfile from './pages/UserProfile';
import UpdateProfile from './pages/UpdateProfile';
import UserIcon from './pages/UserIcon';

function App() {
    return (
      <>
    <Router>
          <Routes>
              <Route path='/login' element={<Login/>} />
              <Route exact path ='/' element={<Login/>} />
              <Route exact path ='/signup' element={<Signup/>} />
              <Route exact path ='/allusers' element={<Users/>} />  
              <Route exact path ='/forgotpassword' element={<ForgetPassword/>} />
              <Route exact path ='/userprofile' element={<UserProfile/>} />
              <Route exact path ='/updateuser' element={<UpdateProfile/>} />
              <Route exact path ='/user/changepassword' element={<ChangePassword/>} />
              <Route exact path ='/user/UserIcon' element={<UserIcon/>} />
              <Route exact path ='/logout' element={<Logout/>} />                              

          </Routes>
      </Router>
      </>
    );
}

export default App;