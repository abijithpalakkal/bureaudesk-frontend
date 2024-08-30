
import Homenavbar from './Homenavbar'
import { useEffect, useState } from 'react'
import Viewteamcard from '../cards/Viewteamcard'
import { useParams } from 'react-router-dom'
import fetchData from '../../utils/fetchdata'
import { useNavigate } from 'react-router-dom'
import { iprop } from '@/interface/viewteam'



function Viewteam() {
    const navigate=useNavigate()
    const { id } = useParams()
    const[data,setdata]=useState(null as any)
    const [refresh,setrefresh]=useState<boolean>(true)
    useEffect(() => {
      
        async function getteam() {
            try{
                const response = await fetchData(`/company/getteam/${id}`)
               
                setdata(response.data)
               
            }catch(err){
               navigate("/404error")
            }
           
        }
        getteam()

    },[refresh])
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>DEPARTMENT TEAMS</h1>
                   {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span>add department</span> <span><AiOutlinePlus /></span></button>*/}
                </div>
                {data?.map((item:any,index:any)=>{
                    return(
                    <Viewteamcard key={index} items={item as iprop} setrefresh={setrefresh} refresh={refresh}/>
                    )
                })}
                
            </div>
            <div></div>
        </div>
    )
}
export default Viewteam
