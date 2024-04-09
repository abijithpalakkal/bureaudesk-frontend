import React from 'react'
import logo from "../../assets/dummy-profile-pic-300x300-1.png"

function Profilecard({user}:any) {
  return (
    <div>

            <div className='w-32 h-32 rounded-full overflow-hidden flex justify-center items-center'>
              {user?.profileImage && <img src={user.profileImage} alt="" />}
              {!user?.profileImage && <img src={logo} alt="" />}

            </div>
            <p>{user?.Name}</p>
            <p className='text-gray-500'>{user?.email}</p>
            <div className='w-full bg-gray-400 h-1 mt-1 mb-1'></div>
            {!user?.Name && <p className='text-red-600'>*your profile is incomplete.complete your profile to be recognizable.</p>}
            <div className=' mt-4 border-2 border-cyan-600 rounded-md p-4 w-96 text-blue-900'>
              <p className='text-2xl'>name:{user?.Name}</p>
              <p className='text-2xl'>dob:{user?.Dob}</p>
              <p className='text-2xl'>contactno:{user?.Contactno}</p>
              <p className='text-2xl'>age:{user?.age}</p>
              <p className='text-2xl'>location:{user?.Location}</p>
            </div>

          </div>
  )
}

export default Profilecard
