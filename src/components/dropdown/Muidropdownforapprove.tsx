import { useContext } from 'react';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { AiFillCaretDown } from 'react-icons/ai';
import postData from '@/utils/postdata';
import { TaskStatusContext } from '@/context/TaskStatusContext';

const Muidropdownforapprove = ({ id, refresh, setrefresh, index }: any) => {

  const context = useContext(TaskStatusContext)
  const { setStatusDetails } = context as any
  const submitApprove = async (e: string) => {
    setStatusDetails({
      index: index,
      status: e
    })
    await postData(`/company/updatetask/${id as any}`, {
      status: e
    })
    setrefresh(!refresh)
  }
  return (
    <div>
      <Dropdown>
        <MenuButton >
          <p className='flex justify-center items-center bg-green-300 px-3 py-1 rounded-lg'>
            done <AiFillCaretDown className='mt-1' />
          </p>
        </MenuButton>
        <Menu>
          <MenuItem onClick={() => { submitApprove("Approved") }}><p className='text-green-500'>Approved</p></MenuItem>
          <MenuItem onClick={() => { submitApprove("Rejected") }}><p className='text-red-500'>Rejected</p></MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default Muidropdownforapprove;
