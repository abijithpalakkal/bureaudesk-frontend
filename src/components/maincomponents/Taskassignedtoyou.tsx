import  { useEffect, useRef, useState } from 'react'
import Employeetaskcard from '../cards/Employeetaskcard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import Taskinfocard from '../cards/Taskinfocard'
import { useContext } from 'react'
import { AppContext } from '../maincomponents/Project'
import { toast } from 'react-toastify'
import EmployeeCardSkeleton from '../skeleton/EmployeeCardSkeleton'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from '@mui/joy/Dropdown'
import { Menu, MenuButton, MenuItem } from '@mui/base'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { TaskStatusContext } from "../../context/TaskStatusContext.tsx";


const Taskassignedtoyou = () => {
  const companyid = useSelector((state: RootState) => state.companydetails.company._id)
  const userid = useSelector((state: RootState) => state.userdetails.user._id)

  const [taskdata, settaskdata] = useState([])
  const [taskInfoData, setTaskInfoData] = useState(null)
  const [refresh, setrefresh] = useState(false);
  const [skeleton, setskeleton] = useState(false)
  const [filterObj, setFilterObj] = useState<any>({})
  const [assignedBy, setAssignedBy] = useState("select")
  const [priority, setPriority] = useState<any>("select")
  const [status, setStatus] = useState("select")
  const [query, setQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Define the type for selectedDate
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companyEmployees, setCompanyEmployees] = useState<any>(null)
  const statuscontext = useContext(TaskStatusContext);
  const { statusDetails, setStatusDetails } = statuscontext as any
  const debouncedTimeout = useRef<NodeJS.Timeout | null>(null);




  const context = useContext(AppContext);
  const { apiRefresh } = context;
  useEffect(() => {
    if (statusDetails) {
      console.log(statusDetails, 789)
      const tempTaskData: any = taskdata
      tempTaskData[statusDetails.index].status = statusDetails.status
      settaskdata(tempTaskData);
      setStatusDetails(null)
    }

  }, [statusDetails])

  useEffect(() => {
    async function userdata() {
      try {
        setskeleton(true)
        const response = await postData("/company/gettask", {
          companyid: companyid,
          assignedTo: userid,
          ...filterObj
        })
        const data = response.data;
        
        const fetchUserDetails = async (userId: string) => {
          const userDetails = await fetchData(`/user/getuserbyid/${userId}`);
          return userDetails;
      };

      const updatedDataPromises = data.map(async (task: any, index: number) => {
          const assignedBy = await fetchUserDetails(task.assignedBy);
          const assignedTo = await fetchUserDetails(task.assignedTo);

          return {
              ...task,
              assignedBy,
              assignedTo,
              count: index
          };
      });

      const updatedData: any = await Promise.all(updatedDataPromises);

      settaskdata(updatedData);
        setTaskInfoData(data[0])

      } catch (e) {
        toast.error("fetching data failed")
      }
      finally {
        setskeleton(false)
      }
    }

    userdata()
  }, [companyid, userid, apiRefresh, filterObj])

  useEffect(() => {
    const getData = async () => {

      const { data } = await postData("/user/getuserdetails", { companyid })
      setCompanyEmployees(data)
    }
    getData()
  }, [])

  const addFilter = (obj: { [key: string]: any }) => {
    // Get the key of the obj, assuming it only has one key-value pair
    const key = Object.keys(obj)[0];
    const value = obj[key];

    // Create a new object by copying the existing filterObj
    const newFilterObj = { ...filterObj };

    // If the value is "none", delete the key from newFilterObj
    if ((value === "none" || value === "" || value === null) && newFilterObj.hasOwnProperty(key)) {
      delete newFilterObj[key];
    } else {
      // Update the value if the key exists, or add the new key-value pair if it doesn't
      newFilterObj[key] = value;
    }

    // Set the updated filter object
    if (key === "taskName") {
      if (debouncedTimeout.current) {
        clearTimeout(debouncedTimeout.current);
      }
      debouncedTimeout.current = setTimeout(() => {
        setFilterObj(newFilterObj);
      }, 3000);
    } else {
      setFilterObj(newFilterObj);
    }
  }

  function getTaskInfo(data: any) {
    setTaskInfoData(data)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date, "date")
    addFilter({ deadLine: formatDate(date) })
    setSelectedDate(date);
    setDropdownOpen(false); // Close the dropdown when a date is selected
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Select Date';
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };


  return (
    <div className='flex '>
      <div className='w-full'>
        <div className='border border-green-300 rounded-lg p-1 flex justify-between items-center px-5'>
          <div className="relative text-gray-600">
            <input type="search" name="search" placeholder="Search task" className="bg-white h-8 px-5  rounded-full text-sm focus:outline-none w-32" value={query} onChange={(e) => {
              setQuery(e.target.value);
              addFilter({ taskName: e.target.value });
            }} />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </div>

          <div>
            <p className='text-center text-slate-600 font-medium'>DeadLine:</p>
            <div className="relative inline-block">
              <div className="bg-white px-3 py-1 rounded-lg cursor-pointer" onClick={toggleDropdown}>
                <p className="flex justify-center items-center">
                  {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                </p>
              </div>
              {dropdownOpen && (
                <div className="absolute z-10 bg-white rounded-lg shadow-lg mt-2">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    className="bg-green-300 rounded-lg p-2"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <p className='text-center text-slate-600 font-medium'>assignedby:</p>
            <Dropdown>
              <MenuButton >
                <p className='flex justify-center items-center bg-white px-3 py-1 rounded-lg'>
                  {assignedBy}

                </p>
              </MenuButton>
              <Menu className='bg-blue-200 p-2  rounded-lg'>

                <MenuItem>
                  <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setAssignedBy("select"); addFilter({ assignedBy: "none" }) }}>
                    <p className='  rounded-lg'>None</p>
                  </div>
                </MenuItem>


                {companyEmployees?.map((obj: any) => (
                  <MenuItem>
                    <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setAssignedBy(obj.Name ? obj.Name : "select"); addFilter({ assignedBy: obj._id }) }}>
                      <p className='  rounded-lg'>{obj.Name ? obj.Name : obj.email}</p>
                      <p>{obj.position ? obj.position : obj.Authorization}</p>
                    </div>
                  </MenuItem>
                ))}

              </Menu>
            </Dropdown>
          </div>


          <div>
            <p className='text-center text-slate-600 font-medium'>Priority:</p>
            <Dropdown>
              <MenuButton >
                <p className='flex justify-center items-center bg-white px-3 py-1 rounded-lg'>
                  {priority}

                </p>
              </MenuButton>
              <Menu className='bg-white p-2  rounded-lg'>
                <MenuItem>
                  <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setPriority("select"); addFilter({ priority: "none" }) }}>
                    <p className='  rounded-lg'>None</p>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className='flex justify-start items-center text-yellow-500 gap-1 mb-1 cursor-pointer' onClick={() => { setPriority("medium"); addFilter({ priority: "medium" }) }}>
                    <div className='font-semibold '><BsArrowUp /></div>
                    <p className='font-medium '>medium</p>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className='flex justify-start items-center text-red-500 gap-1  mb-1 cursor-pointer' onClick={() => { setPriority("High"); addFilter({ priority: "high" }) }}>
                    <div className='font-semibold '><BsArrowUp /></div>
                    <p className='font-medium '>High</p>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className='flex justify-start items-center text-green-500 gap-1  mb-1 cursor-pointer' onClick={() => { setPriority("low"); addFilter({ priority: "low" }) }}>
                    <div className='font-semibold '><BsArrowDown /></div>
                    <p className='font-medium '>Low</p>
                  </div>
                </MenuItem>
              </Menu>
            </Dropdown>
          </div>

          <div>
            <p className='text-center text-slate-600 font-medium'>status:</p>
            <Dropdown>
              <MenuButton >
                <p className='flex justify-center items-center bg-white px-3 py-1 rounded-lg'>
                  {status}
                </p>
              </MenuButton>
              <Menu className='bg-blue-200 p-2 rounded-lg'>
                <MenuItem>
                  <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setStatus("select"); addFilter({ status: "none" }) }}>
                    <p className='  rounded-lg'>None</p>
                  </div>
                </MenuItem>
                <MenuItem><p className='p-2 px-3 py-1 rounded-lg cursor-pointer' onClick={() => { setStatus("Assigned"); addFilter({ status: "Assigned" }) }}>Assigned</p></MenuItem>
                <MenuItem><p className='p-2 px-3 py-1 rounded-lg cursor-pointer' onClick={() => { setStatus("Started"); addFilter({ status: "Started" }) }}>Started</p></MenuItem>
                <MenuItem><p className='p-2 px-3 py-1 rounded-lg cursor-pointer' onClick={() => { setStatus("in-Progress"); addFilter({ status: "in-Progress" }) }}>in-Progress</p></MenuItem>
                <MenuItem><p className='p-2 px-3 py-1 rounded-lg cursor-pointer' onClick={() => { setStatus("Done"); addFilter({ status: "Done" }) }}>Done</p></MenuItem>
                <MenuItem><p className='p-2 px-3 py-1 rounded-lg cursor-pointer' onClick={() => { setStatus("Approved"); addFilter({ status: "Approved" }) }}>Approved</p></MenuItem>
                <MenuItem><p className='p-2 px-3 py-1 rounded-lg cursor-pointer' onClick={() => { setStatus("Rejected"); addFilter({ status: "Rejected" }) }}>Rejected</p></MenuItem>
              </Menu>
            </Dropdown>
          </div>

        </div>
        {!skeleton && <Employeetaskcard data={taskdata} assigned={"toYou"} refresh={refresh} setrefresh={setrefresh} getTaskInfo={getTaskInfo} />}
        {skeleton && <EmployeeCardSkeleton />}
      </div>

      <Taskinfocard taskInfo={taskInfoData} />
    </div>

  )
}

export default Taskassignedtoyou
