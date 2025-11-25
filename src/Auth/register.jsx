import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthServices from '../services/authServices';
import toast from 'react-hot-toast';
export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registerHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await AuthServices.registerUser({ username, email, password });
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
        <div className="flex min-h-screen bg-linear-to-r from-blue-100 to-purple-100">
            <div className='w-full sm:w-1/2 p-8 flex-col items-center justify-center space-y-4 hidden sm:flex group'>
                <i className='bx  bx-clipboard-check text-blue-600 text-6xl'></i>
                <h1 className="text-4xl font-bold text-indigo-600">Let's make today productive!</h1>
                <p className="text-xl text-neutral-600">Create an account and get things done.</p>
                <img src="/assets/todo_illustration.png" alt="Todo Illustration" className="w-2/3 mt-8 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className='w-full sm:w-1/2 p-4 sm:p-8 flex items-center justify-center '>
                <form action="" method="post" className='w-full max-w-md bg-white p-6 rounded-2xl shadow-xl backdrop-blur-md hover:transition-transform ease-out duration-500 hover:scale-102 '>
                    <div className="flex items-center justify-center mb-6">
                        <i className='bx bxs-user-circle text-4xl text-blue-600 mr-2'></i>
                        <h2 className='text-3xl font-bold text-gray-600'>Register</h2>
                    </div>
                    <div className='mb-4 relative'>
                        <label className='block text-gray-700 mb-2' htmlFor='username'>
                            <i className='bx bx-user inline-block mr-2'></i>Username
                        </label>
                        <input className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
                            type='text' id='username' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <i className='bx bx-user absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>
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
                    <button type='submit' className='cursor-pointer group w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 
                        transition-colors duration-300 flex items-center justify-center' onClick={registerHandler}>
                        <i className='bx bx-user-plus mr-2 group-hover:animate-bounce text-xl'></i>
                        Register
                        <i className='bx bx-chevron-right text-xl ml-2 group-hover:translate-x-2 transition-transform'></i>
                    </button>
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?
                        <a href="/login" className="text-blue-600 underline hover:no-underline hover:text-blue-700 ml-1">Login</a>
                    </p>
                </form>
            </div>
        </div>
    )
}