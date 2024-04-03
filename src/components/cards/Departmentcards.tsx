import React, { useEffect, useState } from 'react'
import { useActionData } from 'react-router-dom'
import fetchData from '../../utils/fetchdata'
import { CircularProgress } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'
import Addemployees from '../modals/Addemployees'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Companypage from '../../pages/Companypage'

interface iDepartment {
    _id?:string,
    Name?: string
    companyid?: string
    departmentlogo?: string

}

function Departmentcards() {
    const [dptdata, setdptdata] = useState([])
    const [loading, setloading] = useState(true)
    const [displaymodal, setdisplaymodal] = useState(false)
    const [dptid,setdptid]=useState('')
    const company=useSelector((state:RootState)=>state.companydetails.company)
   
    useEffect(() => {
        const fetch = async () => {
            const id=company._id
            if(Object.keys(company).length !== 0){
                const response = await fetchData(`/company/getdepartment/${id}`)
                console.log(response, "🚀❤️😘💕😁")
                setdptdata(response.data)
                setloading(response.loading)
            }else{
                setloading(false)
            }
            
        }
        fetch()
    }, [company])
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 ">
            {loading && <div><CircularProgress /></div>}
            {!loading && dptdata.map((item: iDepartment, index) => (
                <div key={index} className="max-w-md bg-white shadow-md rounded-md overflow-hidden p-2 bg-pink-100 bg-opacity-30">
                    <div className='flex justify-between'>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{item.Name}</h2>
                        </div>
                        <img src={item.departmentlogo} alt="Department" className="w-20 h-20 object-cover rounded-md" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-600">Manager: <span className="font-bold">not assigned</span> </p>
                    </div>
                    <div className="px-4 pb-4 flex justify-between">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                            view employees
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none flex justify-between items-center" onClick={()=>{setdptid(item._id as string);setdisplaymodal(true)}}>
                            <span> Add Employee</span> <span className='text-white ml-1'><AiOutlinePlus /></span>
                        </button>
                    </div>
                </div>
            ))}
            { displaymodal && <Addemployees modalstatus={setdisplaymodal} dptid={dptid}/>}
        </div>
    )
}

export default Departmentcards
