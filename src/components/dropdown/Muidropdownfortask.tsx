import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { AiFillCaretDown } from 'react-icons/ai';
import postData from '../../utils/postdata';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Tasksubmitmodal from '../modals/Tasksubmitmodal';
import SubmitTaskStatus from '../modals/SubmitTaskStatus';
import { TaskStatusContext } from '@/context/TaskStatusContext';




interface IProp {
  defaults?: string
  id?: string
  refresh?: boolean
  setrefresh?: any
  deadline?: any
  index?:any
}

const Muidropdownfortask = ({ defaults, id, setrefresh, refresh, deadline ,index}: IProp) => {

  const [displayModal, setdisplayModal] = useState(false)
  const [displayStatusModal, setDisplayStatusModal] = useState(false)
  const [status, setStatus] = useState<string>("")
  const context = useContext(TaskStatusContext)
  const { setStatusDetails } = context as any
  


  const handleSelect = async (clicked: string) => {
    
    try {
      setStatusDetails({
        index: index,
        status: clicked
      })
      await postData(`/company/updatetask/${id}`, {
        status: clicked
      })
      setrefresh(!refresh)
    } catch (err: any) {
      toast.error(err?.message)
    }
  }
  return (
    <>
      <Dropdown>
        {defaults === "Assigned" && (
          <MenuButton>
            <p className='flex justify-center items-center'>{defaults}<AiFillCaretDown className='mt-1' /></p>
          </MenuButton>
        )}
        {defaults !== "Assigned" && (
          <>
            {defaults === "Started" && (
              <MenuButton>
                <p className='flex justify-center items-center text-slate-500 bg-slate-200 px-3 py-1 rounded-lg'>{defaults}<AiFillCaretDown className='mt-1' /></p>
              </MenuButton>
            )}
            {defaults === "in-Progress" && (
              <MenuButton>
                <p className='flex justify-center items-center text-blue-500  bg-blue-200 px-1 py-1 rounded-lg text-[11px]'>{defaults}<AiFillCaretDown className='mt-1' /></p>
              </MenuButton>
            )}
            {defaults === "Done" && (
              <p className='flex justify-center items-center text-purple-500  bg-purple-200 px-5 py-1 rounded-lg'>in-review</p>

            )}
            {defaults === "Approved" && (
              <p className='flex justify-center items-center text-green-400 px-5 py-1 rounded-lg'>Approved✅</p>

            )}
          </>
        )}

        <Menu>
          {defaults === "Assigned" && (
            <>
              <MenuItem onClick={() => { setDisplayStatusModal(true); setStatus("Started"); }}>
                <div className='text-slate-500 bg-slate-200 px-7 py-1 rounded-lg '>Started</div>
              </MenuItem>
              <MenuItem onClick={() => { setDisplayStatusModal(true); setStatus("in-Progress"); }}>
                <div className='text-blue-500  bg-blue-200 px-3 py-1 rounded-lg'>in-Progress</div>
              </MenuItem>
              {/* <MenuItem onClick={() => handleSelect('Done')}> */}
              <MenuItem onClick={() => { setdisplayModal(true) }}>
                <div className='text-green-500  bg-green-200 px-8 py-1 rounded-lg'>Done</div>
              </MenuItem>
            </>
          )}
          {(defaults !== "Assigned" && defaults !== "Started" && defaults !== "in-Progress" && defaults !== "Done") && (
            <MenuItem onClick={() => { setDisplayStatusModal(true); setStatus("Started"); }}>
              <div className='text-slate-500 bg-slate-200 px-7 py-1 rounded-lg '>Started</div>
            </MenuItem>
          )}
          {(defaults !== "Assigned" && defaults !== "in-Progress" && defaults !== "Done") && (
            <MenuItem onClick={() => { setDisplayStatusModal(true); setStatus("in-Progress"); }}>
              <div className='text-blue-500  bg-blue-200 px-3 py-1 rounded-lg'>in-Progress</div>
            </MenuItem>
          )}
          {(defaults !== "Assigned" && defaults !== "Done") && (
            // <MenuItem onClick={() => handleSelect('Done')}>
            <MenuItem onClick={() => { setdisplayModal(true) }}>
              <div className='text-green-500  bg-green-200 px-8 py-1 rounded-lg'>Done</div>
            </MenuItem>
          )}
        </Menu>
      </Dropdown>
      {displayModal && <Tasksubmitmodal display={displayModal} setdisplayModal={setdisplayModal} id={id} handleSelect={handleSelect} deadline={deadline} index={index}/>}
      {displayStatusModal && <SubmitTaskStatus setDisplayStatusModal={setDisplayStatusModal} status={status} id={id} refresh={refresh} setrefresh={setrefresh} index={index}/>}
    </>

  )
}

export default Muidropdownfortask
