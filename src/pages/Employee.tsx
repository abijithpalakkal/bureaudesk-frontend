import Homesidebar from "../components/Homesidebar"
import Employes from '../components/Employes'

function Employee() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Employes/>
        </div>
    )
}

export default Employee
