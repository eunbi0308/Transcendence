import React, { useEffect, useState } from "react";

interface UserProfile {
    nickname: string;
    email: string;
    avatarUrl: string;
    enable_two_factor: boolean;
}

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://localhost:3000/users/me`, {
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
            setProfile(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const decodedAvatarUrl = profile ? atob(profile.avatarUrl) : '';

    return (
        <div>
            <h1>User Profile</h1>
            {profile && (
                <div>
                    <img src={decodedAvatarUrl} alt="User Avatar" />
                    <p>Nickname: {profile.nickname}</p>
                    <p>Email: {profile.email}</p>
                    <p>Two Factor Authentication: {profile.enable_two_factor ? 'Enabled' : 'Disabled'}</p>
                </div>
            )}
        </div>
    );
}