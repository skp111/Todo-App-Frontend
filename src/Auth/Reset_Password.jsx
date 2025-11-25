import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthServices from "../services/authServices";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [_id, set_id] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => { // 👈 works after rendering
        if (location.state && location.state._id) {
            set_id(location.state._id);
        }else if (localStorage.getItem("_id")) {
            set_id(JSON.parse(localStorage.getItem("_id")));
        } else {
            navigate('/send-code');
        }
    }, [location.state, navigate]);

    if (_id === null) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700">
                <p>Loading...</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
            </div>
        )
    }

    const resetPasswordHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await AuthServices.resetPassword({ password, confirmPassword, _id });
            console.log(response.data);
            toast.success(response.data.message);
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.message;

            if (typeof message === "string") {
                // Single message string
                toast.error(message);
            }
            else if (Array.isArray(message)) {
                // Array of error messages
                message.forEach(errObj => toast.error(errObj.msg));
            }
            else {
                toast.error("Registration failed");
            }

            console.log(err.response?.data);
        }
    }
    return (
        <div className="h-screen bg-linear-to-r from-blue-100 to-purple-100 flex justify-center items-center">
            <form className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl backdrop-blur-md'>
                <div className="flex items-center justify-center mb-6">
                    <i className='bx bxs-lock-keyhole text-4xl text-blue-600 mr-2'></i>
                    <h2 className='text-3xl font-bold text-gray-600'>New Password</h2>
                </div>

                {/* Password */}
                <div className='mb-6 relative'>
                    <label className='block text-gray-700 mb-2'>
                        <i className='bx bx-lock-keyhole inline-block mr-2'></i> Password
                    </label>

                    <input
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <i className='bx bx-lock-keyhole absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>

                    <i
                        className={`bx ${showPassword ? "bx-eye" : "bx-eye-closed"} absolute right-2 bottom-2.5 text-gray-600 text-xl cursor-pointer`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>

                {/* Confirm Password */}
                <div className='mb-6 relative'>
                    <label className='block text-gray-700 mb-2'>
                        <i className='bx bx-lock-keyhole inline-block mr-2'></i> Confirm Password
                    </label>

                    <input
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <i className='bx bx-lock-keyhole absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>

                    <i
                        className={`bx ${showConfirmPassword ? "bx-eye" : "bx-eye-closed"} absolute right-2 bottom-2.5 text-gray-600 text-xl cursor-pointer`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                </div>

                <button type='submit' className='cursor-pointer group w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700
                    transition-colors duration-300 flex items-center justify-center' onClick={resetPasswordHandler}>
                    Submit
                    <i className='bx  bx-arrow-right-stroke text-xl ml-2 group-hover:translate-x-2 transition-transform'></i>
                </button>
            </form>
        </div>
    );
}
