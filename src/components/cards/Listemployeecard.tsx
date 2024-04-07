import React from 'react'
import dummyprofile from "../../assets/dummy-profile-pic-300x300-1.png"


function Listemployeecard({ item }: any) {
    return (
        <div className=' flex justify-between items-center border-2 border-blue-400 rounded-xl p-2 mt-4 bg-white shadow-md'>
            <div className='flex justify-start items-center gap-5 w-96'>
                <div className='w-16 rounded-3xl overflow-hidden'>
                    <img src={dummyprofile} alt="" className='' />
                </div>
                <div className=''>
                    <p className=''>{item?.name}</p>
                    <p className=''>{item?.email}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-full'>
                    <p className='text-gray-600'>age</p>
                    <p>{item?.age}</p>
                </div>
            </div>
            <div className='flex '>

                <div>
                    <p className='text-gray-600'>mobile no.</p>
                    <p>{item?.mobileno}</p>
                </div>
            </div>
            <div className='flex '>

                <div>
                    <p className='text-gray-600'>position</p>
                    <p>{item?.position}</p>
                </div>
            </div>
            <div className='flex text-gray-600 mr-7 cursor-pointer'>

                <p>•</p>
                <p>•</p>
                <p>•</p>
            </div>

        </div>
    )
}

export default Listemployeecard
