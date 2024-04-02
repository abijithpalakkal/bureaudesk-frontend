import React, { useEffect, useState } from 'react'
import { useActionData } from 'react-router-dom'
import fetchData from '../../utils/fetchdata'
import { CircularProgress } from '@mui/material'

interface iDepartment {
    Name?: string
    companyid?: string
    departmentlogo?: string

}

function Departmentcards() {
    const [dptdata, setdptdata] = useState([])
    const[loading,setloading]=useState(true)
    useEffect(() => {
        const fetch = async () => {
            const response = await fetchData("/company/getdepartment")
            console.log(response, "🚀❤️😘💕😁")
            setdptdata(response.data)
            setloading(response.loading)
        }
        fetch()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 ">
            {loading && <div><CircularProgress/></div>}
            {!loading && dptdata.map((item:iDepartment, index) => (
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
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                            Add Employee
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Departmentcards
