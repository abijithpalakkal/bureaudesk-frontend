
import { AiOutlineCalendar } from "react-icons/ai"
import event from "../../assets/event image.png"

function Eventcard() {
  return (
    <div className='mt-5'>
    <div className='flex bg-white rounded-lg items-center'>
        <div className='p-5'>
            <div>
                <div className='flex justify-center items-center gap-3'>
                    <img src={event} alt="" />
                    <p className='font-semibold'>presentaion of new department</p>
                </div>
            </div>
            <div>
                <div className=' flex justify-center items-center'> 
                    <img src="" alt="" />
                </div>
                <p className='flex items-center mt-4 gap-3 text-slate-500'><AiOutlineCalendar/><span>created sep 12,2020</span></p>
            </div>
        </div>
        <div className='flex justify-center items-center p-5 border-l-2 border-slate-400'>
           <p> meeting link:csibi</p>
        </div>
    </div>
</div>
  )
}

export default Eventcard
