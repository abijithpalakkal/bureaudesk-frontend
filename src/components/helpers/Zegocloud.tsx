import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import { useSocketContext } from "../../context/SocketContext"
import { Socket } from 'socket.io-client'

interface IProp {
  displayCloud?: any;
  seturl:any
  data:any
}

const randomID = (len: number): string => {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
};

export function getUrlParams(url: string = window.location.href): URLSearchParams {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const Zegocloud: React.FC<IProp> = ({ displayCloud,seturl,data }: IProp) => {
    const { socket } = useSocketContext()
  const navigate = useNavigate();
  const zpRef = useRef<any>(null); // Store the ZegoUIKitPrebuilt instance in a ref
  const roomID = getUrlParams().get('roomID') || randomID(5);

  const myMeeting = async (element: HTMLDivElement | null) => {
    if (!element) return;

    // Replace with your actual appID and serverSecret
    const appID = 967796532; // Your actual app ID
    const serverSecret = "34ac02155bb37596f433e3a3b8d9af4c";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
 
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp; // Store the instance in the ref
    const sharedUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID;
    console.log(sharedUrl)
    if(data){
        socket.emit("videoCall", {...data,url:sharedUrl})
    }
   
    // Update the shared URL using the provided setSharedUrl function
    seturl(sharedUrl);
    // Start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  const myCallContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    myMeeting(myCallContainerRef.current);

    return () => {
      handleCleanup();
    window.location.reload()

    };
  }, []);

  const handleCleanup = () => {
    if (zpRef.current) {
        zpRef.current.hasJoinedRoom=false
        console.log(zpRef.current)
    }
  };

  const handleDisconnect = () => {

    displayCloud(false);
    navigate('/messenger'); // Navigate to the desired route after disconnect
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="myCallContainer" ref={myCallContainerRef} style={{ width: '100%', height: '90%' }}></div>
      <button onClick={handleDisconnect} style={{ width: '100%', height: '10%' }} className='bg-green-50'>Disconnect</button>
    </div>
  );
};

export default Zegocloud;
