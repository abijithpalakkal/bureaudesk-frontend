import fetchData from '@/utils/fetchdata'
import React, { useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface iCloseProp{
    closemodal:any
    refresh:any
    val:any
    id:string
}

const Eventclosemodal = ({closemodal,refresh,val,id}:iCloseProp) => {
    console.log(id,123456789)
   
        const deletedata=async ()=>{
            await fetchData(`/company/deleteevent/${id}`)
            refresh(!val)
            closemodal(false)
        }
        
    
  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen h-screen">
        <div className=" inset-0 bg-black  opacity-50 relative h-full w-full"></div>
        <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">

          <div className='bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black' onClick={()=>{closemodal(false)}} ><BiArrowBack /></div>
         <p className='mt-4'>are you sure you want to delete the event?</p>
         <div className='flex justify-between items-center'>
            <div></div>
            <div className='flex justify-center items-center mt-3 gap-2'>
            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={deletedata}><span >Yes</span> </button>
            <button className="bg-slate-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={()=>{closemodal(false)}}><span >Cancel</span> </button>

            </div>
         </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Eventclosemodal
