import React, { useContext, useRef, useState } from 'react'
import Uibuttons from '../buttons/uibuttons/Uibuttons'
import logo from "../../assets/logo_without_writing-removebg-preview.png"
import addlink from "../../assets/Add Link.png"
import addfile from "../../assets/Add Attachments.png"
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
import postData from '@/utils/postdata'
import { TaskStatusContext } from '@/context/TaskStatusContext';



const SubmitTaskStatus = ({ setDisplayStatusModal, status,id ,refresh,setrefresh,index}: any) => {

    const [taskDescription, setTaskDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [cloudfiles, setcloudfiles] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null);
    const context = useContext(TaskStatusContext)
  const { statusDetails, setStatusDetails } = context as any


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (selectedFiles && selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];

                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', "ckoevhm7");
                formData.append('public_id', file.name)

                try {

                    const response = await fetch('https://api.cloudinary.com/v1_1/dr6mbeqwc/image/upload', {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        // Extract URL from Cloudinary response
                        const data = await response.json();
                        const url = data.secure_url;
                        uploadedFileUrls.push(url);
                    } else {
                        toast.error('Failed to upload file:', file.name as any);
                        return 1
                    }
                } catch (error) {
                    toast.error('Error uploading file:', error as any);
                    return 1
                }
            }
           

        }

        let data1;
        if (uploadedFileUrls.length == 0 || null || "") {
            
            data1 = {
                status: status,
                commemts:{
                    status: status,
                    comments:taskDescription,
                    
                }
            };
        } else {
            data1 = {
                status: status,
                commemts:{
                    status: status,
                    comments:taskDescription,
                    attachments:uploadedFileUrls[0]
                }
            };
        }
        setStatusDetails({
            index: index,
            status: status
          })
        await postData(`/company/updatetask/${id}`,data1)

        setTaskDescription("")
        setSelectedFiles([])
        setrefresh(!refresh)
        setDisplayStatusModal(false)

    }



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSelectedFiles(event.target.files);
    };

    const uploadedFileUrls: string[] = [];

    const handleImageClick = () => {

        fileInputRef.current?.click();
    };



    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto transition-opacity duration-300`}>
            <div className="flex items-center justify-center min-h-screen h-screen">
                <div className="inset-0 bg-black opacity-50 relative h-full w-full"></div>
                <div className="bg-white rounded-lg shadow-2xl p-12 absolute">
                    <div className='flex justify-between'>
                        <div className='w-12'>
                            <img src={logo} alt="" />
                        </div>
                        <div className='bg-blue-100 w-6 h-6 rounded-md flex justify-center items-center hover:bg-blue-500  duration-500' onClick={() => setDisplayStatusModal(false)} ><AiOutlineClose /></div>
                    </div>
                    <form className='mt-4' onSubmit={handleSubmit}>
                        <p className='font-nunitosans font-semibold text-xl'>Edit Tasks</p>
                        <div className='flex flex-col mb-5 mt-3'>
                            <label htmlFor="description" className='text-slate-400'>Task Description:</label>
                            <textarea
                                id="description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-2 text-slate-400'
                            ></textarea>
                        </div>
                        <div className='flex gap-5 mb-4'>
                            <div className='w-10 h-10 flex justify-center items-center'>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"

                                />
                                <img src={addfile} alt="" className='w-8 hover:w-full hover:h-full duration-150' onClick={handleImageClick} />
                            </div>
                            <div className='w-10 h-10 flex justify-center items-center'>
                                <img src={addlink} alt="" className='w-8 hover:w-full hover:h-full duration-150' />
                            </div>
                        </div>

                        {selectedFiles && (
                            <div className="text-slate-400">
                                Selected files:
                                <ul>
                                    {Array.from(selectedFiles).map((file: any, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className='flex justify-center items-center'>
                            <Uibuttons btnname="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SubmitTaskStatus
