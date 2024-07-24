import { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import fetchData from '../../utils/fetchdata'
import Editprofilemodal from '../modals/Editprofilemodal'
import Profilecard from '../cards/Profilecard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata';
import { RiLockPasswordFill } from 'react-icons/ri';
import updateData from '@/utils/updatedata';
import { toast } from 'react-toastify';
import { iprop } from '@/interface/viewprofile';





function Viewprofile({ id }: iprop) {
  const email = useSelector((state: RootState) => state.userdetails.user.email)
  const [changePasswordComponent, SetChangePasswordComponent] = useState<any>(false)
  const [otpComponent, SetOtpComponent] = useState<any>(false)
  const [user, setuser] = useState(null as any)
  const [displaymodal, setdisplaymodal] = useState(false)
  useEffect(() => {
    async function fetch() {
      const response = await fetchData(`/user/getuserbyid/${id}`)
      setuser(response.data)
    }
    fetch()
  }, [displaymodal])

  const validationSchemaOtp = Yup.object({
    otp: Yup.string()
      .length(4, 'OTP must be exactly 4 digits')
      .matches(/^[0-9]+$/, 'OTP must be numeric')
      .required('OTP is required')
  });


const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'New password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'New password must contain at least one letter')
        .matches(/\d/, 'New password must contain at least one number'),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword') as unknown as string, ''], 'Confirm password must match the new password'),
});

  return (
    <div className='w-5/6 h-screen px-2 py-2'>
      <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>profile</h1>
          <div className='flex justify-between gap-2 items-center'>

          </div>
        </div>
        <div className='mt-2 flex'>
          <Profilecard user={user as any} displaymodal={displaymodal} setdisplaymodal={setdisplaymodal} />
          <div className='w-full flex gap-3 ml-3'>
            {/* <div className='flex justify-center'>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="account">performace</TabsTrigger>
                  <TabsTrigger value="password">team</TabsTrigger>
                  <TabsTrigger value="task">task</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
                <TabsContent value="task">Change your password here.</TabsContent>
              </Tabs>
            </div> */}
            <div className='w-64 h-96 bg-white mt-8 rounded-xl p-3'>
              <p className='text-slate-500 text-xl'>settings:</p>
              <p className='text-slate-500 text-lg mt-3 flex items-center gap-2 p-2 hover:bg-blue-400 hover:text-black rounded-xl cursor-pointer' onClick={() => SetChangePasswordComponent(true)}> <RiLockPasswordFill /><span>change password</span></p>
              <p className='text-slate-500 text-lg flex items-center gap-2 p-2 hover:bg-blue-400 hover:text-black rounded-xl cursor-pointer' onClick={() => SetChangePasswordComponent(true)}> <RiLockPasswordFill /><span>notification</span></p>
            </div>
            {changePasswordComponent && <div className='w-64 h-96 bg-white mt-8 rounded-xl p-3'>
              <p className=' text-xl text-center font-medium'>change password</p>

              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { }) => {


                  const { data } = await postData("auth/updateuser", { ...values, email })
                  localStorage.setItem('passwordData', JSON.stringify(values));
                  if (data) {
                    SetChangePasswordComponent(false)
                    SetOtpComponent(true)
                  }

                  //  localStorage.setItem('passwordData', JSON.stringify(values));
                  // alert('Password change request has been saved locally');
                  // setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className='mt-4'>
                      <label className='text-sm text-slate-600'>Current Password:</label>
                      <Field type="password" name="currentPassword" className="border border-black rounded-md" />
                      <ErrorMessage name="currentPassword" component="div" className='text-red-400' />
                    </div>
                    <div>
                      <label className='text-sm text-slate-600'>New Password:</label>
                      <Field type="password" name="newPassword" className="border border-black rounded-md" />
                      <ErrorMessage name="newPassword" component="div" className='text-red-400' />
                    </div>
                    <div>
                      <label className='text-sm text-slate-600'>Confirm Password:</label>
                      <Field type="password" name="confirmPassword" className="border border-black rounded-md" />
                      <ErrorMessage name="confirmPassword" component="div" className='text-red-400' />
                    </div>
                    <div className='w-full flex justify-center'>
                      <button type="submit" disabled={isSubmitting} className='bg-green-400 px-3 rounded-xl mt-3 '>Submit</button>

                    </div>
                  </Form>
                )}
              </Formik>
            </div>}
            {otpComponent &&
              <div className='w-64 h-96 bg-white mt-8 rounded-xl p-3'>
                <div className='w-64 h-96 bg-white mt-8 rounded-xl p-3'>
                  <Formik
                    initialValues={{ otp: '' }}
                    validationSchema={validationSchemaOtp}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true);


                      try {
                        const localStoragedata: any = localStorage.getItem('passwordData')
                        const parsedLocalStorageData = localStoragedata ? JSON.parse(localStoragedata) : {};
                        // await onSubmit(values);
                        const { status } = await updateData("/auth/updateuser", { ...values, ...parsedLocalStorageData, email })
                        if (status) {
                          SetChangePasswordComponent(false)
                          SetOtpComponent(false)
                          toast.success("password changed sucessfully")
                        } else {
                          throw new Error("wrong otp")
                        }
                      } catch (error) {
                        toast.error('wrong otp');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className='flex flex-col justify-center items-center'>
                        <div className='mb-4 w-full'>
                          <label htmlFor='otp' className='block text-gray-700'>
                            Enter OTP
                          </label>
                          <Field
                            type='text'
                            id='otp'
                            name='otp'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          />
                          <ErrorMessage
                            name='otp'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>
                        <button
                          type='submit'
                          className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>

              </div>
            }
          </div>
        </div>
      </div>
      {displaymodal && <Editprofilemodal modal={setdisplaymodal as any} />}
    </div>
  )
}

export default Viewprofile
