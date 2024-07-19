import React from 'react'
import Homenavbar from '../Homenavbar'
import Nearestcomponent from '../../cards/Nearestcomponent'
import Activitystream from '../../cards/Activitystream'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalPerformance from './PersonalPerformance'
import DepartmentPerformance from './DepartmentPerformance'

const Managerdashboard = () => {
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>HOME</h1>
                </div>
            </div>
            <div className='flex '>
                <div className='w-full'>

                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="flex w-96 m-auto">
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="department">Department</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal">
                            <p><PersonalPerformance/></p>
                        </TabsContent>
                        <TabsContent value="department">
                            <p><DepartmentPerformance/></p>
                        </TabsContent>
                    </Tabs>


                </div>

                <div>
                    <Nearestcomponent val={""} />
                    <Activitystream />
                </div>
            </div>
        </div >
    )
}

export default Managerdashboard
