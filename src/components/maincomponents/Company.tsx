import  { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import Createcompanymodal from '../modals/Createcompanymodal'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AiFillCalendar } from 'react-icons/ai'
import { Player } from "@lottiefiles/react-lottie-player";
import logo from "../../assets/dummy-profile-pic-300x300-1.png"
import postData from '@/utils/postdata'



function Company() {

    const [modaldisplay, setmodaldisplay] = useState(false)
    const [companydetails, setcompanydetails] = useState(null as any)
    const [rootNodeData, setRootNodeData] = useState(null as any)
    const company = useSelector((state: RootState) => state.companydetails?.company?._id)
    const companydetails1 = useSelector((state: RootState) => state.companydetails?.company)


    function formatDateString(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    useEffect(() => {

        if (company != undefined) {
            setcompanydetails(companydetails1)
        }
    }, [company])

  


 

    useEffect(() => {
        const getRootData = async () => {
            if (company) {
                const data = await postData("/user/getuserdetails", { companyid: company })
                setRootNodeData(data.data)
            }
        }
        getRootData()
    }, [company])
    return (
        <div className='w-5/6 px-2 py-2'>
            <div className='h-full'>
                <Homenavbar />
                <div className='flex gap-6'>
                    <div className=' h-[700px]'>
                        {companydetails == null && <div className='h-4/5 w-full flex justify-center items-center'>
                            <div className='flex flex-col w-full'>
                                <Player
                                    autoplay
                                    loop
                                    src="https://lottie.host/64e5ead9-ca1d-4e85-bc64-fd2f609d4d91/GiwKcXIA3R.json"
                                    style={{ height: "400px", width: "400px" }}
                                />
                                <p className='text-center mb-1 text-2xl font-bold'>company not created!</p>
                                <p className='mb-2 text-slate-400 text-center'>create your company right now to enjoy other features!</p>
                                <button className="bg-blue-500 w-[200px] flex items-center justify-center self-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={() => { setmodaldisplay(true) }}>
                                    <span >Create company</span>
                                </button>
                            </div>
                        </div>}
                        {companydetails && <div className=" bg-white shadow-md mt-8 rounded-md overflow-hidden w-64 h-full ">
                            <p className='px-4 pb-4 mt-5 text-xl text-slate-500'>you are a part of:</p>
                            <div className="p-4 w-full">
                                <img src={companydetails?.Companylogo} alt="" className="w-full h-auto object-cover" />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{companydetails?.Name}</h2>
                                <p className="text-gray-600">{companydetails?.Bussinesstype}</p>
                            </div>
                            <div className="px-4 pb-4">
                                <p className="text-gray-700">{companydetails?.Description}</p>
                            </div>
                            <div className='flex  items-center px-4 pb-4 text-slate-500'>
                                <AiFillCalendar /> <span>created at </span><span>{formatDateString(companydetails?.createdAt)}</span>

                            </div>

                        </div>}
                    </div>

                    {company && <div className='mt-4'>
                        <p className='font-medium text-xl'>Root_node permission:</p>
                        <div className='p-3  mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            {rootNodeData?.map((data1: any, index: any) => {
                                return data1.Authorization == "root_node" && (
                                    <div className='flex flex-col justify-center items-center w-44 mt-2 p-2  rounded-xl shadow-2xl' key={index}>
                                        <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-black flex justify-center items-center'>
                                            {!data1?.profileImage && <img src={logo} alt="" />}
                                            {data1?.profileImage && <img src={data1.profileImage} alt="" />}
                                        </div>
                                        <p>{data1?.Name}</p>
                                        <p className='text-[12px] overflow-hidden mb-4'>{data1?.email}</p>
                                        <p className='border-2 border-gray-600 px-3 py-0 rounded-md text-gray-600'>{data1?.position}</p>
                                    </div>
                                )
                            })}

                        </div>
                        <p className='font-medium text-xl'>semi_node permission:</p>
                        <div className='p-3  mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            {rootNodeData?.map((data1: any, index: any) => {
                                return data1.Authorization == "semi_node" && (
                                    <div className='flex flex-col justify-center items-center w-44 mt-2 p-2  rounded-xl shadow-2xl' key={index}>
                                        <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-black flex justify-center items-center'>
                                            {!data1?.profileImage && <img src={logo} alt="" />}
                                            {data1?.profileImage && <img src={data1.profileImage} alt="" />}
                                        </div>
                                        <p>{data1?.Name}</p>
                                        <p className='text-[12px] overflow-hidden mb-4'>{data1?.email}</p>
                                        <p className='border-2 border-gray-600 px-3 py-0 rounded-md text-gray-600'>{data1?.position}</p>
                                    </div>
                                )
                            })}

                        </div>
                        <p className='font-medium text-xl'>Basic_node permission:</p>
                        <div className='p-3  mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            {rootNodeData?.map((data1: any, index: any) => {
                                return data1.Authorization == "basic_node" && (
                                    <div className='flex flex-col justify-center items-center w-44 mt-2 p-2  rounded-xl shadow-2xl' key={index}>
                                        <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-black flex justify-center items-center'>
                                            {!data1?.profileImage && <img src={logo} alt="" />}
                                            {data1?.profileImage && <img src={data1.profileImage} alt="" />}
                                        </div>
                                        <p>{data1?.Name}</p>
                                        <p className='text-[12px] overflow-hidden mb-4'>{data1?.email}</p>
                                        <p className='border-2 border-gray-600 px-3 py-0 rounded-md text-gray-600'>{data1?.position}</p>
                                    </div>
                                )
                            })}

                        </div>

                    </div>}

                </div>
            </div>

            {modaldisplay && <Createcompanymodal modalstatus={setmodaldisplay} />}


        </div>
    )




}

export default Company
