import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Taskinfo from '../maincomponents/Taskinfo';
import Submittedtask from '../maincomponents/Submittedtask';
import postData from '@/utils/postdata';



interface Task {
    deadLine: string;
    estimate: string;
}
interface IProp {
    apiRefresh: boolean
    setApiRefresh: Dispatch<SetStateAction<boolean>>;
}


const Taskinfocard = ({ taskInfo }: {

    taskInfo: any

}) => {
    
    const [activeTab, setActiveTab] = useState('Task info');
     
    useEffect(()=>{
     setActiveTab('Task info')
     console.log("hello")
    },[taskInfo])


    return (
        <div className='bg-white w-60 rounded-2xl p-4 py-2 mt-3 h-[470px]'>
           <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='flex w-52 m-auto h-6 bg-green-100'>
                    <TabsTrigger value="Task info" className='text-[12px] h-4 '>Task info</TabsTrigger>
                    {taskInfo?.status == "Done" && <TabsTrigger value="submission details" className='text-[12px] h-4'>submission details</TabsTrigger>}
                </TabsList>
                <TabsContent value="Task info"><Taskinfo taskInfo={taskInfo} /></TabsContent>
                <TabsContent value="submission details"><Submittedtask taskInfo={taskInfo} /></TabsContent>
            </Tabs>
        </div>

    )
}

export default Taskinfocard
