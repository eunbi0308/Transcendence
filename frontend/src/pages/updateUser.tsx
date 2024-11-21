import React from "react";
import ReactDOM from "react-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";

export default function UpdateUser() {
    const [enabledTwoFactor, setEnabledTwoFactor] = React.useState(false);

    function updateUser(formData: FormData) {
        const nickname = formData.get("nickname");
        
        fetch(`https://localhost:3000/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nickname: nickname,
                enable_two_factor: enabledTwoFactor
            }),
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

    return (
        <form onSubmit={(e) => { e.preventDefault(); updateUser(new FormData(e.target as HTMLFormElement)); }}>
            <div>Update Nickname</div>
            <input name="nickname" />
            <div>
                <label>
                    <input type="checkbox" checked={enabledTwoFactor} onChange={(e) => setEnabledTwoFactor(e.target.checked)} />
                    Enable Two Factor Authentication
                </label>
            </div>
            <button type="submit">Update</button>
        </form>
        
    );
}