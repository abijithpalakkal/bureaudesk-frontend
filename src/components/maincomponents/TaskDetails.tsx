import fetchData from '@/utils/fetchdata'
import postData from '@/utils/postdata'
import React, { useEffect, useState } from 'react'
import { AiFillCalendar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const TaskDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState<any>([])
    const [teamDetails, setTeamDetails] = useState<any>([])
    const [populatedData, setPopulatedData] = useState<any>(null);


    useEffect(() => {
        const getData = async () => {

            const response: any = await postData("/company/gettask", { _id: id });
            console.log(response.data)
            setData(response.data)
        }
        getData()
    }, [id])

    useEffect(() => {
        const getData = async () => {
            if (data[0]?.projectId) {
                console.log(data[0]?.projectId, "data[0]?.projectId.teamId")
                if (data[0]?.projectId.teamId) {
                    console.log(data[0]?.projectId.teamId,"(data[0]?.projectId.teamId")
                    const responseData = await fetchData(`/company/getteam/${data[0]?.projectId.teamId}`)
                    setTeamDetails(responseData.data)
                    console.log(responseData.data, "teamDetails")
                    if (responseData.data.length > 0) {
                        console.log(responseData.data[0].members,"(responseData.data[0].members")
                        populateData(responseData.data[0].members)
                    }
                }


            }
        }

        getData()
    }, [data])

    const populateData = async (arr: string[]) => {
        try {
            let arr1: any = [];
            for (let i = 0; i < arr.length; i++) {
                const { data } = await fetchData(`/user/getuserbyid/${arr[i]}`);
                arr1.push(data);
            }
            console.log(arr1, "arr1");
            setPopulatedData([...arr1]);
        } catch (error) {
            console.error('Error populating data:', error);
        }
    };

    function formatDateString(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    console.log(id)
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
                                <p  className='text-[12px] font-medium text-slate-500'>{userData?.position}</p>
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
                    <p className='font-semibold text-2xl'>{data[0]?.taskName}</p>
                    <p className='text-gray-400 text-lg mt-6'>{data[0]?.taskDescription}</p>
                    <p className='font-semibold text-xl'>task attachments</p>
                    
                </div>
            </div>
            <div className='h-96 w-3/12 p-2 min-h-96'>
                <div className=' bg-black w-full h-full rounded-lg'>

                </div>
            </div>


        </div>
    )
}

export default TaskDetails
