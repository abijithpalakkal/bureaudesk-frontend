import  { useEffect, useState } from 'react'
import { GrNotification } from 'react-icons/gr'
import { BsPersonSquare } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'
import fetchData from '../../utils/fetchdata'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { userdetailslogout } from '../../redux/slices/userreducer/userReducer'
import { usercompanylogout } from '../../redux/slices/companyreducer/companyReducer'
import { useNavigate } from 'react-router-dom'

function Homenavbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
  }, []);


  const today = new Date();
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDayName = weekDays[today.getDay()];
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(today);
  return (
    <div className={`flex justify-between sticky top-0 ${isScrolled ? 'bg-blue-300 rounded-lg p-2'  : ''}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="rounded-md w-72 h-8 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3a6 6 0 100 12 6 6 0 000-12zM0 9a9 9 0 1118 0A9 9 0 010 9zm17.707 6.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 111.414-1.414l4 4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <div className='flex gap-5 '>
        <div className='bg-blue-100 py-1 px-3  rounded-lg '> {weekDayName}, {formattedDate}</div>
        <div className='bg-white w-8 h-8 flex justify-center items-center rounded-md'><GrNotification /></div>
        <div className='relative'>
          <div className='bg-white flex px-2 gap-2 justify-around items-center rounded-md cursor-pointer' onClick={toggleDropdown}>
            <BsPersonSquare />
            <p>john dow</p>
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
  )
}

export default Homenavbar
