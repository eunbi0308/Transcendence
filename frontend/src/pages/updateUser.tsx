import React from "react";
import ReactDOM from "react-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";

export default function UpdateUser() {
    const [enabledTwoFactor, setEnabledTwoFactor] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function updateUser(formData: FormData) {
        const nickname = formData.get("nickname");

        if (!selectedFile)
            console.error("No file selected");
        
        fetch(`https://localhost:3000/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nickname: nickname,
                enable_two_factor: enabledTwoFactor,
                // avatar: selectedFile,
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
            <br />
            <div>
                <label>
                    <input type="checkbox" checked={enabledTwoFactor} onChange={(e) => setEnabledTwoFactor(e.target.checked)} />
                    Enable Two Factor Authentication
                </label>
            </div>
            <br />
            <div>
                <label htmlFor="avatar">Upload Avatar</label>
                <input type="file" id="avatar" name="avatar" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <button type="submit">Update</button>
        </form>
        
    );
}