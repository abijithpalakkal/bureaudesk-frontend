import React, { useEffect, useState } from 'react';
import Uibuttons from '../buttons/uibuttons/Uibuttons';
import fetchData from '@/utils/fetchdata'; // Adjust the path based on your project structure
import { useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import postData from '@/utils/postdata';

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [selectTeam, SetSelectTeam] = useState('');
    const [team, setTeam] = useState<any>([]);
    const [teamId, setTeamId] = useState<any>("");
    const [cardData, setCardData] = useState<any | null>(null);
    const [priority, setPriority] = useState("low");
    const [deadline, setDeadline] = useState("");
    const [populatedData, setPopulatedData] = useState<any>(null);
    const [attachments, setAttachments] = useState<any>([]); // State to hold selected files with name and URL
    const [fileInputKey, setFileInputKey] = useState<number>(0); // Key to reset file input
    const [showAttachments,setShowAttachments] = useState<any>([]) 


    const companyid = useSelector((state: any) => state?.companydetails?.company._id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        var cloudinary: string[] = [];
        // Handle form submission logic here
        console.log('Project Name:', projectName);
        console.log('Project Description:', projectDescription);
        console.log('Attachments:', attachments); // Log selected files for debugging
        console.log('selectTeam', selectTeam); // Log selected files for debugging
        console.log(teamId,"teamid")

        for (var i = 0; i < attachments.length; i++) {
            console.log(attachments[i].originalFile[0],attachments[i]?.name, "obj")
            console.log(attachments.length)
            const formData = new FormData();
            formData.append('file', attachments[i].originalFile);
            formData.append('upload_preset', "ckoevhm7");
            formData.append('public_id', attachments[i].originalFile.name)
            console.log(attachments[i].file.name,"attachments[i].originalFile[0]?.name")
           

            try {

                const response = await fetch('https://api.cloudinary.com/v1_1/dr6mbeqwc/image/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    // Extract URL from Cloudinary response
                    const data = await response.json();
                    const url = data.secure_url;
                    cloudinary.push(url);
                } else {
                    console.error('Failed to upload file:', attachments?.name);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }



            console.log(cloudinary, "cloudinary")
        }

       if(teamId!=""){
        let { data } = await postData("/company/addproject", {
            projectName: projectName,
            projectDescription: projectDescription,
            priority: priority,
            deadLine: deadline,
            attachments: cloudinary,
            companyId:companyid,
            teamId
        })
       }else{
        let { data } = await postData("/company/addproject", {
            projectName: projectName,
            projectDescription: projectDescription,
            priority: priority,
            deadLine: deadline,
            attachments: cloudinary,
            companyId:companyid,
            
        })

       }
      

        // Reset form fields and attachments
        setProjectName('');
        setProjectDescription('');
        setAttachments([]);
        setFileInputKey((prevKey) => prevKey + 1); // Reset file input
    };

    useEffect(() => {
        const fetchTeam = async () => {
            if (companyid) {
                const { data } = await fetchData(`/company/getteam/${companyid}`);
                console.log(data);
                setTeam(data);
            }
        };
        fetchTeam();
    }, [companyid]);

    const teamSelect = async (obj: any) => {
        if (!obj) {
            setCardData(null);
        } else {
            await populateData(obj.members);
            setCardData(obj);
        }
    };

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
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map(file => ({
                file,
                url: URL.createObjectURL(file), // Create a local URL for preview
                name: file.name,
                originalFile: file // Store the original file
            }));
            setAttachments((prev: any) => [...prev, ...filesArray]);
        }
      
        console.log(attachments, "attachments");
    };
    

    // const handleFileChangetosubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         console.log(e.target.files, "e.target.files")
    //         const filesArray = Array.from(e.target.files);
    //         setAttachments((prev: any) => [...prev, e.target.files]);

    //         // for (const file of filesArray) {
    //         //     // const fileUrl = URL.createObjectURL(file);

    //         // }
    //     }
    //     console.log(attachments, "attachments")
    // };

    const handleDeleteAttachment = (index: number) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
        console.log(attachments, "attachments")

    };



    return (
        <>
            <h1 className='font-bold text-3xl mt-2'>Add Project</h1>
            <div className='w-full flex justify-between'>
                <form onSubmit={handleSubmit} className='font-nunitosans mt-2 w-2/3'>
                    <div className='flex flex-col mt-3'>
                        <label htmlFor="event-name" className='text-slate-400'>Project Name</label>
                        <input
                            type="text"
                            id="event-name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                        />
                    </div>

                    <div className='flex flex-col mt-1'>
                        <label htmlFor="event-category" className='text-slate-400'>Assignee:</label>
                        <select
                            id="event-category"
                            value={selectTeam}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                if(selectedId=="null"){
                                    setTeamId("")
                                }else{
                                    setTeamId(selectedId)
                                }
                                SetSelectTeam(selectedId);
                                const selectedTeamMember = team.find((member: any) => member._id === selectedId);
                                teamSelect(selectedTeamMember);
                                
                            }}
                            required
                            className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                        >
                            <option value="null">Stand Alone</option>
                            {team.map((obj: any) => (
                                <option key={obj._id} value={obj._id}>
                                    {obj.name}
                                </option>
                            ))}
                        </select>
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

                    <div className='flex flex-col mt-1'>
                        <label htmlFor="attachments" className='text-slate-400'>Attachments:</label>
                        <input
                            key={fileInputKey} // Reset input on state change
                            type="file"
                            id="attachments"
                            onChange={handleFileChange}
                            multiple
                            className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                        />
                    </div>

                    {attachments.length > 0 && (
                        <div className='mt-2 h-40 overflow-y-scroll overflow-x-hidden'>
                            <p className='font-medium text-slate-400'>Selected Attachments:</p>
                            <ul className=' pl-5  grid grid-cols-5 gap-4'>
                                {attachments.map((file: any, index: any) => (
                                    <li key={index} className='relative'>
                                        {typeof file.url === 'string' ? (
                                            <iframe
                                                title={file.name}
                                                src={file.url}
                                                width="150"
                                                height="100"
                                                className='border border-gray-300 rounded-lg mr-3 overflow-hidden'
                                            />
                                        ) : (
                                            <span className=''>{file.name}</span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteAttachment(index)}
                                            className='text-red-500 ml-2  absolute top-0 mt-2'
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className='flex flex-col mb-10 mt-3'>
                        <label htmlFor="event-description" className='text-slate-400'>Project Description:</label>
                        <textarea
                            id="event-description"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            required
                            className='rounded-lg p-1 border border-slate-400 mt-2 text-slate-400'
                        ></textarea>
                    </div>
                    <button><div className='flex justify-center items-center'>
                        <Uibuttons btnname="submit" />
                    </div></button>
                </form>

                <div className='w-80 0 mt-10 rounded-xl overflow-hidden'>
                    <div className='p-4 bg-blue-100 min-h-96'>
                        <p className='font-medium text-2xl'>Team Details</p>
                        {cardData && (
                            <>
                                <p className='text-lg font-medium mt-2'>{cardData?.name}({cardData?.departmentid})</p>
                                <p>{cardData?.description}</p>
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
                            </>
                        )}
                        {!cardData && (
                            <div className='w-full h-full flex justify-center items-center'>
                                <p className='text-2xl font-medium'>Stand Alone</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default AddProject;
