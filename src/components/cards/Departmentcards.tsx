import { useEffect, useState } from 'react'
import fetchData from '../../utils/fetchdata'
import { CircularProgress } from '@mui/material'
import Addemployees from '../modals/Addemployees'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import postData from '../../utils/postdata'
import Uibuttons from '../buttons/uibuttons/Uibuttons'
import { BiEdit } from 'react-icons/bi'
import { Player } from "@lottiefiles/react-lottie-player";


function Departmentcards() {
    const navigate = useNavigate()
    const [dptdata, setdptdata] = useState<any>([])
    const [loading, setloading] = useState(true)
    const [displaymodal, setdisplaymodal] = useState(false)
    const [dptid, setdptid] = useState('')
    const [manager, setmanager] = useState<any>([])
    const [lottieFiles, setLottieFiles] = useState(false)
    const company = useSelector((state: RootState) => state.companydetails.company)
    const Authorization = useSelector((state: RootState) => state.userdetails.user.Authorization)
    const departmentId = useSelector((state:RootState)=>state.userdetails.user.Departmentid)
    const [filteredDptData,setFilteredDptData] = useState<any>(null)

    useEffect(() => {
        const fetch = async () => {
            const id = company._id
            if (Object.keys(company).length !== 0) {
                const response = await fetchData(`/company/getdepartment/${id}`)
                if (response.data.length == 0) {
                    setLottieFiles(true)
                }
                setdptdata(response.data)
                setloading(response.loading)
            } else {
                setloading(false)
            }

        }
        fetch()
    }, [company])

    useEffect(() => {
        const filteredData = Authorization === "root_node" ? dptdata : dptdata.filter((item: any) => {
            return item._id === departmentId;
        });
        setFilteredDptData(filteredData);
    }, [Authorization, dptdata, departmentId]);

    useEffect(() => {
        const fetchdata = async () => {
            const managerNames = [];

            for (let i = 0; i < dptdata.length; i++) {
                const response = await postData("/user/getuserdetails", {
                    Departmentid: dptdata[i]._id,
                    Authorization: "semi_node"
                });
                if (response?.data?.length > 0) {

                    const managerName: string = response?.data[0]?.Name || response?.data[0]?.email || "not assigned";
                    const mangerImage: string = response?.data[0]?.profileImage
                    managerNames.push({ managerName, mangerImage });
                } else {
                    managerNames.push({ managerName: "not assigned", mangerImage: "not assigned" })
                }
            }


            setmanager(managerNames);
        };

        fetchdata();

    }, [dptdata]);

    return (
        <>
            {lottieFiles ? (
                <>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/7a35a11d-7a54-4322-802e-522136cfcb39/VgWUoVagbR.json"
                        style={{ height: "400px", width: "400px" }}
                    />
                    <p className='text-center font-medium text-4xl mt-2 text-slate-400'>create department</p>
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
                    {loading && <div><CircularProgress /></div>}
                    {!loading && filteredDptData?.map((item: any, index: any) => (
                        <div key={index} className="max-w-md bg-white shadow-lg duration-300 cursor-pointer hover:scale-95 rounded-md overflow-hidden p-2">
                            <div className='flex justify-between max-h-20'>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {item.Name}
                                        <span className='cursor-pointer'>
                                            <BiEdit />
                                        </span>
                                    </h2>
                                </div>
                                <img src={item.departmentlogo} alt="Department" className="w-20 h-20 object-cover rounded-md" />
                            </div>
                            <div className="p-4 flex items-center justify-start">
                                <p className="text-sm text-gray-600 flex items-center justify-start">
                                    <span className='text-lg font-bold'>Manager:</span>
                                    {manager[index]?.mangerImage !== "not assigned" && (
                                        <img src={manager[index]?.mangerImage} className='w-5 h-5 rounded-full mr-2 ml-2' />
                                    )}
                                    <span className="font-bold">{manager[index]?.managerName}</span>
                                </p>
                            </div>
                            <div className="px-4 pb-4 flex justify-between">
                                <div onClick={() => navigate(`/listemployees/${item._id}`, { state: item?.Name })}>
                                    <Uibuttons btnname='view ' />
                                </div>
                                {Authorization !== "basic_node" && (
                                    <div onClick={() => { setdptid(item._id); setdisplaymodal(true); }}>
                                        <Uibuttons btnname='add ' />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {displaymodal && <Addemployees modalstatus={setdisplaymodal} dptid={dptid} />}
                </div>
            )}
        </>
    );
}

export default Departmentcards
