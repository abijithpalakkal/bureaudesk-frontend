import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import  { useEffect, useState } from 'react'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import {  useSelector } from 'react-redux'
import { motion } from 'framer-motion';



const Performancecard = () => {

    const [totalEmployes, setTotalEmplpoyees] = useState()
    const [totalTask, setTotalTask] = useState()
    const [doneTask, setDoneTask] = useState()
    const [submittedTask, setsubmmittedtask] = useState()
    const [_yettosubmitt, setyettosubmit] = useState()
    const companyId = useSelector((state: RootState) => state.companydetails.company._id);

    useEffect(() => {
        const getData = async () => {
            const totalEmployes = await postData("/user/getuserdetails", {
                companyid: companyId
            })
            setTotalEmplpoyees(totalEmployes.data.length)

            const totaltask = await postData("/company/gettask", {

                companyid: companyId
            })
            setTotalTask(totaltask.data.length)

            const approvedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: "Approved"
            })
            setDoneTask(approvedTask.data.length)

            const submittedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: ["Done", "Approved", "Rejected"]
            })
            setsubmmittedtask(submittedTask.data.length)


            const yettosubmittedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: ["Assigned", "Started", "in-progress"]
            })
            setyettosubmit(yettosubmittedTask.data.length)




        }
        getData()

    }, [])

    return (
        <div className='mt-5 flex justify-between pr-5'>
            <motion.div
                 initial={{ x: -100 }} // Start position (left)
                 animate={{ x: 0 }} // End position (center)
                transition={{ duration: 0.5 }} // Animation duration
                className='bg-white w-52 h-32 rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{totalEmployes}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-lg font-medium mt-3'>total employees</p>

            </motion.div>

            <motion.div
                initial={{ y: -100 }} // Start position
                animate={{ y: 0 }} // End position
                transition={{ duration: 0.5 }} // Animation duration
            className='bg-white w-52 h-32  rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{totalTask}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-xl font-medium mt-3'>total task</p>

            </motion.div>

            <motion.div
                initial={{ y: -100 }} // Start position
                animate={{ y: 0 }} // End position
                transition={{ duration: 0.5 }} // Animation duration
             className='bg-white  w-52 h-32  rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{submittedTask}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-xl font-medium mt-3'>submitted task</p>

            </motion.div>



            <motion.div
                 initial={{ x: 100 }} // Start position (left)
                 animate={{ x: 0 }} // End position (center)
                transition={{ duration: 0.5 }} // Animation duration 
            className='bg-white  w-52 h-32  rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{doneTask}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-xl font-medium mt-3'>Approved task</p>

            </motion.div>






        </div >
    )
}

export default Performancecard
