import React from 'react'
import Homesidebar from "../components/Homesidebar"
import { string } from 'yup'
import Company from '../components/Company'

function Companypage() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="company" />
            <Company />
            <div>



                
                    
                
            </div>
        </div>
    )
}

export default Companypage
