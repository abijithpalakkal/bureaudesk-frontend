import React, { useEffect, useState } from 'react'
import logo from "../../assets/dummy-profile-pic-300x300-1.png"
import fetchData from '../../utils/fetchdata'

interface iprop {
    _id?: string,

    name?: string,

    members?: Array<string>,

    teamlead?: string,

    departmentid?: string,

}
function Viewteamcard({ items }: any) {
    console.log(items, "hello")
    const [data, setdata] = useState<any[]>([])
    useEffect(() => {
        const fetchUser = async () => {
            const newData = [];
            for (let i = 0; i < items.members.length; i++) {
                const response = await fetchData(`/user/getuserbyid/${items.members[i]}`);
                console.log(response);
                newData.push(response?.data);
            }
            setdata(newData);
            console.log(newData, "j");
        };
        fetchUser();
    }, []);
    return (
        <div className='bg-white p-4 rounded-xl mt-3'>
            <p className='text-2xl font-bold'>{items?.name}</p>
            <div className='p-3 border-2 border-blue-400 rounded-2xl mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {data.map((data1,index) => {
                    return (
                        <div className='flex flex-col relative justify-center items-center w-44 mt-2 p-2 bg-slate-100 rounded-xl' key={index}>
                            {data1?._id==items?.teamlead && <div className='absolute top-[-15px] left-1 bg-blue-300 px-2 rounded-md'>teamlead</div>}
    
                            <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-black flex justify-center items-center'>
                              {!data1?.profileImage &&   <img src={logo} alt="" />}
                              {data1?.profileImage &&   <img src={data1.profileImage} alt="" />}
                            </div>
                            <p>{data1?.Name}</p>
                            <p>{data1?.email}</p>
                            <p className='border-2 border-gray-600 px-3 py-0 rounded-md text-gray-600'>{data1?.position}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Viewteamcard
