import React from 'react'
import logo from "../../assets/dummy-profile-pic-300x300-1.png"
import editicon from "../../assets/edit icon.png"

function Profilecard({ user,displaymodal,setdisplaymodal }: any) {
  function convertISOToNormalDate(isoDateString:string) {
    const date = new Date(isoDateString);
  
    // Formatting the date in a desired format
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  
    return formattedDate;
  }
  return (
    <div className='bg-white w-64 rounded-xl p-4'>

      <div className=' flex justify-between items-center'>
        {user?.profileImage && <img src={user.profileImage} alt="" className='w-20 h-20 rounded-full'/>}
        {!user?.profileImage && <img src={logo} alt="" className='w-32 h-32' />}
        <div className='cursor-pointer w-6 hover:w-8 duration-300' onClick={()=>setdisplaymodal(true)}>
        <img src={editicon} alt="" className=' w-full' />
        </div>
        
      </div>
      <p className='font-semibold mt-3'>{user?.Name}</p>
      <p className='text-gray-500'>{user?.position}</p>
      <p className='text-gray-500'>{user?.email}</p>
      <div className=' bg-gray-300 h-1 mt-2 '></div>
      {!user?.Name && <p className='text-red-600'>*your profile is incomplete.complete your profile to be recognizable.</p>}
      <div className=' rounded-md px-4 py-2 text-slate-500'>
        <p className='font-semibold text-black'>Main Info</p>
        <p className=''>name:</p>
        <div className='border p-2 rounded-xl'>
          <p>{user?.Name}</p>
        </div>
        <p className=''>dob:</p>
        <div className='border p-2 rounded-xl'>
          <p>{convertISOToNormalDate(user?.Dob)}</p>
        </div>
        <p className=''>contactno:</p>
        <div className='border p-2 rounded-xl'>
          <p>{user?.Contactno}</p>
        </div>
        <p className=''>age:</p>
        <div className='border p-2 rounded-xl'>
          <p>{user?.age}</p>
        </div>
        <p className=''>location:</p>
        <div className='border p-2 rounded-xl'>
          <p>{user?.Location}</p>
        </div>
      </div>
      {/* <p className='font-semibold'>Main Info</p>
        <p className='text-2xl'>name:{user?.Name}</p>
        <p className='text-2xl'>dob:{user?.Dob}</p>
        <p className='text-2xl'>contactno:{user?.Contactno}</p>
        <p className='text-2xl'>age:{user?.age}</p>
        <p className='text-2xl'>location:{user?.Location}</p>*/ }
    </div>

  )
}

export default Profilecard
