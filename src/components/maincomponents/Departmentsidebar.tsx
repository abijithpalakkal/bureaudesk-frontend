import { RootState } from '@/redux/store'
import fetchData from '@/utils/fetchdata'
import { log } from 'console'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Departmentsidebar = ({ setdpt }: { setdpt: any }) => {
    const [dptdata, setdptdata] = useState<any>([])
    const [loading, setloading] = useState(true)
    const [style, setstyle] = useState(0)
    const company = useSelector((state: RootState) => state.companydetails.company)
    const Authorization = useSelector((state: RootState) => state.userdetails.user.Authorization)
    const companyId = useSelector((state: RootState) => state.companydetails.company._id)




    console.log("hello")
    const handleClick = (data:any, index: number) => {
        console.log(data,789456)
        setstyle(index)
        setdpt(data)
    }

    useEffect(() => {

        const fetch = async () => {
            const id = company._id
            if (Object.keys(company).length !== 0) {
                const response = await fetchData(`/company/getdepartment/${id}`);
                setdptdata([{ Name: "all", _id: companyId }, ...response.data]);
                setloading(response.loading)
                console.log(dptdata, "🚀🚀🚀")
            } else {
                setloading(false)
            }

        }
        fetch()


    }, [company])

    return (
        <div className='w-52 bg-white rounded-xl min-h-96 '>
            <div className='border-b-2'>
                <div className='p-4'>
                    <p className='flex items-center font-semibold text-sm'>Departments <span><AiOutlineDown /></span></p>
                </div>
            </div>
            {
                dptdata.map((item: any, index: number) => (
                    <div className={`p-1  mt-1 ${style === index ? 'border-blue-500 border-l-2 pr-0' : ''}`}>
                        <div className={`p-2 bg-slate-100 rounded-xl mt-1 cursor-pointer hover:bg-blue-100 duration-0 ${style === index ? 'rounded-r-none' : ''}`} onClick={item.Name === "all" ? () => handleClick({companyid:item._id}, index) :() => handleClick({Departmentid:item._id},index) }>
                            <p className='font-semibold text-sm'>{item.Name}</p>
                            <p className='flex items-center gap-1 text-blue-400 hover:ml-1 duration-100 w-28 text-sm'>Views details<span className=''><AiOutlineRight /></span></p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Departmentsidebar
