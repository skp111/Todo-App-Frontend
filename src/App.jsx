import { Routes, Route, Outlet } from 'react-router';

import Landing from './Landing/landing';
import Login from './Auth/login';
import Register from './Auth/register';
import Forgot from './Auth/forgot';
import ResetPassword from './Auth/Reset_Password';

import ProtectedRoute from './Protection/protectedRoute';

import NavBar from './NavBar/navbar';

import Home from './Home/home';
import About from './About/about';
import Profile from './profile/profile';

import Error404 from './Error404/error404';

import { Toaster } from 'react-hot-toast';
import './styles/output.css';

export default function App() {
  const TodoLayout = () => {
    return (
      <ProtectedRoute>
        <NavBar />
        <Outlet />
      </ProtectedRoute>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/send-code' element={<Forgot />} />
        <Route path='/verify-code' element={<Forgot />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/todo/*' element={<TodoLayout />}>
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<Error404 />} />
        </Route>

        <Route path='/*' element={<Error404 />} />
      </Routes>
      <Toaster />
    </>
  )
}
