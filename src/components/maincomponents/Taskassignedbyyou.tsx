import React, { useEffect, useState } from 'react'
import Employeetaskcard from '../cards/Employeetaskcard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import Taskinfocard from '../cards/Taskinfocard'
import { useContext } from 'react'
import { AppContext } from '../maincomponents/Project'

const Taskassignedbyyou = () => {

    const companyid=useSelector((state:RootState)=>state.companydetails.company._id)
    const userid=useSelector((state:RootState)=>state.userdetails.user._id)
    const [taskdata,settaskdata]=useState([])
    const [taskInfoData, setTaskInfoData] = useState(null)

    const context = useContext(AppContext);
    const { apiRefresh, setApiRefresh } = context;


    useEffect(()=>{
        async function userdata() {
            const response= await postData("/company/gettask",{
                companyid:companyid,
                assignedBy:userid
            })
            console.log(response,"dskafcik");
            const data = response.data;

            
            for (let i = 0; i < data.length; i++) {
                data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
                data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);

            }

            settaskdata(data);
            setTaskInfoData(data[0])
        }
        userdata()
    },[companyid, userid,apiRefresh])


    function getTaskInfo(data: any) {
      setTaskInfoData(data)
    }

  return (
    <div className='flex'>
      <Employeetaskcard data={taskdata} assigned={"byYou"}  getTaskInfo={getTaskInfo}/>
      <Taskinfocard taskInfo={taskInfoData} />
    </div>
  )
}

export default Taskassignedbyyou
