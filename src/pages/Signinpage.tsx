import { BsArrowRightShort } from 'react-icons/bs'
import logo from '../assets/logo_2-removebg-preview (4).png'
import { TypeAnimation } from 'react-type-animation'
import office_desk from "../assets/office_desk.jpg"
import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSignupAction } from '../redux/actions/useractions/userActions'
import { AppDispatch } from '../redux/store'
import { RootState } from '../redux/store'
import { CircularProgress } from '@mui/material'
import Timer from "../components/helpers/Timer"
import postData from '../utils/postdata'
import { toast } from 'react-toastify';



const signinpage = () => {
    const { message } = useSelector((state: RootState) => state.userdetails)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [otpdisplay, setotpdisplay] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [otp1, setOtp1] = useState<string>("");
    const [otp2, setOtp2] = useState<string>("");
    const [otp3, setOtp3] = useState<string>("");
    const [otp4, setOtp4] = useState<string>("");
    const [focusedInput, setFocusedInput] = useState<number>(0)
    const [refresh, setrefresh] = useState<boolean>(false)
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];
    const { user, loading } = useSelector((state: RootState) => state.userdetails)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            confirm_password: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Password must be at least 8 characters long and contain both letters and numbers'
                ),

        }),
        onSubmit: async (values) => {
            console.log(values)
            axios.post('http://localhost:8000/auth/otpsignup', {
                // Request body/data
                email: values.email,
            }).then((data) => {
                console.log(data, "hi hi hi")
                if (!data.data.status) {
                    toast.error(data.data?.message)
                }
                if (data.data.status) {
                    setpassword(values.password)
                    setemail(values.email)
                    setotpdisplay(true)
                }
            })


        },
    });



    const handleOtpChange = (index: number, value: string) => {
        switch (index) {
            case 1:
                setOtp1(value);
                break;
            case 2:
                setOtp2(value);
                break;
            case 3:
                setOtp3(value);
                break;
            case 4:
                setOtp4(value);
                break;
            default:
                break;
        }
        if (value.length === 1 && index <= inputRefs.length - 1) {
            inputRefs[index].current?.focus();
        }
    };

    const handleBackSpace = async (index: number, e: any) => {

        if (e.key === 'Backspace') {
            // If the current input has no value and is not the first input, move focus to the previous input
            console.log(index)
            switch (index) {
                case 1:
                    setOtp1("");
                    break;
                case 2:
                    setOtp2("");
                    break;
                case 3:
                    setOtp3("");
                    break;
                case 4:
                    setOtp4("");
                    break;
                default:
                    break;
            }
            console.log(index)
            console.log(otp1, otp2, otp3, otp4)
            if (index > 0) {
                inputRefs[index - 2].current?.focus();
            }

        }
    }
    const handleverifyotp = async () => {
        const otp = "" + otp1 + otp2 + otp3 + otp4
        console.log(otp, '----------')
        const response = await dispatch(userSignupAction({
            otp,
            email,
            password
        }))

        if (response.meta.requestStatus == "fulfilled") {

            navigate('/company')
        }


    }

    const resendOtp = async () => {
        const data = await postData("/auth/otpresend", { email: email })
        if (data) {
            setMinutes(2)
            setSeconds(0)
            toast.success("otp send successfully")
        }

    }


    return (

        <div className="md:flex">
              
            <div className="bg-gradient-to-t via-customBlue from-customBlue  w-1/4 h-screen hidden md:block">

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
            <div className="h-screen flex flex-col  justify-items-center align items-center md:w-3/4 overflow-hidden">
                <div className='w-screen h-10'> <img src={logo} alt="" className='h-full' />dsvsd</div>
                <div className='w-full h-full relative blur bg-cover bg-center'>
                    <img src={office_desk} className='w-full h-full' />
                </div>
                {loading ?
                    <div className='flex flex-col justify-center items-center h-full absolute '><CircularProgress /></div>
                    :
                    <div className='flex flex-col justify-center items-center h-full absolute '>
                        <h1 className='font-bold'>Signin to <span className='text-[25px] text-customBlue'>bureaudesk</span></h1>
                        <form className='mt-6' onSubmit={formik.handleSubmit}>
                            {!otpdisplay && <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  {...formik.getFieldProps('email')} />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-600">{formik.errors.email}</div>
                                )}
                            </div>}
                            {otpdisplay && <div className='flex flex-col '>
                                <label htmlFor="otp" className='text-center font-bold mb-3'>OTP</label>
                                <div >
                                    {[otp1, otp2, otp3, otp4].map((otp, index) => (
                                        <input type="text" maxLength={1} className="shadow mx-1 font-bold appearance-none border rounded w-[70px] h-[70px] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                                            minLength={1}
                                            required
                                            ref={inputRefs[index]}
                                            name={`otp-${index + 1}`}
                                            id={`otp-${index + 1}`}
                                            value={otp}
                                            onFocus={() => setFocusedInput(index)}
                                            onChange={(e) =>
                                                handleOtpChange(index + 1, e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                handleBackSpace(index + 1, e)
                                            }

                                        />
                                    ))}
                                </div>
                                <div className='flex justify-between items-center' onClick={resendOtp}>
                                    <div><p className='text-blue-600 cursor-pointer hover:text-blue-900 mt-3'>resend otp</p></div>
                                    <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} />
                                </div>

                            </div>}
                            {!otpdisplay && <div className='mt-9'>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  {...formik.getFieldProps('password')} />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-600">{formik.errors.password}</div>
                                )}
                            </div>}
                            {!otpdisplay && <div>
                                <label htmlFor="password">confirm Password</label>
                                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  {...formik.getFieldProps('confirm_password')} />
                                {formik.touched.confirm_password && formik.errors.confirm_password && (
                                    <div className="text-red-600">{formik.errors.confirm_password}</div>
                                )}
                            </div>}
                            {!otpdisplay && <div className="flex items-center justify-center mt-5">
                                <button className="bg-blue-500 w-[200px] flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    <span>generate otp</span>
                                    <BsArrowRightShort className="ml-2" />
                                </button>

                            </div>}

                            {otpdisplay && <div>
                                <button type="button" onClick={handleverifyotp} className="flex flex-row mt-9 items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-500 hover:bg-red-950 border-none text-white text-sm shadow-sm" >
                                    Verify Account
                                </button>
                            </div>}
                        </form>
                    </div>}
            </div>
        </div>
    )
}

export default signinpage