
import Homesidebar from "../components/maincomponents/Homesidebar"
import Company from '../components/maincomponents/Company'
import Zegocloud from "@/components/helpers/Zegocloud"



function Companypage() {

    /*const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getCompanyAction("6606b25a640c67908b913ab1"))
    },[])*/
    return (
        <div className='bg-slate-100  flex'>
            <Homesidebar page="company" />
            <Company />
            <div>
            </div>
        </div>
    )
}

export default Companypage
