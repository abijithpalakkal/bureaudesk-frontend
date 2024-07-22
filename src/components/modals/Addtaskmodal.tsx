import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Uibuttons from '../buttons/uibuttons/Uibuttons'
import { AiOutlineClose } from 'react-icons/ai'
import logo from "../../assets/logo_without_writing-removebg-preview.png"
import addlink from "../../assets/Add Link.png"
import addfile from "../../assets/Add Attachments.png"
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchdata'

interface IProp {
    display: Dispatch<SetStateAction<boolean>>
    empid?: string
    dptid?: string
}

const Addtaskmodal = ({ display, empid, dptid }: IProp) => {
  
    const companyId = useSelector((state: RootState) => state.companydetails.company._id)
    const userid = useSelector((state: RootState) => state.userdetails.user._id)

    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("low");
    const [deadline, setDeadline] = useState("");
    const [estimate, setEstimate] = useState("");
    const [description, setDescription] = useState("");
    const [selectProject, SetSelectProject] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [_cloudfiles, setcloudfiles] = useState<string[]>([])
    const [projects, setprojects] = useState<any>(null)
    const companyid = useSelector((state: any) => state?.companydetails?.company._id);


    useEffect(() => {
        const getdata = async () => {
            const { data } = await fetchData(`/company/getprojects/${companyid}`)

            setprojects(data)
        }
        getdata()
    }, [])


    const handleImageClick = () => {

        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSelectedFiles(event.target.files);
    };
    const uploadedFileUrls: string[] = [];
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedDatetime = new Date(`${deadline}T${estimate}`);
        const currentDatetime = new Date();
        if (selectedDatetime < currentDatetime) {
            // Display an error message or handle the case as needed
            toast.error("Selected date and time cannot be in the past");
            return;
        }

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
                        console.error('Failed to upload file:', file.name);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }

            // Log the URLs of uploaded files
            setcloudfiles(uploadedFileUrls)
        } else {
            toast.error('No files selected');
        }
        // Create an object to hold form data
        let Data;
        if (selectProject != "" && selectProject != "a") {
            Data = {
                companyid: companyId,
                taskName,
                priority,
                deadLine: deadline,
                estimate,
                Departmentid: dptid,
                taskDescription: description,
                files: uploadedFileUrls,
                assignedBy: userid,
                assignedTo: empid,
                projectId: selectProject
            };
        } else {
            Data = {
                companyid: companyId,
                taskName,
                priority,
                deadLine: deadline,
                estimate,
                Departmentid: dptid,
                taskDescription: description,
                files: uploadedFileUrls,
                assignedBy: userid,
                assignedTo: empid,
              
            };
        }


        // Log form data
        try {
            await postData("/company/addtask", Data)
        } catch (err: any) {
            toast.error(err?.message)
        }




        // Clear form fields
        setTaskName("");
        setPriority("low");
        setDeadline("");
        setEstimate("");
        setDescription("");
        setSelectedFiles(null);

        // Close the modal
        display(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);


    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>            <div className="flex items-center justify-center min-h-screen h-screen">
            <div className="inset-0 bg-black opacity-50 relative h-full w-full"></div>
            <div className="bg-white rounded-lg shadow-2xl p-12 absolute">
                <div className='flex justify-between'>
                    <div className='w-12'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='bg-blue-100 w-6 h-6 rounded-md flex justify-center items-center  hover:bg-blue-500  duration-500' onClick={() => { display(false) }}><AiOutlineClose /></div>
                </div>
                <form className='font-nunitosans mt-7' onSubmit={handleSubmit}>
                    <p className='font-nunitosans font-semibold text-xl'>Add Tasks</p>
                    <div className='flex flex-col mt-3'>
                        <label htmlFor="task-name" className='text-slate-400'>Task Name</label>
                        <input
                            type="text"
                            id="task-name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                            className='rounded-lg p-1 border border-slate-400 mt-2 text-slate-400'
                        />
                    </div>

                    <div className='flex flex-col mt-3'>
                        <label htmlFor="priority" className='text-slate-400'>Priority:</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                            className='rounded-lg p-1 border border-slate-400 mt-2 text-slate-400'
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>


                    <div className='flex flex-col mt-1'>
                        <label htmlFor="event-category" className='text-slate-400'>Project</label>
                        <select
                            id="event-category"
                            value={selectProject}
                            onChange={(e) => {
                                SetSelectProject(e.target.value)
                            }}
                            required
                            className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                        >
                            <option value="a">Stand Alone</option>
                            {projects?.map((obj: any, index: number) => (
                                <option key={index} value={obj?._id}>{obj.projectName}</option>
                            ))}

                        </select>
                    </div>




                    <div className='flex gap-10 mt-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="deadline" className='text-slate-400'>Deadline:</label>
                            <input
                                type="date"
                                id="deadline"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-2 text-slate-400'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="estimate" className='text-slate-400'>Estimate:</label>
                            <input
                                type="time"
                                id="estimate"
                                value={estimate}
                                onChange={(e) => setEstimate(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-2 text-slate-400'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col mb-5 mt-3'>
                        <label htmlFor="description" className='text-slate-400'>Task Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                                {Array.from(selectedFiles).map((file, index) => (
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

export default Addtaskmodal
