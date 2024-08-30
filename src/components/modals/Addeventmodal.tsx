import React, { useState } from 'react';
import Uibuttons from '../buttons/uibuttons/Uibuttons';
import { AiOutlineClose } from 'react-icons/ai';
import logo from "../../assets/logo_without_writing-removebg-preview.png"
import postData from '../../utils/postdata';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import { IProp } from '@/interface/addeventmodal';




function Addeventmodal({ closemodal,refresh,val }: IProp) {
    const companyid = useSelector((state: RootState) => state.companydetails.company._id)
    const [eventName, setEventName] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Check if the selected date and time are in the past
        const selectedDatetime = new Date(`${eventDate}T${eventTime}`);
        const currentDatetime = new Date();
        if (selectedDatetime < currentDatetime) {
            // Display an error message or handle the case as needed
            toast.error("Selected date and time cannot be in the past");
            return;
        }
    
        // Clear form fields
        setEventName('');
        setEventCategory('');
        setPriority('');
        setEventDate('');
        setEventEndDate('');
        setEventTime('');
        setEventEndTime('');
        setEventDescription('');
    
        try {
            await postData("company/addevent", {
                eventName,
                eventCategory,
                eventEndDate,
                eventEndTime,
                priority,
                eventDate,
                eventTime,
                eventDescription,
                companyid
            });
        } catch (err: any) {
            toast.error(err.message);
        }
        refresh(!val)
        closemodal(false);
    };

    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen h-screen">
                <div className="inset-0 bg-black opacity-50 relative h-full w-full"></div>
                <div className="bg-white rounded-lg shadow-2xl p-4 px-6 absolute">
                    <div className='flex justify-between'>
                        <div className='w-12 '>
                            <img src={logo} alt="" />
                        </div>
                        <div className='bg-blue-100 w-6 h-6 rounded-md flex justify-center items-center  hover:bg-blue-500  duration-500' onClick={() => closemodal(false)}><AiOutlineClose /></div>
                    </div>
                    <form onSubmit={handleSubmit} className='font-nunitosans mt-2'>
                        <p className='font-nunitosans font-semibold text-xl'>Add Events</p>
                        <div className='flex flex-col mt-1'>
                            <label htmlFor="event-name" className='text-slate-400'>Event Name</label>
                            <input
                                type="text"
                                id="event-name"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                            />
                        </div>

                        <div className='flex flex-col mt-1'>
                            <label htmlFor="event-category" className='text-slate-400'>Event Category:</label>
                            <select
                                id="event-category"
                                value={eventCategory}
                                onChange={(e) => setEventCategory(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                            >
                               <option value="others">others</option>
                                <option value=">Meeting">Meeting</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Inaguration">Inaguration</option>
                                <option value="Birthday">Birthday</option>
                               
                            </select>
                        </div>

                        <div className='flex flex-col mt-1'>
                            <label htmlFor="priority" className='text-slate-400'>Priority:</label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                            >
                             
                                <option value="low" selected>Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className='flex gap-10 mt-1'>
                            <div className='flex flex-col'>
                                <label htmlFor="event-date" className='text-slate-400'>Event Date:</label>
                                <input
                                    type="date"
                                    id="event-date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    required
                                    className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="event-time" className='text-slate-400'>Event Time:</label>
                                <input
                                    type="time"
                                    id="event-time"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    required
                                    className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                                />
                            </div>
                        </div>
                        <div className='flex gap-10 mt-1'>
                            <div className='flex flex-col'>
                                <label htmlFor="event-date" className='text-slate-400'>Event End Date:</label>
                                <input
                                    type="date"
                                    id="event-date"
                                    value={eventEndDate}
                                    onChange={(e) => setEventEndDate(e.target.value)}
                                    required
                                    className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="event-time" className='text-slate-400'>Event End Time:</label>
                                <input
                                    type="time"
                                    id="event-time"
                                    value={eventEndTime}
                                    onChange={(e) => setEventEndTime(e.target.value)}
                                    required
                                    className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3 mt-1'>
                            <label htmlFor="event-description" className='text-slate-400'>Event Description:</label>
                            <textarea
                                id="event-description"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                required
                                className='rounded-lg p-1 border border-slate-400 mt-1 text-slate-400'
                            ></textarea>
                        </div>
                        <div className='flex justify-center items-center'> <Uibuttons btnname="submit" /></div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addeventmodal;
