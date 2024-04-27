import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { AiFillCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import postData from '../../utils/postdata';
import { useContext } from 'react'
import { Postcontext } from '../../config/Conteststore'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Muidropdown({ displaymodal, position, id, dptid ,setrefresh,refresh}: any) {
  /*const[postdetails,setpostdetails ]=useContext<any>(Postcontext)*/
  const Authorization=useSelector((state:RootState)=>state.userdetails.user.Authorization)
  const naviagte = useNavigate()
  const makemanager = async() => {
    await postData("user/setmanager/", {
      id:id,
      departmentid:dptid
    })
    setrefresh(!refresh)
  }
  return (
    <Dropdown>
      <MenuButton><p className='flex justify-center items-center'>action<AiFillCaretDown className='mt-1' /></p></MenuButton>
      <Menu>
        <MenuItem onClick={() => { displaymodal(true) }}>Profile</MenuItem>
        {Authorization!="basic_node" && <MenuItem onClick={makemanager}>make as manager</MenuItem>}
        {Authorization!="basic_node" && <MenuItem onClick={() => { position(true) }}>edit position</MenuItem>}
        {Authorization!="basic_node" && <MenuItem>Block</MenuItem>}
      </Menu>
    </Dropdown>
  );
}