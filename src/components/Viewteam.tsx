
import { AiOutlinePlus } from 'react-icons/ai'
import Homenavbar from './Homenavbar'
import { useEffect, useState } from 'react'
import Adddepartmentmodal from './modals/Adddepartmentmodal'
import Departmentcards from './cards/Departmentcards'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Viewteamcard from './cards/Viewteamcard'
import { useParams } from 'react-router-dom'
import fetchData from '../utils/fetchdata'

interface iprop{

    _id?:string,
    
    name?:string,
    
    members?:Array<string>,
   
    teamlead?:string,
   
    departmentid?:string,
   
}

function Viewteam() {
    const { id } = useParams()
    const[data,setdata]=useState(null as any)
    useEffect(() => {
        console.log(id)
        async function getteam() {
            const response = await fetchData(`/company/getteam/${id}`)
            console.log(response.data)
            setdata(response.data)
            console.log(data,"jscjabj")
        }
        getteam()

    },[])
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>DEPARTMENT TEAMS</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span>add department</span> <span><AiOutlinePlus /></span></button>
                </div>
                {data?.map((item:any,index:any)=>{
                    return(
                    <Viewteamcard key={index} items={item as iprop}/>
                    )
                })}
                
            </div>
            <div></div>
        </div>
    )
}
export default Viewteam
