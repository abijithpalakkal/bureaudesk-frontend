import { Link } from 'react-router-dom'; // If using React Router for navigation
import officeLogo from "../assets/office_desk.jpg"

function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            <div className='h-screen w-screen bg-center bg-cover blur-sm bg-no-repeat' style={{ backgroundImage: `url(${officeLogo})` }}></div>
            <div className='bg-black absolute h-full w-full opacity-70'></div>
            <div className='absolute flex flex-col justify-center items-center text-white'>
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r text-transparent  from-green-400 to-green-400 bg-clip-text p-2">
              404 - Page Not Found
            </h1>
            <p className="text-lg  mb-4">Oops! The page you're looking for does not exist.</p>
            <p className="text-lg  mb-8">Please check the URL or navigate back to the home page.</p>
            <Link to="/" className="text-lg  hover:underline text-blue-400">Go to Home Page</Link>
            </div>
        </div>
    );
}

export default ErrorPage;
