
import {  AiOutlinePlus } from 'react-icons/ai'

import Homenavbar from './Homenavbar'

function Employes() {
  return (
    <div className='w-5/6 h-screen px-2 py-2'>
                <div>
                   <Homenavbar/>
                    <div className='flex justify-between mt-11'>
                        <h1 className='font-bold text-3xl'>employees(28)</h1>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span>add department</span> <span><AiOutlinePlus /></span></button>
                    </div>
                </div>
            </div>
  )
}
export default Employes
