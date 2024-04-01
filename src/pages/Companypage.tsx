
import Homesidebar from "../components/Homesidebar"
import { useDispatch } from "react-redux"
import Company from '../components/Company'
import { useEffect } from "react"
import { getCompanyAction } from "../redux/actions/useractions/getCompanyAction"
import { AppDispatch } from "../redux/store"

function Companypage() {
    /*const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getCompanyAction("6606b25a640c67908b913ab1"))
    },[])*/
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
