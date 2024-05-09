import Homesidebar from '@/components/maincomponents/Homesidebar'
import Assigntask from '@/components/maincomponents/Assigntask'



const Assigntaskpage = () => {
  return (
    <div className='bg-slate-100 flex'>
            <Homesidebar page="projects" />
           <Assigntask/>
        </div>
  )
}

export default Assigntaskpage
