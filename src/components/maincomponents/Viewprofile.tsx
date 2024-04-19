import React, { SetStateAction, useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import Listemployeecard from '../cards/Listemployeecard'
import { AiOutlinePlus } from 'react-icons/ai'
import logo from "../assets/dummy-profile-pic-300x300-1.png"
import fetchData from '../../utils/fetchdata'
import Editprofilemodal from '../modals/Editprofilemodal'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Profilecard from '../cards/Profilecard'

interface iprop {
  id: string
}

function Viewprofile({ id }: iprop) {
  const [user, setuser] = useState(null as any)
  const [displaymodal, setdisplaymodal] = useState(false)
  useEffect(() => {
    async function fetch() {
      const response = await fetchData(`/user/getuserbyid/${id}`)
      console.log(response, "shciaicoaocn")
      setuser(response.data)
    }
    fetch()
  }, [displaymodal])

  return (
    <div className='w-5/6 h-screen px-2 py-2'>
      <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>profile</h1>
          <div className='flex justify-between gap-2 items-center'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { setdisplaymodal(true) }}><span >edit profile</span> <span><AiOutlinePlus /></span></button>
          </div>
        </div>
        <div>
          <Profilecard user={user as any}/>
        </div>
      </div>
      {displaymodal && <Editprofilemodal modal={setdisplaymodal as any} />}
    </div>
  )
}

export default Viewprofile
