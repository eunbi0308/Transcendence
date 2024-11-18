import React from "react";
import ReactDOM from "react-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export default function UpdateUser() {
    function updateUser(formData: FormData) {
        const nickname = formData.get("nickname");
        
        fetch(`https://localhost:3000/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname: nickname }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('User updated successfully:', data);
        }).catch(error => {
            console.error('Failed to update user:', error);
        });
    }

    // axios.patch('https://localhost:3000/users/me', {
    //     nickname: nickname,
    // }, {
    //     withCredentials: true,
    // }).then(response => {
    //     console.log('User updated successfully:', response.data);
    // }).catch(error => {
    //     console.error('Failed to update user:', error);
    // });

    return (
        <form onSubmit={(e) => { e.preventDefault(); updateUser(new FormData(e.target as HTMLFormElement)); }}>
            <div>Update Nickname</div>
            <input name="nickname" />
            <button type="submit">Update</button>
        </form>
        
    );
}