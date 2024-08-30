import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import postData from '../../utils/postdata';
import { Props } from '@/interface/addemployee';


function Addemployees({ modalstatus, dptid }: Props) {
  const [email, setemail] = useState("")
  const [position,setposition]=useState("")
  const companyid = useSelector((state: RootState) => state.companydetails.company._id)

  const handlesubmit = async (e: SyntheticEvent) => {
    if (companyid != undefined) {
      e.preventDefault()

      const obj = {
        email: email,
        position:position,
        Departmentid: dptid,
        companyid: companyid
      }
      const response = await postData("/user/addemployee", obj)
      modalstatus(response?.loading as boolean)
    }

  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen h-screen">
        <div className=" inset-0 bg-black  opacity-50 relative h-full w-full"></div>
        <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">

          <div className='bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black' onClick={() => modalstatus(false)}><BiArrowBack /></div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">add employees</h2>
          </div>
          <form onSubmit={handlesubmit}>
            <div className='flex flex-col'>
              <label htmlFor="companyName" className='mb-2'>Employee email:</label>
              <input
                type="email"
                id="companyName"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="companyName" className='mb-2'>Mention position <span className='text-gray-400 text-sm'>eg:junior staff,senior developer</span></label>
              <input
                type="text"
                id="companyName"
                value={position}
                onChange={(e) => setposition(e.target.value)}
                required
                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div><p><span >•</span>The employees will be having <span className='text-blue-600'>basic_node permission</span>.you can later set manager for each department.Initially add manager as employee.</p></div>
            <div className='flex justify-center '>
              <button type="submit" className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                create and send email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addemployees
