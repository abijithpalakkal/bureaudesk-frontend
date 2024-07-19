import fetchData from '@/utils/fetchdata';
import React, { useEffect, useState } from 'react'
import { GrAttachment } from 'react-icons/gr';
import { useParams } from 'react-router-dom';
import progress from "../../assets/progress.png"
import { AiFillCalendar } from 'react-icons/ai';
import updateData from '@/utils/updatedata';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Muiconfirmationmodalforproject from '../modals/Muiconfirmationmodalforproject';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const ProjectDetails = () => {
    const [project, setproject] = useState<any>([])
    const { id } = useParams();
    const [team, setTeam] = useState<any>(null)
    const [populatedData, setPopulatedData] = useState<any>(null);
    const { width, height } = useWindowSize()
    const [refresh,setRefresh] = useState<boolean>(false)
    const [confetti,setConfetti]= useState<boolean>(false)
    const userRole=useSelector((state:RootState)=>state.userdetails.user.Authorization)





    useEffect(() => {
        const getdata = async () => {
            const { data } = await fetchData(`/company/getprojects/${id}`)
            setproject(data)
        }
        getdata()
    }, [id,refresh])

    useEffect(() => {
        const getteamdata = async () => {
            if (project[0].teamId) {
                const { data } = await fetchData(`/company/getteam/${project[0].teamId}`)
                if (data.length > 0) {
                    setTeam(data[0])
                    populateData(data[0]?.members)

                }
            }

        }
        getteamdata()
    }, [project,refresh])

    const populateData = async (arr: string[]) => {
        try {
            let arr1: any = [];
            for (let i = 0; i < arr.length; i++) {
                const { data } = await fetchData(`/user/getuserbyid/${arr[i]}`);
                arr1.push(data);
            }
            setPopulatedData([...arr1]);
        } catch (error:any) {
            toast.error('Error populating data:', error);
        }
    };



    function getFileNameFromUrl(url: string) {
        if (url || url == "") {
            const parts = url.split('/');
            return parts[parts.length - 1];
        }

    }

    function calculateTimeLeft(task: { deadLine: string; }): string {
        const { deadLine } = task;
        const deadlineDate = new Date(deadLine);
        deadlineDate.setHours(23, 59, 59, 999); // Set deadline time to the end of the day

        const now = new Date();

        if (now > deadlineDate) {
            return "The time is expired";
        }

        return `${formatTimeDifference(now, deadlineDate)} left`;
    }

    function formatTimeDifference(startDate: Date, endDate: Date): string {
        const totalSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }


    function formatDateString(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function formatDateString2(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    return (
        <div className='flex justify-around'>
           {confetti && <Confetti
                width={width}
                height={height}
            />}
            <div className='mt-6 bg-white p-5 rounded-xl w-2/3'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-2xl'>{project[0]?.projectName}</p>
                    {project[0]?.completed &&  <p className='font-medium p-2 bg-blue-400 rounded-xl'>Completed✅</p>
                }
                  { !project[0]?.completed && userRole=="root_node" && <Muiconfirmationmodalforproject id={id} refresh={refresh} setrefresh={setRefresh} confetti={setConfetti}/>}
                </div>
                <p className='text-gray-400 text-lg mt-2'>{project[0]?.projectDescription}</p>
                <div className='mt-5'>
                    <p className='font-semibold text-xl'>task attachments({project[0]?.attachments.length})</p>
                    {project[0]?.attachments && <div className='grid grid-cols-5'>

                        {project[0]?.attachments.map((obj: string, index: number) => (<div className='flex justify-start items-center mt-1 '>
                            <a
                                href={obj}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='w-36 h-28 rounded-xl relative overflow-hidden block'
                            >
                                <div className='w-36 h-28 rounded-xl relative overflow-hidden '>
                                    <div className='flex justify-between absolute w-full'>
                                        <div>

                                        </div>
                                        {/* <img src={addfile} alt="" className='w-8 ' /> */}
                                    </div>
                                    <iframe
                                        src={obj}
                                        className="w-48 overflow-hidden h-full"
                                        title="PDF"
                                    ></iframe>

                                    <div className='absolute w-full bg-white top-16 h-12 p-2 rounded-t-2xl border text-sm'>
                                        {getFileNameFromUrl(obj)}
                                    </div>
                                </div>
                            </a>
                        </div>))}
                    </div>}
                    {!project[0]?.attachments && <p className='font-semibold text-xl'>NONE</p>}
                </div>

                <div className='w-full h-28 mt-3 rounded-2xl p-3 bg-blue-100 '>
                    <p className='font-medium'>Time Tracking</p>
                    <div className='flex gap-4'>
                        <div className='flex justify-center items-center'> <img src={progress} alt="" /></div>

                        <div>
                            <p className='mt-2'><span>{calculateTimeLeft({ deadLine: project[0]?.deadLine })}</span></p>
                            <p className='text-slate-500'><span>{project[0]?.priority}</span> priority</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex items-center mt-2'>
                        <div className='w-10 h-0 border '></div>
                        <p className='text-sm text-slate-500'>DeadLine</p>
                        <div className='w-36 h-0 border'></div>
                    </div>
                    <p className='text-slate-500 text-sm mt-1'>{formatDateString2(project[0]?.deadLine)}</p>
                    <p className='flex justify-start items-center text-slate-500 text-sm mt-5'> <p className='flex items-center'>
                        <AiFillCalendar /> <span>created at </span><span>{formatDateString(project[0]?.createdAt)}</span>
                    </p></p>
                </div>
            </div>


            <div className='w-80 0 mt-10 rounded-xl overflow-hidden'>
                <div className='p-4 bg-blue-100 min-h-96'>
                    <p className='font-medium text-2xl'>Team Details</p>
                    {team ? (
                        <>
                            <p className='text-lg font-medium mt-2'>{team.name}({team?.departmentid})</p>
                            <p>{team?.description}</p>
                            <p className='mt-2 font-medium'>Members:</p>
                            {populatedData && populatedData.length > 0 ? (
                                populatedData.map((userData: any, id: number) => (
                                    <div key={id} className='flex justify-between mt-3 border border-blue-500 p-1 rounded-md items-center'>
                                        <img src={userData.profileImage} alt={userData?.name} className='h-10 w-10 rounded-full' />
                                        <p>{userData?.Name}</p>
                                        <p>{userData?.position}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No members found.</p>
                            )}
                        </>) :

                        (
                            <div className='w-full h-full flex justify-center items-center'>
                                <p className='text-2xl font-medium text-center'>Stand Alone</p>
                            </div>
                        )}
                </div>

            </div>


        </div>
    )
}

export default ProjectDetails
