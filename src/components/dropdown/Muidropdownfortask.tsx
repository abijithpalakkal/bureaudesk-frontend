import React from 'react'
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

const Muidropdownfortask = () => {
  return (
    <Dropdown>
    <MenuButton><p className='flex justify-center items-center'>assigned<AiFillCaretDown className='mt-1' /></p></MenuButton>
    <Menu>
      <MenuItem ><div className='text-slate-500 bg-slate-200 px-7 py-1 rounded-lg '>To-Do</div></MenuItem>
       <MenuItem ><div className='text-blue-500  bg-blue-200 px-3 py-1 rounded-lg'>in-Progress</div></MenuItem>
      <MenuItem><div className='text-green-500  bg-green-200 px-8 py-1 rounded-lg'>Done</div></MenuItem>
    </Menu>
  </Dropdown>
  )
}

export default Muidropdownfortask
