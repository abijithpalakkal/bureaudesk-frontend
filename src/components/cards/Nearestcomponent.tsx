import { AiFillClockCircle, AiOutlineRight } from 'react-icons/ai'
import { ImArrowUp2 } from 'react-icons/im'

function Nearestcomponent() {
  return (
    <div className='w-64 rounded-xl bg-white p-3 mt-5'>
    <div className='flex  items-center justify-between mb-4'>
      <p className='text-xl font-semibold'>Nearest Events</p>
      <p className='text-blue-500 font-nunitosans flex justify-between items-center'><span>view all</span> <AiOutlineRight /></p>
    </div>
    <div className='border-l-2 border-blue-500 px-2 mt-5'>
      <div className='flex justify-between mt-5'>
        <p className='font-nunitosans font-semibold'>anna's birthday</p>
        <p className='text-green-500'><ImArrowUp2 /></p>
      </div>
      <div className='flex justify-between items-center mt-3 '>
        <p className='text-slate-500 '><span className='mr-1'>Today</span><span className='mr-1'>|</span><span className='mr-1'>5:00 PM</span></p>
        <div className='bg-blue-100 rounded-md text-slate-600'>
          <p className='flex justify-between px-2  items-center'> <span className='mr-1'><AiFillClockCircle /></span>4h</p>
        </div>
      </div>
    </div>
    <div className='border-l-2 border-blue-500 px-2 mt-5'>
      <div className='flex justify-between mt-5'>
        <p className='font-nunitosans font-semibold'>anna's birthday</p>
        <p className='text-green-500'><ImArrowUp2 /></p>
      </div>
      <div className='flex justify-between items-center mt-3'>
        <p className='text-slate-500 '><span className='mr-1'>Today</span><span className='mr-1'>|</span><span className='mr-1'>5:00 PM</span></p>
        <div className='bg-blue-100 rounded-md text-slate-600'>
          <p className='flex justify-between px-2  items-center'> <span className='mr-1'><AiFillClockCircle /></span>4h</p>
        </div>
      </div>
    </div>
    <div className='border-l-2 border-pink-500 px-2 mt-5'>
      <div className='flex justify-between mt-5'>
        <p className='font-nunitosans font-semibold'>anna's birthday</p>
        <p className='text-green-500'><ImArrowUp2 /></p>
      </div>
      <div className='flex justify-between items-center mt-3'>
        <p className='text-slate-500 '><span className='mr-1'>Today</span><span className='mr-1'>|</span><span className='mr-1'>5:00 PM</span></p>
        <div className='bg-blue-100 rounded-md text-slate-600'>
          <p className='flex justify-between px-2  items-center'> <span className='mr-1'><AiFillClockCircle /></span>4h</p>
        </div>

      </div>
    </div>
    
    
    
  </div>
  )
}

export default Nearestcomponent
