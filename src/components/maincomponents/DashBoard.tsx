import  { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import Nearestcomponent from '../cards/Nearestcomponent'
import Activitystream from '../cards/Activitystream'
import Performancecard from '../cards/Performancecard'
import { BarChart } from '@mui/x-charts';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import postData from '@/utils/postdata'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { motion } from 'framer-motion';



const DashBoard = () => {




  const [_totalEmployes, setTotalEmplpoyees] = useState()
  const [totalTask, setTotalTask] = useState()
  const [doneTask, setDoneTask] = useState()
  const [approvedTask, _setApprovedTask] = useState()
  const [submittedTask, setsubmmittedtask] = useState()
  const [yettosubmitt, setyettosubmit] = useState()
  const [rejectedTask, setRejectedTask] = useState()
  const [latesubmission, setlatesubmission] = useState()
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



      const rejectedTask = await postData("/company/gettask", {

        companyid: companyId,
        status: "Rejected"
      })
      setRejectedTask(rejectedTask.data.length)

      const lateSubmissions = await postData("/company/gettask", {

        companyid: companyId,
        lateSubmission: true
      })
      setlatesubmission(lateSubmissions.data.length)





    }
    getData()



  }, [])

  function rateEmployeePerformance(totalTasks: number, submittedTasks: number, lateSubmissions: number, approvedTasks: number, rejectedTasks: number): number {
    if (totalTasks === 0) return 0; // Avoid division by zero

    // Calculate submission rate score (30 points)
    const submissionRate = submittedTasks / totalTasks;
    const submissionRateScore = submissionRate * 30;

    // Calculate late submission rate score (20 points)
    const lateSubmissionRate = lateSubmissions / submittedTasks;
    const lateSubmissionRateScore = (1 - lateSubmissionRate) * 20;

    // Calculate approval rate score (30 points)
    const approvalRate = approvedTasks / submittedTasks;
    const approvalRateScore = approvalRate * 30;

    // Calculate rejection rate score (20 points)
    const rejectionRate = rejectedTasks / submittedTasks;
    const rejectionRateScore = (1 - rejectionRate) * 20;

    // Calculate the final score out of 100
    const finalScore = submissionRateScore + lateSubmissionRateScore + approvalRateScore + rejectionRateScore;

    return finalScore;
  }

  const performanceScore = rateEmployeePerformance(totalTask || 0, submittedTask || 0, latesubmission || 0, approvedTask || 0, rejectedTask || 0);

  return (
    <div className='w-5/6 h-screen px-2 py-2'>

      <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>HOME</h1>
        </div>
        <div className='flex '>
          <div className='w-full'>
            <Performancecard />
            <div className='mt-8 flex justify-start items-start gap-5'>
              <motion.div
                initial={{ x: -100 }} // Start position (left)
                animate={{ x: 0 }} // End position (center)
                transition={{ duration: 0.5 }} // Animation duration
                className=''>
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
              </motion.div>
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

                  {rejectedTask == 0 && <p className='font-medium '><span className='text-2xl text-center'>.</span> {rejectedTask} Rejected task</p>}
                  <p className='font-medium '><span className='text-2xl'>.</span> {yettosubmitt} unsubmitted task</p>
                  <p className='font-medium '><span className='text-2xl'>.</span> {latesubmission} late submission</p>
                </div>

              </div>
              <motion.div
                initial={{ x: 100 }} // Start position (left)
                animate={{ x: 0 }} // End position (center)
                transition={{ duration: 0.5 }} // Animation duration 
                className='flex justify-center items-center ml-4'>

                <Gauge
                  width={250}
                  height={250}
                  value={performanceScore}
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

              </motion.div>
            </div>






          </div>
          <div>
            <Nearestcomponent val={""} />
            <Activitystream />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
