import React, { useEffect, useState } from 'react'
import Departmentsidebar from './Departmentsidebar'
import Employeetaskcard from '../cards/Employeetaskcard'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import Taskinfocard from '../cards/Taskinfocard'

const Alltask = () => {
    const [dpt, setdpt] = useState(null)
    const [taskdata, settaskdata] = useState([])
    const [taskInfoData, setTaskInfoData] = useState(null)

    console.log(dpt, "sadca")

    function changedpt(data: any) {
        console.log(data,948645)
        setdpt(data)
    }
    useEffect(() => {
        const fetchtaskuser = async () => {
            const response: any = await postData("/company/gettask", dpt);
            console.log(response);
            const data = response.data;

            for (let i = 0; i < data.length; i++) {
                data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
                data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);

            }

            settaskdata(data);
            setTaskInfoData(data[0])

        };

        fetchtaskuser();
    }, [dpt]);

    
  function getTaskInfo(data: any) {
    setTaskInfoData(data)
  }



    return (
        <div className='flex'>
            <Departmentsidebar setdpt={changedpt} />
            <div className='ml-4 w-full'>
            <Employeetaskcard data={taskdata} assigned='all' refresh={false} setrefresh={()=>{} }  getTaskInfo={getTaskInfo} />
            </div>
            <Taskinfocard taskInfo={taskInfoData}/>
          
        </div>
    )
}

export default Alltask
