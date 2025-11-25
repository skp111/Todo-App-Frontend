export default function About() {
    return (
        <>
            <div className="mx-4 md:mx-8 lg:mx-16 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-blue-600 flex items-center justify-center">
                        <i className='bx bx-info-circle mr-2'></i>
                        About Our Todo App
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        This Todo App is designed to help you boost productivity and manage your tasks effortlessly.
                        It provides a smooth and intuitive experience with essential task-tracking tools.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500 flex items-center">
                            <i className='bx bx-star mr-2'></i>
                            Key Features
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <i className='bx bx-check-circle text-green-500 mr-2'></i>
                                Create, update & delete tasks
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-checks text-green-500 mr-2 text-lg'></i>
                                Mark tasks as completed
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-filter text-green-500 mr-2'></i>
                                Filter tasks (All / Completed / Pending)
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-database text-green-500 mr-2'></i>
                                Local storage / Database support
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-devices text-green-500 mr-2'></i>
                                Responsive, modern UI
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-trending-up text-green-500 mr-2'></i>
                                Fast and lightweight
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500 flex items-center">
                            <i className='bx bx-signal-5 mr-2'></i>
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600">
                            To offer a simple but powerful task-management tool that helps you accomplish more every day.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}