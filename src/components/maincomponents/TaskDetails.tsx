import fetchData from '@/utils/fetchdata'
import postData from '@/utils/postdata'
import  { useEffect, useState } from 'react'
import { AiFillCalendar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import addfile from "../../assets/Add Attachments.png"
import Taskinfocard from '../cards/Taskinfocard'
import { toast } from 'react-toastify'


const TaskDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState<any>([])
    const [_teamDetails, setTeamDetails] = useState<any>([])
    const [populatedData, setPopulatedData] = useState<any>(null);


    useEffect(() => {
        const getData = async () => {

            const response: any = await postData("/company/gettask", { _id: id });
            setData(response.data)
        }
        getData()
    }, [id])

    useEffect(() => {
        const getData = async () => {
            if (data[0]?.projectId) {
                if (data[0]?.projectId.teamId) {
                    const responseData = await fetchData(`/company/getteam/${data[0]?.projectId.teamId}`)
                    setTeamDetails(responseData.data)
                    if (responseData.data.length > 0) {
                        populateData(responseData.data[0].members)
                    }
                }


            }
        }

        getData()
    }, [data])

    function getFileNameFromUrl(url: string) {
        if (url || url == "") {
            const parts = url.split('/');
            return parts[parts.length - 1];
        }

    }


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

    function formatDateString(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }



    const getGaugeValue = (status: any) => {
        switch (status) {
            case "Assigned":
                return 0;
            case "Started":
                return 25;
            case "in-Progress":
                return 50;
            case "Done":
                return 80;
            case "Approved":
                return 100;
            case "Rejected":
                return 0;
            default:
                return 0;
        }
    };
    return (
        <div className='mt-5 flex w-full justify-between'>


            <div className='p-2  w-2/12'>
                {data[0]?.projectId && <div className='bg-white p-5 rounded-xl'>
                    <p className='text-slate-500'>part Of:</p>
                    <p className='text-lg font-medium'>{data[0].projectId.projectName}</p>
                    <p className='text-sm font-medium text-slate-500 mt-3'>description:</p>
                    <p>
                        {data[0].projectId.projectDescription}
                    </p>
                    <p className='text-sm font-medium text-slate-500 mt-3'>assigned team:</p>
                    {populatedData && populatedData.length > 0 ? (
                        populatedData.map((userData: any, id: number) => (
                            <div key={id} className='flex justify-between mt-3 border border-blue-500 p-1 rounded-md items-center'>
                                <img src={userData.profileImage} alt={userData?.name} className='h-4 w-4 rounded-full' />
                                <p className='text-[12px] font-medium text-slate-500'>{userData?.Name}</p>
                                <p className='text-[12px] font-medium text-slate-500'>{userData?.position}</p>
                            </div>
                        ))
                    ) : (
                        <p>stand alone</p>
                    )}
                    <p className='text-sm font-medium text-slate-500 mt-3'>priority </p>
                    <p className='text-lg font-medium'>{data[0].projectId.priority}</p>
                    <p className='text-sm font-medium text-slate-500 mt-3'>deadline </p>
                    <p className='text-lg font-medium'>{data[0].projectId.deadLine}</p>
                    <p className='flex justify-start items-center text-slate-500 text-sm mt-5'> <p className='flex items-center'>
                        <AiFillCalendar /> <span>created at </span><span>{formatDateString(data[0].projectId.createdAt)}</span>
                    </p></p>
                </div>}
                {!data[0]?.projectId && <p className='font-semibold text-xl'>standalone Project</p>}
            </div>
            <div className='mt-6  p-2  w-7/12 min-h-96'>
                <div className='bg-white rounded-xl p-4 h-full'>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-2xl'>{data[0]?.taskName}</p>
                        <div className='w-20'>
                            {data[0]?.status === "Assigned" && (
                                <div className=' px-2 py-1 text-center rounded-lg border'>
                                    <p className='font-medium text-green-500 text-sm'>{data[0]?.status}</p>
                                </div>
                            )}
                            {data[0]?.status === "Started" && (
                                <div className='bg-slate-100 px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-slate-500 text-sm'>{data[0]?.status}</p>
                                </div>
                            )}
                            {data[0]?.status === "in-Progress" && (
                                <div className='bg-blue-100 px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-blue-500 text-sm'>{data[0]?.status}</p>
                                </div>
                            )}
                            {data[0]?.status === "Done" && (
                                <div className=' px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-green-500 text-sm'>
                                        done
                                    </p>
                                </div>
                            )}
                            {data[0]?.status === "Approved" && (
                                <div className=' px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-green-500 text-sm'>Approved✅</p>
                                </div>
                            )}
                            {data[0]?.status === "Rejected" && (
                                <div className=' px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-red-500 text-sm'>Rejected❌</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className='text-gray-400 text-lg mt-6'>{data[0]?.taskDescription}</p>
                    <div className='flex justify-between w-full'>
                        <p className='font-semibold text-xl'>task attachments</p>
                        <div className='w-20'>
                            <Gauge
                                width={50}
                                height={50}
                                value={getGaugeValue(data[0]?.status)}
                                cornerRadius="50%"
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 10,
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                        fill: '#52b202',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                        fill: theme.palette.text.disabled,
                                    },
                                })}
                            />
                        </div>

                    </div>
                    <p className='font-medium text-slate-500'>status Tracking:</p>
                    {data[0]?.comments.length > 0 && (
                        data[0]?.comments.map((comment: any, index: any) => (
                            <div key={index} className='flex border border-green-200 mt-2 p-1 rounded-lg justify-between'>
                                <div className='w-24'>
                                    <div className='w-20 '>
                                        {comment.status === "Assigned" && (
                                            <div className='px-2 py-1 text-center rounded-lg border'>
                                                <p className='font-medium text-green-500 text-sm'>{comment.status}</p>
                                            </div>
                                        )}
                                        {comment.status === "Started" && (
                                            <div className='bg-slate-100 px-2 py-1 text-center rounded-lg'>
                                                <p className='font-medium text-slate-500 text-sm'>{comment.status}</p>
                                            </div>
                                        )}
                                        {comment.status === "in-Progress" && (
                                            <div className='bg-blue-100 px-2 py-1 text-center rounded-lg'>
                                                <p className='font-medium text-blue-500 text-[12px]'>{comment.status}</p>
                                            </div>
                                        )}
                                        {comment.status === "Done" && (
                                            <div className='px-2 py-1 text-center rounded-lg'>
                                                <p className='font-medium text-green-500 text-sm'>Done</p>
                                            </div>
                                        )}
                                        {comment.status === "Approved" && (
                                            <div className='px-2 py-1 text-center rounded-lg'>
                                                <p className='font-medium text-green-500 text-sm'>Approved✅</p>
                                            </div>
                                        )}
                                        {comment.status === "Rejected" && (
                                            <div className='px-2 py-1 text-center rounded-lg'>
                                                <p className='font-medium text-red-500 text-sm'>Rejected❌</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {comment?.comments}
                                </div>
                                <div>
                                    {comment?.attachments? <div className='flex justify-start items-center mt-1 '>
                                        <a
                                            href={comment?.attachments}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='w-36 h-28 rounded-xl relative overflow-hidden block'
                                        >
                                            <div className='w-36 h-28 rounded-xl relative overflow-hidden '>
                                                <div className='flex justify-between absolute w-full'>
                                                    <div>

                                                    </div>
                                                    <img src={addfile} alt="" className='w-8 ' />
                                                </div>
                                                <iframe
                                                    src={comment?.attachments}
                                                    className="w-48 overflow-hidden h-full"
                                                    title="PDF"
                                                ></iframe>

                                                <div className='absolute w-full bg-white top-16 h-12 p-2 rounded-t-2xl border text-sm'>
                                                    {getFileNameFromUrl(comment?.attachments)}
                                                </div>
                                            </div>
                                        </a>
                                    </div>:<p className='font-medium text-slate-500'>no attachments</p>}
                                </div>
                            </div>
                        ))
                    )}


                </div>
            </div>
           
                <Taskinfocard taskInfo={data[0]}/>
            


        </div>
    )
}

export default TaskDetails
