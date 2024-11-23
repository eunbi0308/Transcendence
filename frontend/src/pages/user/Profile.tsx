import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
    nickname: string;
    avatar: string;
}

export default function Profile() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userIdNumber = Number(userId);
        // Fetch user data from the backend
        fetch(`https://localhost:3000/users/${userIdNumber}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUser(data);
            console.log('User data:', data); // Log the entire user object
            console.log('User avatar:', data.avatar); // Log the user avatar value
            console.log('User nickname:', data.nickname); // Log the user nickname value
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
        });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <img src={user.avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            </div>
            <div>
                <h2>{user.nickname}</h2>
            </div>
        </div>
    );
}
