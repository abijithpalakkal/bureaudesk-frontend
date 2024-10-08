import  { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from 'react-router-dom'
import Alltask from './Alltask'
import Taskassignedbyyou from './Taskassignedbyyou'
import Taskassignedtoyou from './Taskassignedtoyou'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { createContext } from 'react'



export const AppContext = createContext<any | undefined>(undefined);

const Project = () => {
    const [apiRefresh, setApiRefresh] = useState(false)

    const userRole = useSelector((state: RootState) => state.userdetails.user.Authorization)
    const navigate = useNavigate();
    return (
        <>
            <div className='flex justify-between mt-11 '>
                <h1 className='font-bold text-3xl'>PROJECTS</h1>
                <div className='flex gap-4'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { navigate("/assigntask") }}><span >assign task</span></button>
                    <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { navigate("/projects/viewproject") }}><span >All Projects</span></button>
                    {userRole=="root_node" && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { navigate("/projects/addproject") }}><span >add Project</span><span className='text-black'><AiOutlinePlus /></span></button>}
                </div>
            </div>
            <div className='mt-3'>
                <div className='w-full'>
                    <div className='flex '>
                        <AppContext.Provider value={{ apiRefresh, setApiRefresh }}>
                            <Tabs defaultValue={userRole === "root_node" ? "all" : "assigned to you"} className="w-full">

                                <TabsList className='flex w-96 m-auto'>
                                    {userRole == "root_node" && <TabsTrigger value="all">All Task</TabsTrigger>}
                                    {userRole !== "root_node" && <TabsTrigger value="assigned to you">Assigned To You</TabsTrigger>}
                                    <TabsTrigger value="assigned by you">Assigned By You</TabsTrigger>
                                </TabsList>
                                
                                {userRole == "root_node" && <TabsContent value="all" className=''><Alltask /></TabsContent>}
                                {userRole !== "root_node" && <TabsContent value="assigned to you"><Taskassignedtoyou /></TabsContent>}
                                <TabsContent value="assigned by you"><Taskassignedbyyou /></TabsContent>
                            </Tabs>
                        </AppContext.Provider>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Project
