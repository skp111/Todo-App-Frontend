import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthServices from '../services/authServices';
import toast from 'react-hot-toast';

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [loading, setLoading] = useState(false); // 👈 for loader
  const navigate = useNavigate();

  const sendSecurityCodeHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // show loader
    try {
      const response = await AuthServices.sendSecurityCode({ email });
      toast.success(response.data.message);
    } catch (err) {
      const message = err.response?.data?.message;
      if (typeof message === "string") toast.error(message);
      else if (Array.isArray(message)) message.forEach(errObj => toast.error(errObj.msg));
      else toast.error("Forgot password failed");
    } finally {
      setLoading(false); // hide loader
    }
  };

  const verifySecurityCodeHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthServices.verifySecurityCode({ email, securityCode });
      toast.success(response.data.message);
      localStorage.setItem("_id", JSON.stringify(response.data.user._id));
      navigate('/reset-password', { state: { _id: response.data.user._id } });
    } catch (err) {
      const message = err.response?.data?.message;
      if (typeof message === "string") toast.error(message);
      else if (Array.isArray(message)) message.forEach(errObj => toast.error(errObj.msg));
      else toast.error("Verification failed");
    }
  };

  // 👇 Conditional loader rendering
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <p className="mb-3 text-green-600 text-xl">Sending Code...</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loading" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-linear-to-r from-blue-100 to-purple-100 flex flex-col justify-center items-center">
      <div className="w-fit h-fit hover:transition-transform ease-out duration-500 hover:scale-102">
        {/* Form for sending code */}
        <form onSubmit={sendSecurityCodeHandler} className='w-full max-w-sm bg-white p-6 rounded-t-2xl shadow-xl backdrop-blur-md'>
          <div className="flex items-center justify-center mb-6">
            <i className='bx bxs-user-circle text-4xl text-blue-600 mr-2'></i>
            <h2 className='text-3xl font-bold text-gray-600'>Forgot Password</h2>
          </div>
          <div className='mb-4 relative'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              <i className='bx bx-envelope inline-block mr-2'></i>Email
            </label>
            <input
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
              type='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className='bx bx-envelope absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>
          </div>
          <button
            type='submit'
            className='cursor-pointer group w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700
              transition-colors duration-300 flex items-center justify-center'>
            <i className='bx bx-info-shield mr-2 group-hover:animate-bounce text-xl'></i>
            Send Code
            <i className='bx bx-chevron-right text-xl ml-2 group-hover:translate-x-2 transition-transform'></i>
          </button>
        </form>

        {/* Form for verifying code */}
        <form onSubmit={verifySecurityCodeHandler} className='w-full max-w-sm bg-white p-6 rounded-b-2xl shadow-xl backdrop-blur-md'>
          <div className='mb-4 relative'>
            <label className='block text-gray-700 mb-2' htmlFor='securityCode'>
              <i className='bx bx-lock inline-block mr-2'></i>Security Code
            </label>
            <input
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10'
              type='text'
              id='securityCode'
              placeholder='Enter your security code'
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
            <i className='bx bx-key absolute left-3 bottom-2.5 text-gray-400 text-xl'></i>
          </div>
          <button
            type='submit'
            className='cursor-pointer group w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700
              transition-colors duration-300 flex items-center justify-center'>
            Submit
            <i className='bx bx-arrow-right-stroke text-xl ml-2 group-hover:translate-x-2 transition-transform'></i>
          </button>
        </form>
      </div>
    </div>
  );
}
