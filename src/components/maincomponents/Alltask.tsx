import React, { useEffect, useState } from 'react'
import Departmentsidebar from './Departmentsidebar'
import Employeetaskcard from '../cards/Employeetaskcard'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import Taskinfocard from '../cards/Taskinfocard'
import { useContext } from 'react'
import { AppContext } from '../maincomponents/Project'
import { toast } from 'react-toastify'
import EmployeeCardSkeleton from '../skeleton/EmployeeCardSkeleton'
import Dropdown from '@mui/joy/Dropdown'
import { Menu, MenuButton, MenuItem } from '@mui/base'
import { AiFillCaretDown, AiFillFilter } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { FcClearFilters } from 'react-icons/fc'
import { setPriority } from 'os'

const Alltask = () => {
    const [dpt, setdpt] = useState<any>(null)
    const [taskdata, settaskdata] = useState([])
    const [taskInfoData, setTaskInfoData] = useState(null)
    const [skeleton, setskeleton] = useState(false)
    const [companyEmployees, setCompanyEmployees] = useState<any>(null)
    const [assignedBy, setAssignedBy] = useState("select")
    const [assignedTo, setAssignedTo] = useState("select")
    const [priority, setPriority] = useState<any>("select")
    const [status, setStatus] = useState("select")
    const [filterObj, setFilterObj] = useState<any>({})
    const companyid = useSelector((state: any) => state.companydetails.company._id)

    const context = useContext(AppContext);
    const { apiRefresh, setApiRefresh } = context;




    console.log("in all task")

    console.log(dpt, "sadca")

    function changedpt(data: any) {
        console.log(data, 948645)
        setdpt(data)
    }
    useEffect(() => {
        const fetchtaskuser = async () => {
            try {
                setskeleton(true)
                const response: any = await postData("/company/gettask", { ...dpt, ...filterObj });
                console.log(response);
                const data = response.data;

                for (let i = 0; i < data.length; i++) {
                    data[i].assignedBy = await fetchData(`/user/getuserbyid/${data[i].assignedBy}`);
                    data[i].assignedTo = await fetchData(`/user/getuserbyid/${data[i].assignedTo}`);
                }

                settaskdata(data);
                setTaskInfoData(data[0])

            } catch (e) {
                toast.error("error in fetching data")
            } finally {
                setskeleton(false)
            }

        }

        fetchtaskuser();
    }, [dpt, apiRefresh, filterObj]);

    useEffect(() => {
        const getData = async () => {

            const { data } = await postData("/user/getuserdetails", { companyid })
            console.log(data, 89)
            setCompanyEmployees(data)
        }
        getData()
    })


    const addFilter = (obj: { [key: string]: any }) => {
        // Get the key of the obj, assuming it only has one key-value pair
        const key = Object.keys(obj)[0];
        const value = obj[key];

        // Create a new object by copying the existing filterObj
        const newFilterObj = { ...filterObj };

        // If the value is "none", delete the key from newFilterObj
        if (value === "none" && newFilterObj.hasOwnProperty(key)) {
            delete newFilterObj[key];
        } else {
            // Update the value if the key exists, or add the new key-value pair if it doesn't
            newFilterObj[key] = value;
        }

        // Set the updated filter object
        setFilterObj(newFilterObj);
    }



    function getTaskInfo(data: any) {
        setTaskInfoData(data)
    }




    return (
        <div className='flex'>
            <Departmentsidebar setdpt={changedpt} />
            <div className='ml-4 w-full'>
                <div className='border border-green-300 rounded-lg p-1 flex justify-between items-center px-5'>
                    <div className="relative text-gray-600">
                        <input type="search" name="search" placeholder="Search task" className="bg-white h-8 px-5  rounded-full text-sm focus:outline-none w-32" />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <p className='text-center text-slate-600 font-medium'>ass</p>
                        <Dropdown>
                            <MenuButton >
                                <p className='flex justify-center items-center bg-white px-3 py-1 rounded-lg'>
                                    select

                                </p>
                            </MenuButton>
                            <Menu className='bg-green-300 '>
                                <MenuItem><p className='bg-green-300 p-2 px-3 py-1 rounded-lg'>Approved</p></MenuItem>
                                <MenuItem><p className='bg-green-300 p-2 px-3 py-1 rounded-lg'>Approved</p></MenuItem>
                                <MenuItem><p className='bg-green-300 p-2 px-3 py-1 rounded-lg'>Approved</p></MenuItem>
                            </Menu>
                        </Dropdown>
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


                                {companyEmployees?.map((obj: any, index: number) => (
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
                        <p className='text-center text-slate-600 font-medium'>assignedto:</p>
                        <Dropdown>
                            <MenuButton >
                                <p className='flex justify-center items-center bg-white px-3 py-1 rounded-lg'>
                                    {assignedTo}

                                </p>
                            </MenuButton>
                            <Menu className='bg-blue-200 p-2  rounded-lg'>

                                <MenuItem>
                                    <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setAssignedTo("select"); addFilter({ assignedTo: "none" }) }}>
                                        <p className='  rounded-lg'>None</p>
                                    </div>
                                </MenuItem>

                                {companyEmployees?.map((obj: any, index: number) => (
                                    <MenuItem>
                                        <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setAssignedTo(obj.Name ? obj.Name : "select"); addFilter({ assignedTo: obj._id }) }}>
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
                                        <div className='px-2 border border-black mb-1 rounded-lg hover:bg-green-300' onClick={() => { setStatus("select");addFilter({status:"none"}) }}>
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
                {!skeleton && <Employeetaskcard data={taskdata} assigned='all' refresh={false} setrefresh={() => { }} getTaskInfo={getTaskInfo} />}
                {skeleton &&
                    <>
                        <EmployeeCardSkeleton />
                        <EmployeeCardSkeleton />
                        <EmployeeCardSkeleton />

                    </>

                }
            </div>
            <Taskinfocard taskInfo={taskInfoData} />

        </div>
    )
}

export default Alltask
