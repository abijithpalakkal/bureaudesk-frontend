import { useEffect, useState } from 'react'
import { GrNotification } from 'react-icons/gr'
import { BsPersonSquare } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'
import fetchData from '../../utils/fetchdata'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { userdetailslogout } from '../../redux/slices/userreducer/userReducer'
import { usercompanylogout } from '../../redux/slices/companyreducer/companyReducer'
import { useNavigate } from 'react-router-dom'
import Notificationmodal from '../modals/Notificationmodal'
import { setNotificationTrue } from '@/redux/slices/notificationreducer/notificationReducer'




function Homenavbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state: RootState) => state.userdetails.user)
  const notification = useSelector((state: RootState) => state.notification);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    // Logic to handle profile click
  };

  const handleLogoutClick = async () => {
    await fetchData("/auth/logout")
    dispatch(userdetailslogout())
    dispatch(usercompanylogout())
    navigate("/")

  };
  const handleNotificationClick = () => {
    dispatch(setNotificationTrue());
  }

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      if (!isTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);<div className="relative text-gray-600">
          <input type="search" name="search" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>


  const today = new Date();
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDayName = weekDays[today.getDay()];
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(today);
  return (
    <>
      <div className={`flex justify-between sticky top-0 ${isScrolled ? 'bg-blue-300 rounded-lg p-2' : ''}`}>
        <div className="relative text-gray-600">
          <input type="search" name="search" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
        <div className='flex gap-5 items-center'>
          <div className='bg-blue-100 py-1 px-3  rounded-lg '> {weekDayName}, {formattedDate}</div>
          <div className='bg-white w-8 h-8 flex justify-center items-center rounded-md' onClick={handleNotificationClick}><GrNotification /></div>
          <div className='relative'>
            <div className='bg-white flex px-2 py-1 gap-2 justify-around items-center rounded-md cursor-pointer' onClick={toggleDropdown}>
              {user.profileImage ? <img src={user.profileImage} alt="" className='w-6 h-6 rounded-full' /> : <BsPersonSquare />}
              {user.Name ? <p className='font-semibold'>{user.Name}</p> : <p>john dow</p>}
              <AiOutlineDown />
            </div>
            {isOpen && (
              <div className='absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md'>
                <button className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={handleProfileClick}>
                  Profile
                </button>
                <button className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {notification && <Notificationmodal />}
    </>

  )
}

export default Homenavbar
