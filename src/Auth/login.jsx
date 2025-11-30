import { useState } from "react"
import { useNavigate } from "react-router";
import AuthServices from "../services/authServices";
import toast from "react-hot-toast";
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await AuthServices.loginUser({ email, password });
            const token = response.data.token;
            if (token) 
                localStorage.setItem('token', token);
            console.log(response.data);
            toast.success(response.data.message);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate('/todo/home', { state: { user: response.data.user } });
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
                toast.error("Login failed");
            }
            console.log(err.response?.data);
        }
    }
    return (
        <div className="h-screen bg-linear-to-r from-blue-100 to-purple-100 flex justify-center items-center">
            <form action="" method="post" className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl backdrop-blur-md hover:transition-transform ease-out duration-500 hover:scale-102 '>
                <div className="flex items-center justify-center mb-6">
                    <i className='bx bxs-user-circle text-4xl text-blue-600 mr-2'></i>
                    <h2 className='text-3xl font-bold text-gray-600'>Login</h2>
                </div>
                <div className='mb-4 relative'>
                    <label className='block text-gray-700 mb-2' htmlFor='email'>
                        <i className='bx bx-envelope inline-block mr-2'></i>Email
                    </label>
                    <input className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
                        type='email' id='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <i className='bx bx-envelope absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>
                </div>
                <div className='mb-6 relative'>
                    <label className='block text-gray-700 mb-2' htmlFor='password'>
                        <i className='bx  bx-lock-keyhole inline-block mr-2'></i> Password
                    </label>
                    <input className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
                        type={showPassword ? "text" : 'password'} id='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <i className='bx bx-lock-keyhole absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>
                    <i className={`bx ${showPassword ? "bx-eye" : "bx-eye-closed"} absolute right-2 bottom-2.5 text-gray-600 text-xl cursor-pointer`} onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <div className="flex justify-end mb-4">
                    <a href="/send-code" className="text-sm text-indigo-700 underline hover:no-underline">Forgot Password?</a>
                </div>
                <button type='submit' className='cursor-pointer group w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700
                    transition-colors duration-300 flex items-center justify-center' onClick={loginHandler}>
                    <i className='bx bx-user mr-2 group-hover:animate-bounce text-xl'></i>
                    Sign in
                    <i className='bx bx-chevron-right text-xl ml-2 group-hover:translate-x-2 transition-transform'></i>
                </button>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?
                    <a href="/register" className="text-blue-600 underline hover:no-underline hover:text-blue-700 ml-1">Register</a>
                </p>
            </form>
        </div>
    )
}