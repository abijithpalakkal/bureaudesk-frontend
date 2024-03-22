import { BsArrowRightShort } from 'react-icons/bs'
import logo from '../assets/logo_2-removebg-preview (4).png'
import { TypeAnimation } from 'react-type-animation'
import office_desk from "../assets/office_desk.jpg"

const signinpage = () => {

    return (
        <div className="flex">

            <div className="bg-gradient-to-t via-customBlue from-customBlue  w-1/4 h-screen">

                <div className='flex items-center justify-center mt-5'>
                    <img src={logo} alt="" className='w-[110px]' />
                </div>
                <h2 className='text-[40px] text-white mt-12'>   <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Your place to work.',
                        2000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Your place to Plan.',
                        2000,
                        'Your place to Create.',
                        2000,
                        'Your place to Control.',
                        2000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                /></h2>

            </div>
            <div className="h-screen flex flex-col justify-items-center align items-center w-3/4 overflow-hidden">
                <div className='w-full h-full relative blur bg-cover bg-center'>
                    <img src={office_desk} className='w-full h-full' />
                </div>
                <div className='flex flex-col justify-center items-center h-full absolute '>
                    <h1 className='font-bold'>Signin to <span className='text-[25px] text-customBlue'>bureaudesk</span></h1>
                    <form className='mt-6'>
                        <div>
                            <label htmlFor="email">Email</label> 
                            <input type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor="otp">OTP</label>
                            <div>
                                {["otp1", "otp2", "otp3", "otp4"].map(() => (
                                    <input type="text" name="otp" className="shadow mx-1 font-bold appearance-none border rounded w-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                ))}



                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        </div>
                        <div>
                            <label htmlFor="password">confirm Password</label>
                            <input type="password" name=" confirm_password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        </div>
                        <div className="flex items-center justify-center mt-5">
                            <button className="bg-blue-500 w-[200px] flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                <span>generate otp</span>
                                <BsArrowRightShort className="ml-2" />
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default signinpage