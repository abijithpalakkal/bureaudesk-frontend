import { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'

import { AiOutlinePlus } from 'react-icons/ai'

import fetchData from '../../utils/fetchdata'
import Editprofilemodal from '../modals/Editprofilemodal'

import Profilecard from '../cards/Profilecard'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"







interface iprop {
  id: string
}

function Viewprofile({ id }: iprop) {
  const [user, setuser] = useState(null as any)
  const [displaymodal, setdisplaymodal] = useState(false)
  useEffect(() => {
    async function fetch() {
      const response = await fetchData(`/user/getuserbyid/${id}`)
      setuser(response.data)
    }
    fetch()
  }, [displaymodal])

  return (
    <div className='w-5/6 h-screen px-2 py-2'>
      <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>profile</h1>
          <div className='flex justify-between gap-2 items-center'>
            
          </div>
        </div>
        <div className='mt-2 flex'>
          <Profilecard user={user as any} displaymodal={displaymodal} setdisplaymodal={setdisplaymodal} />
          <div className='w-full'>
            <div className='flex justify-center'>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="account">performace</TabsTrigger>
                  <TabsTrigger value="password">team</TabsTrigger>
                  <TabsTrigger value="task">task</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
                <TabsContent value="task">Change your password here.</TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {displaymodal && <Editprofilemodal modal={setdisplaymodal as any} />}
    </div>
  )
}

export default Viewprofile
