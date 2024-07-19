import { RootState } from '@/redux/store'
import fetchData from '@/utils/fetchdata'
import React, { useEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Employeetaskcard from '../cards/Employeetaskcard'
import postData from '@/utils/postdata'
import Taskinfocard from '../cards/Taskinfocard'
import { useNavigate } from 'react-router-dom'

const ViewProjects = () => {
    const [project, setProject] = useState<any>([])
    const companyId = useSelector((state: RootState) => state.companydetails.company._id)
    const [projectId, setProjectId] = useState("")
    const [taskdata, settaskdata] = useState([])
    const [taskInfoData, setTaskInfoData] = useState(null)
    const [style, setstyle] = useState(0)
    const navigate = useNavigate()
    const userRole=useSelector((state:RootState)=>state.userdetails.user.Authorization)
    const userDepartment=useSelector((state:RootState)=>state.userdetails.user.Departmentid)


    useEffect(() => {
        const getdata = async () => {
            const { data } = await fetchData(`/company/getprojects/${companyId}`)

            
            setProject(data)
            onGoingTask(data[0]._id)
            // setTaskInfoData(data[0])
        }
        getdata()
    }, [companyId]) // Only run this effect when companyId changes




    const handleClick = (index: number) => {

        setstyle(index)
        // setdpt(data)
    }

    const onGoingTask = async (id: any) => {
        let response:any;
        if(userRole=="root_node"){
             response = await postData("/company/gettask", {
                projectId: id
            });
        }
        if(userRole == "basic_node" || userRole == "basic_node"){
            response = await postData("/company/gettask", {
                projectId: id,
                Departmentid:userDepartment
            });
        }
        
        const data = response.data;

        for (let i = 0; i < data.length; i++) {
            data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
            data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);

        }

        setTaskInfoData(data[0])
        settaskdata(data);




    }


    function getTaskInfo(data: any) {
        setTaskInfoData(data)
    }



    return (
        <div>
            <p className='font-bold text-4xl mt-5'>All Projects</p>
            <div className='mt-5 flex gap-8 '>
                <div className='w-52 bg-white rounded-xl min-h-96 min-w-44 overflow-scroll overflow-x-hidden h-96 '>
                    <div className='border-b-2'>
                        <div className='p-4'>
                            <p className='flex items-center font-semibold text-sm'>Projects <span><AiOutlineDown /></span></p>
                        </div>
                    </div>

                    <div className='p-1'>
                        {project?.map((item: any, index: number) => (

                            <div key={index} className={`p-1  mt-1 ${style === index ? 'border-blue-500 border-l-2 pr-0' : ''}`} onClick={() => { onGoingTask(item._id); handleClick(index) }}>
                                <div className={`p-2 bg-slate-100 rounded-xl mt-1 cursor-pointer hover:bg-blue-100 duration-0 ${style === index ? 'rounded-r-none' : ''}`}>
                                    <div className='flex items-center'>
                                    <p className='font-semibold text-sm'>{item?.projectName}</p>
                                     {item?.completed && <p>✅</p>}
                                    </div>
                                    <p className='flex items-center gap-1 text-blue-400 hover:ml-1 duration-100 w-28 text-sm' onClick={() => navigate(`/projects/projectdetails/${item._id}`)}>View details<span className=''><AiOutlineRight /></span></p>
                                </div>
                            </div>

                        ))
                        }
                    </div>
                </div>
                <div className='w-full'>
                    <p className='font-semibold text-xl'>{taskdata.length} tasks are ongoing related to this project</p>
                    <Employeetaskcard data={taskdata} getTaskInfo={getTaskInfo} />
                </div>
                <Taskinfocard taskInfo={taskInfoData} />
            </div>
        </div>
    )
}

export default ViewProjects
