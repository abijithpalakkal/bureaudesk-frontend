
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


const DepartmentPerformance = () => {
    const settings = {
        width: 250,
        height: 250,
        value: 60,
      };

      
    const [totalEmployes, setTotalEmplpoyees] = useState()
    const [totalTask, setTotalTask] = useState()
    const [doneTask, setDoneTask] = useState()
    const [approvedTask, setApprovedTask] = useState()
    const [submittedTask, setsubmmittedtask] = useState()
    const [rejectedTask, setRejectedTask] = useState([])
    const [yettosubmitt, setyettosubmit] = useState()
    const [latesubmission, setlatesubmission] = useState()
    const companyId = useSelector((state: RootState) => state.companydetails.company._id);
    const role = useSelector((state: RootState) => state.userdetails.user.Authorization)
    const userId = useSelector((state: RootState) => state.userdetails.user._id)
    const userDepartment= useSelector((state: RootState) => state.userdetails.user.Departmentid)

    useEffect(() => {
        const getData = async () => {
            const totalEmployes = await postData("/user/getuserdetails", {
                companyid: companyId,
                Departmentid:userDepartment
            })
            setTotalEmplpoyees(totalEmployes.data.length)

            const totaltask = await postData("/company/gettask", {

                companyid: companyId,
                Departmentid: userDepartment

            })
            setTotalTask(totaltask.data.length)

            const approvedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: "Approved",
                Departmentid: userDepartment

            })
            setDoneTask(approvedTask.data.length)

            const rejectedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: "Rejected",
                Departmentid: userDepartment
              })
              setRejectedTask(rejectedTask.data.length)


              const lateSubmissions = await postData("/company/gettask", {

                companyid: companyId,
                lateSubmission: true,
                Departmentid: userDepartment
              })
              setlatesubmission(lateSubmissions.data.length)
        



            const submittedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: ["Done", "Approved", "Rejected"],
                Departmentid: userDepartment

            })
            setsubmmittedtask(submittedTask.data.length)


            const yettosubmittedTask = await postData("/company/gettask", {

                companyid: companyId,
                status: ["Assigned", "Started", "in-progress"],
                Departmentid: userDepartment
            })
            setyettosubmit(yettosubmittedTask.data.length)




        }
        getData()

    }, [])
  return (
    <div>

            <div className='mt-5 flex justify-between pr-5'>
            <div className='bg-white w-52 h-32 rounded-2xl border shadow-xl p-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-4xl '>{totalEmployes}</p>
                    <div className='bg-blue-200 rounded-full p-1'>
                        <AiOutlineUsergroupDelete className='w-8 h-8' />
                    </div>

                </div>
                <p className='text-lg font-medium mt-3'>total employees</p>

            </div>


                <div className='bg-white w-52 h-32  rounded-2xl border shadow-xl p-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-4xl '>{totalTask}</p>
                        <div className='bg-blue-200 rounded-full p-1'>
                            <AiOutlineUsergroupDelete className='w-8 h-8' />
                        </div>

                    </div>
                    <p className='text-xl font-medium mt-3'>total task</p>

                </div>

                <div className='bg-white  w-52 h-32  rounded-2xl border shadow-xl p-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-4xl '>{submittedTask}</p>
                        <div className='bg-blue-200 rounded-full p-1'>
                            <AiOutlineUsergroupDelete className='w-8 h-8' />
                        </div>

                    </div>
                    <p className='text-xl font-medium mt-3'>submitted task</p>

                </div>



                <div className='bg-white  w-52 h-32  rounded-2xl border shadow-xl p-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-4xl '>{doneTask}</p>
                        <div className='bg-blue-200 rounded-full p-1'>
                            <AiOutlineUsergroupDelete className='w-8 h-8' />
                        </div>

                    </div>
                    <p className='text-xl font-medium mt-3'>Approved task</p>

                </div>




            </div>
            <div className='mt-8 flex justify-start items-start gap-5'>
                <div className=''>
                    <BarChart
                        series={[
                            { data: [totalTask as any], color: 'violet' }, // Customize the color for the first series
                            { data: [submittedTask], color: 'green' },  // Customize the color for the second series
                            { data: [doneTask], color: 'red' },
                        ]}
                        height={290}
                        width={290}
                        xAxis={[{ data: ['Q1',], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    >

                    </BarChart>
                </div>
                <div>
                <div>
                  <div className='flex  items-center gap-2'>
                    <div className='w-3 h-3 bg-pink-400 border border-black'></div>
                    <p className='font-medium'>Total Task</p>
                  </div>

                  <div className='flex  items-center gap-2'>
                    <div className='w-3 h-3 bg-green-700 border border-black'></div>
                    <p className='font-medium'>Submit Task</p>
                  </div>

                  <div className='flex  items-center gap-2'>
                    <div className='w-3 h-3 bg-red-700 border border-black'></div>
                    <p className='font-medium'>Rejected Task</p>
                  </div>
                </div>
                <div className='mt-10'>
                  <p className='text-xl font-bold '>performance report</p>

                  {rejectedTask?.length != 0 && <p className='font-medium '><span className='text-2xl text-center'>.</span> {rejectedTask} Rejected task</p>}
                  <p className='font-medium '><span className='text-2xl'>.</span> {yettosubmitt} unsubmitted task</p>
                  <p className='font-medium '><span className='text-2xl'>.</span> {latesubmission} late submission</p>
                </div>

              </div>
              <div className='flex justify-center items-center ml-4'>

                <Gauge
                  {...settings}
                  cornerRadius="50%"
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: '#52b202',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.text.disabled,
                    },
                  })}
                />

              </div>
            </div>
        </div>


  )
}

export default DepartmentPerformance
