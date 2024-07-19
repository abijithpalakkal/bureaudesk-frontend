import React, { useEffect, useState } from 'react';
import Profilecard from '../cards/Profilecard';
import PersonalPerformance from './manger/PersonalPerformance';
import fetchData from '@/utils/fetchdata';
import { useParams } from 'react-router-dom';

const Performance = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetchData(`/user/getuserbyid/${id}`);
                if (response && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        if (id) {
            fetchUser();
        }
    }, [id]);

    useEffect(() => {
        if (user) {
            console.log(user, 123);
        }
    }, [user]);

    return (
        <div className='mt-4 flex gap-5'>
            <Profilecard user={user} />
            <PersonalPerformance />
        </div>
    );
};

export default Performance;
