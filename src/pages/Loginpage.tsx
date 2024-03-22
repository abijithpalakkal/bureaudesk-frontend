import React from 'react'
import logo from '../assets/logo_2-removebg-preview (4).png'
import designlogo from '../assets/designlogo.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {  useNavigate } from 'react-router-dom'

const loginpage = () => {
    const navigate=useNavigate()
    const formik=useFormik({
        initialValues: {
            email: '',
            password: ''
          },
          validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
          }),
          onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
          },
        
        })
    return (
        <div className='h-screen  bg-blue'>
            <div className='w-full h-full md:flex  p-3'>
                <div className='md:w-1/2 hidden  md:block bg-gradient-to-t via-customBlue from-customBlue to-white rounded-l-[25px] flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center gap-[80px]'>
                        <img src={logo} className='w-[110px]' />
                        <p className='text-[30px] font-semibold '>Your place to work Plan. Create. Control.</p>
                        <img src={designlogo} alt="" className='w-1/2'/>
                    </div>
                </div>
                <div className='md:w-1/2'>
                    <div className="flex justify-center md:items-center h-screen">
                        <form className="w-96 bg-white  rounded  pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-600'>{formik.errors.email}</div>
                                ):null}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...formik.getFieldProps('password')}
                                />
                               {formik.touched.password && formik.errors.password?(
                                <div className='text-red-600'>{formik.errors.password}</div>
                               ):null}
                               <p className='text-sm  text-gray-700'>forgot password?</p>
                            </div>
                            
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                            <p className='text-sm'>dont have an account?<span className="text-blue-500 cursor-pointer" onClick={()=>{navigate("/signup")}}>sign in</span></p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default loginpage
