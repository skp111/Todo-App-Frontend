import { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router";
import AuthServices from "../services/authServices";
import toast from "react-hot-toast";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
        } else if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    if (user === null) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700">
                <p>Loading User...</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
            </div>
        )
    }

    const LogoutHandler = () => {
        AuthServices.logoutUser();
        localStorage.removeItem("_id");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate('/');
    };

    return (
        <nav className="bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4">
                    <div className="flex items-center mb-4 md:mb-0">
                        <i className='bx bxs-user-circle text-2xl mr-2'></i>
                        <p className="text-lg font-semibold">Welcome <span className="text-xl text-purple-600">{user.username}</span> </p>
                    </div>
                    <ul className="flex flex-wrap gap-5 items-center">
                        <li>
                            <NavLink
                                to="/todo/home"
                                className={({ isActive }) => `flex items-center transition-colors ${isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300" }`} >
                                <i className="bx bx-home mr-1"></i> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/todo/about"
                                className={({ isActive }) => `flex items-center transition-colors ${isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300" }`} >
                                <i className="bx bx-info-circle mr-1"></i> About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo/profile"
                                className={({ isActive }) => `flex items-center transition-colors ${isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300" }`} >
                                <i className='bx bx-user mr-1'></i> Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" onClick={LogoutHandler} 
                                className="flex items-center transition-colors hover:text-gray-300" >
                                <i className='bx  bx-arrow-out-right-square-half mr-1'></i> Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}