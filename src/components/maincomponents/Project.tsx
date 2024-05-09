import React from 'react'
import Homenavbar from './Homenavbar'
import { AiOutlineDown, AiOutlinePlus, AiOutlineRight } from 'react-icons/ai'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from 'react-router-dom'
import Departmentsidebar from './Departmentsidebar'
import Alltask from './Alltask'
import Taskassignedbyyou from './Taskassignedbyyou'
import Taskassignedtoyou from './Taskassignedtoyou'


const Project = () => {
    const navigate=useNavigate();
    return (
        <div className='w-5/6 px-2 py-2 h-screen'>
            <div className='h-full'>
                <Homenavbar />
                <div className='flex justify-between mt-11 '>
                    <h1 className='font-bold text-3xl'>PROJECTS</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={()=>{navigate("/assigntask")}}><span >assign task</span></button>
                </div>
                <div className='mt-3'>
                    
                    <div className='w-full'>
                        <div className='flex '> 
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className='flex w-96 m-auto'>
                                    <TabsTrigger value="all">all</TabsTrigger>
                                    <TabsTrigger value="assigned to you">assigned to you</TabsTrigger>
                                    <TabsTrigger value="assigned by you">assigned by you</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all" className=''><Alltask/></TabsContent>
                                <TabsContent value="assigned to you"><Taskassignedtoyou/></TabsContent>
                                <TabsContent value="assigned by you"><Taskassignedbyyou/></TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Project
