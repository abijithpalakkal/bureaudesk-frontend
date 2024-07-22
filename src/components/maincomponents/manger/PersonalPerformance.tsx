import { RootState } from '@/redux/store';
import postData from '@/utils/postdata';
import { BarChart } from '@mui/x-charts';
import  { useEffect, useState } from 'react';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useParams } from 'react-router-dom';

const PersonalPerformance = () => {
  const settings = {
    width: 250,
    height: 250,
    value: 60,
  };

  const [_totalEmployes, setTotalEmplpoyees] = useState<number | null>(null);
  const [totalTask, setTotalTask] = useState<number | null>(null);
  const [doneTask, setDoneTask] = useState<number | null>(null);
  const [submittedTask, setsubmmittedtask] = useState<number | null>(null);
  const [rejectedTask, setRejectedTask] = useState<number | null>(null);
  const [yettosubmitt, setyettosubmit] = useState<number | null>(null);
  const [latesubmission, setlatesubmission] = useState<number | null>(null);
  const companyId = useSelector((state: RootState) => state.companydetails.company._id);

  const { id } = useParams();
  const userId = id || useSelector((state: RootState) => state.userdetails.user._id);

  useEffect(() => {
    const getData = async () => {
      const totalEmployes = await postData("/user/getuserdetails", { companyid: companyId });
      setTotalEmplpoyees(totalEmployes.data.length);

      const totaltask = await postData("/company/gettask", { companyid: companyId, assignedTo: userId });
      setTotalTask(totaltask.data.length);

      const approvedTask = await postData("/company/gettask", { companyid: companyId, status: "Approved", assignedTo: userId });
      setDoneTask(approvedTask.data.length);

      const rejectedTask = await postData("/company/gettask", { companyid: companyId, status: "Rejected", assignedTo: userId });
      setRejectedTask(rejectedTask.data.length);

      const lateSubmissions = await postData("/company/gettask", { companyid: companyId, lateSubmission: true, assignedTo: userId });
      setlatesubmission(lateSubmissions.data.length);

      const submittedTask = await postData("/company/gettask", { companyid: companyId, status: ["Done", "Approved", "Rejected"], assignedTo: userId });
      setsubmmittedtask(submittedTask.data.length);

      const yettosubmittedTask = await postData("/company/gettask", { companyid: companyId, status: ["Assigned", "Started", "in-progress"], assignedTo: userId });
      setyettosubmit(yettosubmittedTask.data.length);
    }
    getData();
  }, [companyId, userId]);

  return (
    <div>
      <div className='mt-5 flex justify-between pr-5'>
        <div className='bg-white w-52 h-32 rounded-2xl border shadow-xl p-8'>
          <div className='flex justify-between items-center'>
            <p className='text-4xl '>{totalTask}</p>
            <div className='bg-blue-200 rounded-full p-1'>
              <AiOutlineUsergroupDelete className='w-8 h-8' />
            </div>
          </div>
          <p className='text-xl font-medium mt-3'>Total Task</p>
        </div>

        <div className='bg-white w-52 h-32 rounded-2xl border shadow-xl p-8'>
          <div className='flex justify-between items-center'>
            <p className='text-4xl '>{submittedTask}</p>
            <div className='bg-blue-200 rounded-full p-1'>
              <AiOutlineUsergroupDelete className='w-8 h-8' />
            </div>
          </div>
          <p className='text-xl font-medium mt-3'>Submitted Task</p>
        </div>

        <div className='bg-white w-52 h-32 rounded-2xl border shadow-xl p-8'>
          <div className='flex justify-between items-center'>
            <p className='text-4xl '>{doneTask}</p>
            <div className='bg-blue-200 rounded-full p-1'>
              <AiOutlineUsergroupDelete className='w-8 h-8' />
            </div>
          </div>
          <p className='text-xl font-medium mt-3'>Approved Task</p>
        </div>
      </div>

      <div className='mt-8 flex justify-start items-start gap-5'>
        <div>
          <BarChart
            series={[
              { data: [totalTask || 0], color: 'violet' },
              { data: [submittedTask || 0], color: 'green' },
              { data: [doneTask || 0], color: 'red' },
            ]}
            height={290}
            width={290}
            xAxis={[{ data: ['Q1'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
        <div>
          <div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-pink-400 border border-black'></div>
              <p className='font-medium'>Total Task</p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-700 border border-black'></div>
              <p className='font-medium'>Submit Task</p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-red-700 border border-black'></div>
              <p className='font-medium'>Rejected Task</p>
            </div>
          </div>
          <div className='mt-10'>
            <p className='text-xl font-bold'>Performance Report</p>
            {rejectedTask && <p className='font-medium'><span className='text-2xl text-center'>.</span> {rejectedTask} Rejected Task</p>}
            {yettosubmitt && <p className='font-medium'><span className='text-2xl'>.</span> {yettosubmitt} Unsubmitted Task</p>}
            {latesubmission && <p className='font-medium'><span className='text-2xl'>.</span> {latesubmission} Late Submission</p>}
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
  );
};

export default PersonalPerformance;
