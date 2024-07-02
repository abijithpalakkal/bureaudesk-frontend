import React, { useEffect, useState } from 'react'
import Employeetaskcard from '../cards/Employeetaskcard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import Taskinfocard from '../cards/Taskinfocard'
import { useContext } from 'react'
import { AppContext } from '../maincomponents/Project'
import { toast } from 'react-toastify'
import EmployeeCardSkeleton from '../skeleton/EmployeeCardSkeleton'


const Taskassignedtoyou = () => {
  const companyid = useSelector((state: RootState) => state.companydetails.company._id)
  const userid = useSelector((state: RootState) => state.userdetails.user._id)
  const [taskdata, settaskdata] = useState([])
  const [taskInfoData, setTaskInfoData] = useState(null)
  const [refresh, setrefresh] = useState(false);
  const [skeleton, setskeleton] = useState(false)

  const context = useContext(AppContext);
  const { apiRefresh, setApiRefresh } = context;

  useEffect(() => {
    async function userdata() {
      try {
        setskeleton(true)
        const response = await postData("/company/gettask", {
          companyid: companyid,
          assignedTo: userid
        })
        console.log(response, "dskafcik");
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
          data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);
        }
        settaskdata(data);
        setTaskInfoData(data[0])

      } catch (e) {
        toast.error("fetching data failed")
      } finally {
        setskeleton(false)
      }
    }

    userdata()
  }, [companyid, userid, refresh, apiRefresh])



  function getTaskInfo(data: any) {
    setTaskInfoData(data)
  }


  return (
    <div className='flex'>
      {!skeleton && <Employeetaskcard data={taskdata} assigned={"toYou"} refresh={refresh} setrefresh={setrefresh} getTaskInfo={getTaskInfo} />}
      {skeleton && <EmployeeCardSkeleton />}
      <Taskinfocard taskInfo={taskInfoData} />
    </div>

  )
}

export default Taskassignedtoyou
