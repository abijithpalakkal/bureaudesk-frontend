import Homesidebar from "../components/maincomponents/Homesidebar"
import Departments from "../components/maincomponents/Departments"

function Department() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Departments/>
        </div>
    )
}

export default Department
