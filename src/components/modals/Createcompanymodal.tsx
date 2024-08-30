import {  useState } from 'react'
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getCompanyAction } from '../../redux/actions/useractions/getCompanyAction';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material'
import { baseUrl } from '../../config/constant';
import { createcompanymodalProps } from '@/interface/generic';


function Createcompanymodal({ modalstatus }: createcompanymodalProps) {
    const [companyName, setCompanyName] = useState('');
    const [logo, setLogo] = useState("");
    const [businessType, setBusinessType] = useState('');
    const [description, setDescription] = useState('');

    const dispatch=useDispatch<AppDispatch>()
    const {loading}=useSelector((state:RootState)=>state.companydetails)

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', logo);
        formData.append('upload_preset', "ckoevhm7")
        const response: any = await fetch('https://api.cloudinary.com/v1_1/dr6mbeqwc/image/upload', {
            method: 'POST',
            body: formData
        });
        const url = await response.json()
        await axios.post(`${baseUrl}/company/createcompany`, {
            Name: companyName,
            Companylogo: url.secure_url,
            Bussinesstype: businessType,
            Description: description
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,

        }).then((data: any) => {
            if(data.data.status==true){
                dispatch(getCompanyAction(data.data.payload))
                modalstatus(false)
            }
        })

    }
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setLogo(file);
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen h-screen">
                <div className=" inset-0 bg-black  opacity-50 relative h-full w-full"></div>
                <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">
                       
                    <div className='bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black' onClick={() => { modalstatus(false) }}><BiArrowBack /></div>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">create company</h2>
                    </div>
                    {loading && <div className='flex justify-center items-center'><CircularProgress/></div>}
                    { ! loading && <form onSubmit={handleFormSubmit} className={loading?'invisible':""}>
                        <div className='flex flex-col'>
                            <label htmlFor="companyName" className='mb-2'>Company Name:</label>
                            <input
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="logo" className='mb-2'>Company Logo:</label>
                            <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="businessType" className='mb-2'>Business Type:</label>
                            <input
                                type="text"
                                id="businessType"
                                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex flex-col'  >
                            <label htmlFor="description" className='mb-2'>Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                            ></textarea>
                        </div>
                        <div className='flex justify-center '>
                            <button type="submit" className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Submit
                            </button>
                        </div>

                    </form>}
                </div>
            </div>
        </div>
    )
}

export default Createcompanymodal
