import React, { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import { ImCross } from 'react-icons/im'
import Createcompanymodal from '../modals/Createcompanymodal'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Zegocloud from '../helpers/Zegocloud'

function Company() {

    const [modaldisplay, setmodaldisplay] = useState(false)
    const [companydetails, setcompanydetails] = useState(null as any)
    const company = useSelector((state: RootState) => state.companydetails?.company?._id)
    const companydetails1 = useSelector((state: RootState) => state.companydetails?.company)
    useEffect(() => {

        if (company != undefined) {
            setcompanydetails(companydetails1)
        }
    }, [company])
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div className='h-full'>
                <Homenavbar />
                {companydetails == null && <div className='h-4/5 w-full flex justify-center items-center'>
                    <div className='flex flex-col '>
                        <ImCross className='text-red-700 text-3xl self-center mb-3' />
                        <p className='text-center mb-4 text-2xl font-bold'>company not created!</p>
                        <button className="bg-blue-500 w-[200px] flex items-center justify-center self-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={() => { setmodaldisplay(true) }}>
                            <span >Create company</span>
                        </button>
                    </div>
                </div>}
                {companydetails && <div className=" bg-white shadow-md mt-8 rounded-md overflow-hidden">
                    <div className="p-4">
                        <img src={companydetails?.Companylogo} alt="" className="w-1/5 h-auto object-cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800">{companydetails?.Name}</h2>
                        <p className="text-gray-600">{companydetails?.Bussinesstype}</p>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="text-gray-700">{companydetails?.Description}</p>
                    </div>
                </div>}
            </div>

            {modaldisplay && <Createcompanymodal modalstatus={setmodaldisplay} />}
           

        </div>
                                          

    )
}

export default Company
