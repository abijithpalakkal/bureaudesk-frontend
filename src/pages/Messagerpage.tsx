import Homesidebar from '@/components/maincomponents/Homesidebar'
import Messenger from '@/components/maincomponents/Messenger'
import  { useEffect, useState } from 'react'
import Zegocloud from '@/components/helpers/Zegocloud'
import { useLocation } from 'react-router-dom';

const Messagerpage = () => {

    const [zeegoCloud, setZeegooCloud] = useState(false)
    const [url,setUrl]=useState("")
    const [data,setData] = useState({})
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      };
    const query = useQuery();
    const roomID = query.get('roomID');
    console.log(query,564)

    useEffect(()=>{
        
          if(roomID){
            setZeegooCloud(true)
          }

    },[])

    return (
        <>
       {!zeegoCloud &&  <div className='bg-slate-100 flex'>
               
               <Homesidebar page="messenger" />
               <Messenger setZeegooCloud={setZeegooCloud} url={url} setData={setData} />

           </div>}
          {zeegoCloud && <Zegocloud  displayCloud={setZeegooCloud} seturl={setUrl} data={data}/>}
        </>
        
      )
}

export default Messagerpage
