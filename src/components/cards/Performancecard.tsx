import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import React, { useEffect, useState } from 'react'
import { RootOptions } from 'react-dom/client'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { UseSelector, useSelector } from 'react-redux'

const Performancecard = () => {

    const [totalEmployes, setTotalEmplpoyees] = useState()
    const [totalTask, setTotalTask] = useState()
    const [doneTask, setDoneTask] = useState()
    const companyId = useSelector((state: RootState) => state.companydetails.company._id);
    useEffect(() => {
        const getData = async () => {
            const getdata1 = await postData("/user/getuserdetails", {
                companyid: companyId
            })
            setTotalEmplpoyees(getdata1.data.length)

            const getdata2 = await postData("/company/gettask", {

                companyid: companyId
            })
            setTotalTask(getdata2.data.length)

            const getdata3 = await postData("/company/gettask", {

                companyid: companyId,
                status:"Done"
            })
            setDoneTask(getdata3.data.length)


        }
        getData()

    }, [])

    return (
        <div className='mt-5 flex justify-between pr-5'>
            <div className='bg-white w-64 h-40 rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{totalEmployes}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-xl font-medium mt-3'>total employees</p>

            </div>

            <div className='bg-white w-64 h-40 rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{totalTask}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-xl font-medium mt-3'>ongoing task</p>

            </div>

            <div className='bg-white w-64 h-40 rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{doneTask}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-xl font-medium mt-3'>completed task</p>

            </div>

        </div>
    )
}

export default Performancecard
