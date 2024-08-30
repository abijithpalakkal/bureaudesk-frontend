import React, { SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import logo from "../../assets/dummy-profile-pic-300x300-1.png"
import postData from '../../utils/postdata';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import fetchData from '../../utils/fetchdata';
import { editprofilemodalProps } from '@/interface/generic';


function Editprofilemodal({ modal }: editprofilemodalProps) {

    useEffect(()=>{
        async  function fetch(){
           const response=await fetchData("/user/getuserforauth")
           setName(response.data.Name)
           setDob(response.data.Dob)
           setAge(response.data.age)
           setLocation(response.data.Location)
           setContact(response.data.Contactno)
           setProfileImage(response.data.profileImage)
         }
         fetch()
       },[])

    const userid=useSelector((state:RootState)=>state.userdetails.user._id)
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [profileImage, setProfileImage] = useState(null)
    const [Contact,setContact]=useState("")

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        // Here you can perform any validation or further processing before submitting the form
       
        // Reset form fields
        if (profileImage) {
            const formData = new FormData();
            formData.append('file', profileImage as any);
            formData.append('upload_preset', "ckoevhm7")
            const response: any = await fetch('https://api.cloudinary.com/v1_1/dr6mbeqwc/image/upload', {
                method: 'POST',
                body: formData
            });
            const url = await response.json()
        
            await postData(`/user/updateuser/${userid}`, { Name:name, Dob:dob, age, Location:location,Contactno:Contact,profileImage: url.secure_url })
            modal(false)
        }else{
            await postData(`/user/updateuser/${userid}`, { Name:name, Dob:dob, age, Location:location,Contactno:Contact})
            modal(false)
        }
      
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file and set it as the profile image
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setProfileImage(imageUrl as any);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen h-screen">
                <div className=" inset-0 bg-black  opacity-50 relative h-full w-full"></div>
                <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">

                    <div className='bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black' onClick={() => modal(false)}><BiArrowBack /></div>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">Edit profile</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>provide details about yourself aand any other pertinent information.</p>
                            <hr className="" />
                            <h2 className='text-2xl'>Basic information</h2>
                            <div className='flex justify-between items-center'>
                                <div className=' border-2 border-gray-600 p-3 rounded-md shadow-2xl'>
                                    <p className='text-xl'>profile photo</p>
                                    <p className='text-sm text-gray-600'>Recommended 300 x 300</p>
                                    <div className='flex gap-6'>
                                        <label htmlFor="file-input" className="cursor-pointer">
                                            <div className=' bg-blue-400 rounded-md px-1 flex justify-center items-center border border-black'>
                                                Change profile
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="file-input"

                                        />
                                        <div className=' bg-blue-400 rounded-md px-1 flex justify-center items-center border border-black' onClick={() => setProfileImage(null)}>remove profile</div>
                                    </div>
                                </div>
                                <div className='w-28 h-28 rounded-full overflow-hidden mr-5 bg-cover flex justify-center items-center'>
                                    {profileImage && <img src={profileImage as any} alt="" className='bg-cover bg-center' />}
                                    {!profileImage && <img src={logo} alt="" className='bg-cover' />}
                                </div>
                            </div>
                            <div className="mb-4 mt-3">
                                <label htmlFor="name" className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dob" className="block mb-1">Date of Birth:</label>
                                <input
                                    type="date"
                                    id="dob"
                                    
                                    value={dob}
                                    onChange={(e) => {
                                        setDob(e.target.value);
                                        // Calculate age based on DOB
                                        const today = new Date();
                                        const birthDate = new Date(e.target.value);
                                        const ageDiff = today.getFullYear() - birthDate.getFullYear();
                                        setAge(ageDiff as any);
                                    }}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                  
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="age" className="block mb-1">Age:</label>
                                <input
                                    type="number"
                                 
                                    id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    disabled // Age is calculated automatically from DOB, so it's disabled for user input
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block mb-1">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                 
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block mb-1">Contactno:</label>
                                <input
                                    type="number"
                                    id="location"
                                    value={Contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editprofilemodal
