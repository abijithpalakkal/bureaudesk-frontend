import React, { useEffect, useState } from 'react'
import Employeetaskcard from '../cards/Employeetaskcard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'

const Taskassignedtoyou = () => {
    const companyid=useSelector((state:RootState)=>state.companydetails.company._id)
    const userid=useSelector((state:RootState)=>state.userdetails.user._id)
    const [taskdata,settaskdata]=useState([])

    useEffect(()=>{
        async function userdata() {
            const response= await postData("/company/gettask",{
                companyid:companyid,
                assignedTo:userid
            })
            console.log(response,"dskafcik");
            const data = response.data;

            for (let i = 0; i < data.length; i++) {
                data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
                data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);
            }
            settaskdata(data);
        }
        userdata()
    },[companyid, userid])
  return (
    <div>
      <Employeetaskcard data={taskdata} assigned={"toYou"}/>
    </div>
  )
}

export default Taskassignedtoyou
