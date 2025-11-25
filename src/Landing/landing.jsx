import { Link } from 'react-router';
export default function Landing() {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
            <div className='w-full sm:w-1/2 p-4 sm:p-8 flex items-center justify-center'>
                <img src="/assets/todolist.png" alt="landingPage" 
                    className='w-3/4 max-w-md hover:scale-105 transition-transform duration-300 shadow-2xl rounded-lg' />
            </div>
            <div className='w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center space-y-4 sm:space-y-6'>
                <h1 className='text-2xl sm:text-4xl flex items-center font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600'>
                    Your way to TodoApp
                    <i className='bx bxs-check-circle text-3xl sm:text-5xl text-blue-500 ml-2'></i>
                </h1>
                <div className='space-y-3 sm:space-y-4'>
                    <div className='flex items-center space-x-3 group'>
                        <i className='bx bx-check-square text-xl sm:text-2xl text-blue-500 group-hover:animate-pulse'></i>
                        <p className='text-base sm:text-lg'>Organize your tasks efficiently</p>
                    </div>
                    <div className='flex items-center space-x-3 group'>
                        <i className='bx bx-bullseye text-xl sm:text-2xl text-purple-500 group-hover:animate-pulse'></i>
                        <p className='text-base sm:text-lg'>Track your progress seamlessly</p>
                    </div>
                    <div className='flex items-center space-x-3 group'>
                        <i className='bx bx-trophy text-xl sm:text-2xl text-green-500 group-hover:animate-pulse'></i>
                        <p className='text-base sm:text-lg'>Achieve your goals effortlessly</p>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8'>
                    <Link to="/register" className='group bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                        text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl 
                        w-full sm:w-fit text-center flex items-center justify-center cursor-pointer'>
                        <i className='bx bx-user-plus text-xl sm:text-2xl mr-2 group-hover:animate-bounce'></i>
                        Get Started
                        <i className='bx bx-chevron-right text-xl sm:text-2xl ml-2 group-hover:translate-x-2 transition-transform'></i>
                    </Link>
                    <Link to="/login" className='group bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 
                        text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl 
                        w-full sm:w-fit text-center flex items-center justify-center cursor-pointer'>
                        <i className='bx bx-user text-xl sm:text-2xl mr-2 group-hover:animate-bounce'></i> 
                        Login Now
                        <i className='bx bx-chevron-right text-xl sm:text-2xl ml-2 group-hover:translate-x-2 transition-transform'></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}
