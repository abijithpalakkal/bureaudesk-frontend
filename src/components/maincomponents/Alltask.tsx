import React, { useEffect, useState } from 'react'
import Departmentsidebar from './Departmentsidebar'
import Employeetaskcard from '../cards/Employeetaskcard'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import Taskinfocard from '../cards/Taskinfocard'
import { useContext } from 'react'
import { AppContext } from '../maincomponents/Project'
import { toast } from 'react-toastify'
import EmployeeCardSkeleton from '../skeleton/EmployeeCardSkeleton'

const Alltask = () => {
    const [dpt, setdpt] = useState(null)
    const [taskdata, settaskdata] = useState([])
    const [taskInfoData, setTaskInfoData] = useState(null)
    const [skeleton, setskeleton] = useState(false)

    const context = useContext(AppContext);
    const { apiRefresh, setApiRefresh } = context;


    console.log("in all task")

    console.log(dpt, "sadca")

    function changedpt(data: any) {
        console.log(data, 948645)
        setdpt(data)
    }
    useEffect(() => {
        const fetchtaskuser = async () => {
            try {
                setskeleton(true)
                const response: any = await postData("/company/gettask", dpt);
                console.log(response);
                const data = response.data;

                for (let i = 0; i < data.length; i++) {
                    data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
                    data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);

                }

                settaskdata(data);
                setTaskInfoData(data[0])

            } catch (e) {
                toast.error("error in fetching data")
            } finally {
                setskeleton(false)
            }

        }

        fetchtaskuser();
    }, [dpt, apiRefresh]);


    function getTaskInfo(data: any) {
        setTaskInfoData(data)
    }



    return (
        <div className='flex'>
            <Departmentsidebar setdpt={changedpt} />
            <div className='ml-4 w-full'>
                {!skeleton && <Employeetaskcard data={taskdata} assigned='all' refresh={false} setrefresh={() => { }} getTaskInfo={getTaskInfo} />}
                {skeleton &&
                    <>
                        <EmployeeCardSkeleton />
                        <EmployeeCardSkeleton />
                        <EmployeeCardSkeleton />

                    </>

                }
            </div>
            <Taskinfocard taskInfo={taskInfoData} />

        </div>
    )
}
 
export default Alltask
