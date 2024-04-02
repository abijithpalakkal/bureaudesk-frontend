import Homesidebar from "../components/Homesidebar"
import Employes from '../components/Departments'
import Departments from "../components/Departments"

function Department() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Departments/>
        </div>
    )
}

export default Department
