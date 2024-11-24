import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultAvatar from "../../img/cute_dog.jpeg";

interface User {
    nickname: string;
    avatar: string;
}

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        const userIdNumber = Number(id);
		if (isNaN(userIdNumber)) {
            setError('Invalid user ID');
            return;
        }
        // Fetch user data from the back/end
        fetch(`https://localhost:3000/users/${userIdNumber}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
				console.log('Response:', response);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUser(data);
			console.log('User id:', id); // Log the entire user object
            console.log('User data:', data); // Log the entire user object
            console.log('User avatar:', data.avatar); // Log the user avatar value
            console.log('User nickname:', data.nickname); // Log the user nickname value
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
        });
    }, [id]);

	if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <img src={user.avatar || defaultAvatar } alt="User Avatar" style={{ width: '100px', height: '140px', borderRadius: '10%' }} />
            </div>
            <div>
                <h2>{user.nickname || 'undefined'}</h2>
            </div>
        </div>
    );
}
