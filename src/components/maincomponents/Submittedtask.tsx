import  { useEffect, useState } from 'react'
import addfile from "../../assets/Add Attachments.png"
import postData from '@/utils/postdata';
import { useNavigate } from 'react-router-dom';
import { TaskInfo } from '@/interface/submittedtask';




const Submittedtask = ({ taskInfo }: {

    taskInfo: any

}) => {
    const navigate=useNavigate()

    function getFileNameFromUrl(url: any) {
        if (url || url == "") {
            const parts = url.split('/');
            return parts[parts.length - 1];
        }

    }

    const [submittedTaskInfo, setSubmittedTaskInfo] = useState<TaskInfo | null>(null)

    useEffect(() => {
        async function getdata() {
            const data = await postData("/company/getsubmittask", {

                taskId: taskInfo._id
            })
            
            setSubmittedTaskInfo(data.data[0] as TaskInfo)

        }

        getdata()

    }, [])
    return (
        <div>
            <p className='font-medium mt-1 text-sm'>description:</p>
            <p className='text-sm'>{submittedTaskInfo?.taskNote}</p>
            <div className='w-36 h-28 rounded-xl relative overflow-hidden '>
                <div className='flex justify-start items-center mt-1 '>
                    <a
                        href={taskInfo?.files[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-36 h-28 rounded-xl relative overflow-hidden block'
                    >
                        <div className='flex justify-between absolute w-full'>
                            <div>

                            </div>
                            <img src={addfile} alt="" className='w-8 ' />
                        </div>
                        <iframe
                            src={submittedTaskInfo?.taskFile}
                            className="w-48 overflow-hidden h-full"
                            title="PDF"
                        ></iframe>

                        <div className='absolute w-full bg-white top-16 h-12 p-2 rounded-t-2xl border text-sm'>
                            {getFileNameFromUrl(submittedTaskInfo?.taskFile)}
                        </div>
                    </a>
                </div>
            </div>
            <div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold mt-3 py-1 px-2 rounded add employees flex justify-center items-center gap-2" onClick={() => { navigate(`/projects/taskdetails/${taskInfo._id}`) }}><span className='text-sm' >more details</span></button>

            </div>

        </div>
    )
}

export default Submittedtask
