import React, { useState, useEffect } from 'react';
import { IProp } from '@/interface/timer';


function Timer({ minutes, setMinutes, setSeconds, seconds }: IProp) {

    const [expired, setExpired] = useState(false);
    useEffect(() => {
        let timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    setExpired(true);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);

    return (
        <div className='text-red-600 mt-3'>
            {expired ? (
                <h1>OTP Expired</h1>
            ) : (
                <h1>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
            )}
        </div>
    );
}

export default Timer;
