import React, { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import Departmentcards from './cards/Departmentcards'
import { AiOutlinePlus } from 'react-icons/ai'
import Listemployeecard from './cards/Listemployeecard'
import { useParams } from 'react-router-dom'
import fetchData from '../utils/fetchdata'

function Listemployees() {
    const { id } = useParams()
    const [employee, setemployee] = useState([])
    useEffect(() => {
        async function getemployees() {
            const response = await fetchData(`/user/getdepartmentemployee/${id}`)
            console.log(response.data, "ygdcuaivbiabcjdnin")
            setemployee(response.data)
        }
        getemployees()
    }, [setemployee])

    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>Employees</h1>
                    <div className='flex justify-between gap-2 items-center'> 
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span >create team</span> <span><AiOutlinePlus /></span></button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span >view all team</span> </button>
                    </div>
                </div>
                <div className='mt-6 '>
                    {employee.map((item, index) => (
                        <Listemployeecard key={index} item={item}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Listemployees
