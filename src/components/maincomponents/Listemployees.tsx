import { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import { AiOutlinePlus } from 'react-icons/ai'
import Listemployeecard from '../cards/Listemployeecard'
import { useParams } from 'react-router-dom'
import fetchData from '../../utils/fetchdata'
import Createteammodal from '../modals/Createteammodal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Nearestcomponent from '../cards/Nearestcomponent'
import Activitystream from '../cards/Activitystream'
import { Player } from "@lottiefiles/react-lottie-player";


interface iprop {
    department: string
}
function Listemployees({ department }: iprop) {

    const navigate = useNavigate()
    const { id } = useParams()
    const [employee, setemployee] = useState([])
    const [displaymodal, setdisplaymodal] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [lottieFiles, setLottieFiles] = useState(false)
    const Authorization = useSelector((state: RootState) => state.userdetails.user.Authorization)

    useEffect(() => {

        async function getemployees() {
            try {
                setLottieFiles(false)
                const response = await fetchData(`/user/getdepartmentemployee/${id}`)
                if (response.data.length == 0) {
                    setLottieFiles(true)
                }
                setemployee(response.data)
            } catch (err) {
                navigate("/404error")
            }
        }
        getemployees()
    }, [refresh])

    return (
        <>
            <div className='w-5/6 h-screen px-2 py-2'>
                <div>
                    <Homenavbar />
                    <div className='flex justify-between mt-11'>
                        <h1 className='font-bold text-3xl'>{`${department} Employees`}</h1>
                        {Authorization != "basic_node" && <div className='flex justify-between gap-2 items-center'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => setdisplaymodal(true)}><span >create team</span> <span><AiOutlinePlus /></span></button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => navigate(`/viewteam/${id}`)}><span >view team</span> </button>
                        </div>}
                    </div>
                    <div className='mt-6 flex'>
                        <div className='w-full pr-4'>
                            {lottieFiles ? (
                               <Player
                               autoplay
                               loop
                               src="https://lottie.host/bddb1fb7-5bc1-45a0-ab4c-d1f328ba714f/43VLmeXx7Y.json"
                               style={{ height: "400px", width: "400px" }}
                             />
                            ) : (
                                <>
                                    {employee.map((item, index) => (
                                        <Listemployeecard key={index} item={item} refresh={refresh} setrefresh={setrefresh} id={id} />
                                    ))}
                                </>
                            )}

                        </div>
                        <div className=''>
                            <Nearestcomponent val={""} />
                            <Activitystream />
                        </div>
                    </div>
                </div>
                {displaymodal && <Createteammodal id={id as any} modal={setdisplaymodal as any} />}
            </div>

        </>
    )
}

export default Listemployees
