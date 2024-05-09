import { useState } from 'react'
import dummyprofile from "../../assets/dummy-profile-pic-300x300-1.png"
import Muidropdown from '../dropdown/Muidropdown';
import Viewprofilemodal from '../modals/Viewprofilemodal';
import Commonmodal from '../modals/Commonmodal';
import postData from '../../utils/postdata';
import Addtaskmodal from '../modals/Addtaskmodal';


function Listemployeecard({ item, setrefresh, refresh, id, isassigntask }: any) {
    const [profilemodal, setprofilemodal] = useState(false)
    const [displaypositionmodal, setdisplaypositionmodal] = useState(false)
    const [position, setposition] = useState("")
    const [displaymodal, setdisplaymodal] = useState<boolean>(false)
    const [empid, setempid] = useState<string>("")
    const [dptid, setdptid] = useState<string>("")

    const handlepositionsubmit = async (id: string) => {
        const response = await postData(`user/updateuser/${id}`, {
            position: position
        })
        if (response?.data) {
            setdisplaypositionmodal(false)
            setrefresh(!refresh)
        }
    }


    return (
        <>
            <div className=' flex justify-between items-center border-2  rounded-xl p-2 mt-4 bg-white shadow-md relative hover:border-blue-400 cursor-pointer duration-75'>
                {item?.Authorization == "semi_node" && <div className='absolute top-[-15px] bg-green-400 rounded-md px-1 left-0'>Manager</div>}
                <div className='flex justify-between items-center gap-3 w-64'>
                    <div className=' w-12 flex justify-center items-center rounded-3xl overflow-hidden'>
                        {!item?.profileImage && <img src={dummyprofile} alt="" className='' />}
                        {item?.profileImage && <img src={item?.profileImage} alt="" className='' />}
                    </div>
                    <div className=''>
                        <p className='text-lg'>{item?.Name}</p>
                        <p className='text-gray-600'>{item?.email.length > 23 ? item?.email.substring(0, 20) + "..." : item?.email}</p>
                    </div>
                </div>
                <div className='flex'>
                    <div className=''>
                        <p className='text-gray-600'>age</p>
                        <p>{item?.age}</p>
                    </div>
                </div>
                <div className='flex w-28'>
                    <div className=' w-full'>
                        <p className='text-gray-600'>mobile no.</p>
                        <p>{item?.Contactno}</p>
                    </div>
                </div>
                <div className='flex w-28'>

                    <div className='w-full'>
                        <p className='text-gray-600'>position</p>
                        <p className='text-lg'>{item?.position}</p>
                    </div>
                </div>
                {isassigntask == (false || undefined) && <Muidropdown displaymodal={setprofilemodal as any} position={setdisplaypositionmodal} id={item?._id} setrefresh={setrefresh} refresh={refresh} dptid={id} />}
                {isassigntask && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { setdptid(item?.Departmentid); setempid(item._id); setdisplaymodal(true) }} ><span >assign task</span></button>
                }
            </div>
        
            {profilemodal && <Viewprofilemodal user={item} displaymodal={setprofilemodal as any} />}

            {displaypositionmodal && <Commonmodal onClose={setdisplaypositionmodal as any}>
                <form onSubmit={(e) => { e.preventDefault(); handlepositionsubmit(item._id) }}>
                    <div className='flex flex-col'>
                        <label htmlFor="companyName" className='mb-2'>Mention position <span className='text-gray-400 text-sm'>eg:junior staff,senior developer</span></label>
                        <input
                            type="text"
                            id="companyName"
                            value={position}
                            onChange={(e) => setposition(e.target.value)}
                            required
                            className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className='flex justify-center '>
                        <button type="submit" className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            make changes
                        </button>
                    </div>
                </form>
            </Commonmodal>}
            {displaymodal && < Addtaskmodal display={setdisplaymodal} empid={empid} dptid={dptid} />}
        </>
    )
}

export default Listemployeecard
