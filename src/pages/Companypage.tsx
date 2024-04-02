
import Homesidebar from "../components/Homesidebar"
import Company from '../components/Company'


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
