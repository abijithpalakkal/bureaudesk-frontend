import React, { useCallback, useState } from 'react'
import logo from '../assets/logo_2-removebg-preview (4).png'
import designlogo from '../assets/theam.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userLoginAction } from '../redux/actions/useractions/userActions'
import { AppDispatch } from '../redux/store'
import { getCompanyAction } from '../redux/actions/useractions/getCompanyAction'
import cityphoto from "../assets/beautiful-architecture-office.avif"
import team from "../assets/office_desk.png"
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'


const loginpage = () => {
    const [blur, setblur] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async values => {
            const email: string = values.email;
            const password: string = values.password;
            const data = {
                email, password
            }
            const data1 = await dispatch(userLoginAction(data))

            if (data1.payload?.companyid) {
                await dispatch(getCompanyAction(data1.payload.companyid))
            }

            if (data1.meta.requestStatus != "rejected") {
                navigate("/employees")
            }

        },
    })

    const handleBlur = () => {
        setblur(true)
    }


    const particlesInit = useCallback(async (engine: any) => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any | undefined) => {
        return new Promise<void>((resolve) => {
            console.log(container);
            // Additional initialization logic can go here
            resolve(container);
        });
    }, []);


    return (
        <div className='h-screen  bg-blue'>
            <div className=''>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: ""
                            },
                        },
                        fpsLimit: 960,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 1,
                                },
                                repulse: {
                                    distance: 5,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#197195",
                            },
                            links: {
                                color: "#197195",
                                distance: 150,
                                enable: true,
                                opacity: 0.7,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 4,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 30,
                            },
                            opacity: {
                                value: 1,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                    className='particles' />
            </div>
            <div className='w-full h-full md:flex overflow-hidden relative'>
                <div className='flex justify-between absolute w-full h-10 z-50'>
                    <div className='w-16 md:invisible ml-4'>  <img src={logo} alt="" className='w-full' /></div>
                    <div className='flex md:mr-10  mr-4 gap-3 md:gap-10 justify-center items-center text-gray-600'>
                        <p className='cursor-pointer text-xl font-semibold hover:mt-3 duration-300' >About us</p>
                        <p className='cursor-pointer text-xl font-semibold  hover:mt-3 duration-300 ' onClick={() => { navigate("/signup") }}>Signup</p>
                    </div>
                </div>
                <div className='md:w-2/4 hidden md:block bg-blue-400 flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center gap-[80px]'>
                        <img src={logo} className='w-[110px]' />
                        <p className='text-[30px] font-semibold p-3 text-center'>Your place to work Plan. Create. Control.</p>
                        <div className='w-96'><img src={designlogo} alt="" className='w-full' /></div>
                    </div>
                </div>

                <div className='md:w-2/4 relative  overflow-hidden'>

                    <div className="flex justify-center items-center h-screen bg-transparent ">

                        <form className="w-96  rounded  pt-6 pb-8 mb-4 z-40 p-6" onSubmit={formik.handleSubmit}>
                            <p className='text-center mb-6 text-2xl font-semibold text-slate-600'>Login In to bureaudesk</p>
                            <div className="mb-4 w-full" onClick={handleBlur}>
                                <label className="block text-sm font-bold mb-2 text-slate-500" htmlFor="email" >
                                    Email Address
                                </label>
                                <input
                                    className=" appearance-none w-full text-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...formik.getFieldProps('email')}

                                />
                                <hr className=' border-1 rounded-lg border-slate-500'></hr>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-600'>{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="mb-6">
                                <label className="block  text-sm font-bold mb-2 text-slate-500 " htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className=" appearance-none text-lg w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline border-none"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...formik.getFieldProps('password')}
                                />
                                <hr className=' border-1 rounded-lg border-slate-500 mb-3'></hr>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-red-600'>{formik.errors.password}</div>
                                ) : null}
                                <p className='text-sm  '>forgot password?</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    login
                                </button>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <p className='text-sm'>dont have an account?<span className="text-blue-700 cursor-pointer" onClick={() => { navigate("/signup") }}>sign up</span></p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default loginpage
