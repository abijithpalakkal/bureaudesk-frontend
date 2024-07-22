import { ReactNode } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface CommonModalProps {
  children?: ReactNode;
  onClose: any
}

function Commonmodal({children,onClose}:CommonModalProps) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen h-screen">
        <div className=" inset-0 bg-black  opacity-50 relative h-full w-full"></div>
        <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">
          <div className='bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black' onClick={() => onClose(false)}><BiArrowBack /></div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Commonmodal
