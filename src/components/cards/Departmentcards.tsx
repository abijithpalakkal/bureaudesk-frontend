import  { useEffect, useState } from 'react'
import fetchData from '../../utils/fetchdata'
import { CircularProgress } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'
import Addemployees from '../modals/Addemployees'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import postData from '../../utils/postdata'

interface iDepartment {
    _id?:string,
    Name?: string
    companyid?: string
    departmentlogo?: string

}

function Departmentcards() {
    const navigate=useNavigate()
    const [dptdata, setdptdata] = useState<any>([])
    const [loading, setloading] = useState(true)
    const [displaymodal, setdisplaymodal] = useState(false)
    const [dptid,setdptid]=useState('')
    const [manager,setmanager]=useState<string[]>([])
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
    
    useEffect(() => {
        const fetchdata = async () => {
            const managerNames = []; 
            
            for (let i = 0; i < dptdata.length; i++) {
                const response = await postData("/user/getuserdetails", {
                    Departmentid: dptdata[i]._id,
                    Authorization: "semi_node"
                });
    
               
                if (response?.data.length > 0) {
                    const managerName = response?.data[0].Name || response?.data[0].email || "not assigned";
                    managerNames.push(managerName);
                } else {
                    managerNames.push("not assigned");
                }
            }
            
          
            setmanager(managerNames);
        };
    
        fetchdata();
    }, [dptdata]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 ">
            {loading && <div><CircularProgress /></div>}
            {!loading && dptdata.map((item: iDepartment, index:any) => (
                <div key={index} className="max-w-md bg-white shadow-md rounded-md overflow-hidden p-2 bg-blue-100">
                    <div className='flex justify-between'>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{item.Name}</h2>
                        </div>
                        <img src={item.departmentlogo} alt="Department" className="w-20 h-20 object-cover rounded-md" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-600">Manager: <span className="font-bold">{manager[index]}</span> </p>
                    </div>
                    <div className="px-4 pb-4 flex justify-between">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={()=>navigate(`/listemployees/${item._id}`,{state:item?.Name})}>
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
