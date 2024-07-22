import { useEffect, useState } from 'react';

import dummy from "../../assets/dummy-profile-pic-300x300-1.png";
import Muidropdownfortask from '../dropdown/Muidropdownfortask';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Muidropdownforapprove from '../dropdown/Muidropdownforapprove';

interface IPropData {
    data?: any[];
    assigned?: string;
    refresh?: boolean;
    setrefresh?: any;
    getTaskInfo?: any;
}

const Employeetaskcard = ({ data = [], assigned, refresh, setrefresh, getTaskInfo }: IPropData) => {
    const [selector, setSelector] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        setSelector(data[0]?._id);
    }, [data]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        getTaskInfo(data[startIndex]); // Update task info with the first item of the new page
    };

    const getGaugeValue = (status: any) => {
        switch (status) {
            case "Assigned":
                return 0;
            case "Started":
                return 25;
            case "in-Progress":
                return 50;
            case "Done":
                return 80;
            case "Approved":
                return 100;
            case "Rejected":
                return 0;
            default:
                return 0;
        }
    };

    const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    
    return (
        <div className='w-full pr-3 py-3'>
            {displayedData.map((item: any, index: any) => (
                <div
                    key={index}
                    className={`flex justify-around items-center bg-white p-3 px-1 rounded-xl mb-2 border-2 duration-75 shadow-lg ${selector === item._id ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => {
                        setSelector(item._id);
                        getTaskInfo(item);
                    }}
                >
                    <div className='w-32'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Task Name</p>
                        <p className='font-medium  text-sm'>{item.taskName}</p>
                    </div>
                    <div className='w-14'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Estimate</p>
                        <p className='font-medium text-sm'>{item.estimate}</p>
                    </div>
                    <div className='w-20'>
                        <p className='text-slate-500 font-nunitosans text-sm'>DeadLine</p>
                        <p className='font-medium  text-sm'>{item.deadLine}</p>
                    </div>
                    {(assigned === "all" || assigned === "toYou") && (
                        <div className='w-36'>
                            <p className='text-slate-500 font-nunitosans text-sm mb-1 text-center'>Assignedby</p>
                            <div className='flex justify-center items-center'>
                                <div className='flex justify-start gap-2 items-center '>
                                    {item.assignedBy.data.profileImage ? (
                                        <img src={item.assignedBy.data.profileImage} alt="" className='w-6 h-6 rounded-full' />
                                    ) : (
                                        <img src={dummy} alt="" className='w-6 h-6 rounded-full' />
                                    )}
                                    <p className='text-sm font-medium '>
                                        {item.assignedBy.data.Name
                                            ? item.assignedBy.data.Name.length > 14
                                                ? item.assignedBy.data.Name.slice(0, 14) + '...'
                                                : item.assignedBy.data.Name
                                            : item.assignedBy.data.email.length > 14
                                                ? item.assignedBy.data.email.slice(0, 14) + '...'
                                                : item.assignedBy.data.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='w-32'>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1 text-center'>AssignedTo</p>
                        <div className='flex justify-center items-center'>
                            <div className='flex justify-start gap-1 items-center'>
                                {item.assignedTo.data.profileImage ? (
                                    <img src={item.assignedTo.data.profileImage} alt="" className='w-6 h-6 rounded-full' />
                                ) : (
                                    <img src={dummy} alt="" className='w-6 h-6 rounded-full' />
                                )}
                                <p className='text-sm font-medium'>
                                    {item.assignedTo.data.Name
                                        ? item.assignedTo.data.Name.length > 14
                                            ? item.assignedTo.data.Name.slice(0, 14) + '...'
                                            : item.assignedTo.data.Name
                                        : item.assignedTo.data.email.length > 14
                                            ? item.assignedTo.data.email.slice(0, 14) + '...'
                                            : item.assignedTo.data.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-20 text-sm '>
                        <p className='text-slate-500 font-nunitosans'>Priority</p>
                        {item.priority === "medium" && (
                            <div className='flex justify-start items-center text-yellow-500 gap-1'>
                                <div className='font-semibold '><BsArrowUp /></div>
                                <p className='font-medium '>{item.priority}</p>
                            </div>
                        )}
                        {item.priority === "high" && (
                            <div className='flex justify-start items-center text-red-500 gap-1'>
                                <div className='font-semibold '><BsArrowUp /></div>
                                <p className='font-medium '>{item.priority}</p>
                            </div>
                        )}
                        {item.priority === "low" && (
                            <div className='flex justify-start items-center text-green-500 gap-1'>
                                <div className='font-semibold '><BsArrowDown /></div>
                                <p className='font-medium '>{item.priority}</p>
                            </div>
                        )}
                    </div>
                    {assigned === "toYou" && (
                        <div className='w-28 flex justify-center items-center'>
                            <Muidropdownfortask defaults={item.status} id={item._id} refresh={refresh} setrefresh={setrefresh} deadline={item?.deadLine}  index={item.count}/>
                        </div>
                    )}
                    {(assigned === "all" || assigned === "byYou") && (
                        <div className='w-20'>
                            {item.status === "Assigned" && (
                                <div className=' px-2 py-1 text-center rounded-lg border'>
                                    <p className='font-medium text-green-500 text-sm'>{item.status}</p>
                                </div>
                            )}
                            {item.status === "Started" && (
                                <div className='bg-slate-100 px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-slate-500 text-sm'>{item.status}</p>
                                </div>
                            )}
                            {item.status === "in-Progress" && (
                                <div className='bg-blue-100 px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-blue-500 text-sm'>{item.status}</p>
                                </div>
                            )}
                            {item.status === "Done" && (
                                <div className=' px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-green-500 text-sm'>
                                        <Muidropdownforapprove id={item._id} refresh={refresh} setrefresh={setrefresh} index={item.count}/>
                                    </p>
                                </div>
                            )}
                            {item.status === "Approved" && (
                                <div className=' px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-green-500 text-sm'>Approved✅</p>
                                </div>
                            )}
                            {item.status === "Rejected" && (
                                <div className=' px-2 py-1 text-center rounded-lg'>
                                    <p className='font-medium text-red-500 text-sm'>Rejected❌</p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='w-8 h-8'>

                        <Gauge
                            width={50}
                            height={50}
                            value={getGaugeValue(item.status)}
                            cornerRadius="50%"
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 10,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#52b202',
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: theme.palette.text.disabled,
                                },
                            })}
                        />
                    </div>
                </div>
            ))}
            <div className="flex justify-center mt-4">
                <button
                    className={`px-4 py-2 mr-2 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`px-4 py-2 ml-2 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Employeetaskcard;
