import  { useEffect, useState } from 'react'
import logo from "../../assets/dummy-profile-pic-300x300-1.png"
import fetchData from '../../utils/fetchdata'
import AlertDialogSlide from '../modals/Muiconfirmationmodal'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'




function Viewteamcard({ items, setrefresh, refresh }: any) {
    const [data, setdata] = useState<any[]>([])
    const Authorization = useSelector((state: RootState) => state.userdetails.user.Authorization)
    useEffect(() => {
        const fetchUser = async () => {
            const newData = [];
            for (let i = 0; i < items.members.length; i++) {

                const response = await fetchData(`/user/getuserbyid/${items.members[i]}`);
                newData.push(response?.data);

            }
            setdata(newData);
        };

        fetchUser();
    }, []);
    return (
        <div className='bg-white p-4 rounded-xl mt-3'>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold'>{items?.name}</p>
                {Authorization != "basic_node" && <AlertDialogSlide id={items?._id as string} setrefresh={setrefresh} refresh={refresh} />}
            </div>

            <div className='p-3  mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                {data.map((data1, index) => {
                    return (
                        <div className='flex flex-col relative justify-center items-center w-44 mt-2 p-2  rounded-xl shadow-2xl' key={index}>
                            {data1?._id == items?.teamlead && <div className='absolute top-[-15px] left-1 bg-blue-300 px-2 shadow-2xl'>teamlead</div>}

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

        </div>
    )
}

export default Viewteamcard
