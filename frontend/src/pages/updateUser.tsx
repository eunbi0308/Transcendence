import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useState } from "react";

export default function UpdateUser() {
    const [enabledTwoFactor, setEnabledTwoFactor] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const updateUser = useCallback(async (formData: FormData) => {
        const nickname = formData.get("nickname");

        if (!nickname)
        {
            alert("Please enter a nickname");
            return;
        }
        if (!selectedFile)
        {
            alert("Please select an avatar");
            return;
        }

        var data = new FormData();
        data.append("nickname", nickname);
        data.append("enabledTwoFactor", `${enabledTwoFactor}`);
        data.append("avatar", selectedFile);
        
        try {
            const response = await axios(
                {
                    method: 'patch',
                    url: 'https://localhost:3000/users/me',
                    data: data,
                    withCredentials: true,
                }
            )
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Failed to update user:', error);
        }

    }, [enabledTwoFactor, selectedFile]);

    return (
        <form onSubmit={(e) => { e.preventDefault(); updateUser(new FormData(e.target as HTMLFormElement)); }}>
            <h1>Update user profile</h1>
            <div>Update Nickname</div>
            <input name="nickname" /><br />
            <div>
            <br />
                <label>
                    <input type="checkbox" checked={enabledTwoFactor} onChange={(e) => setEnabledTwoFactor(e.target.checked)} />
                    Enable Two Factor Authentication
                </label>
            </div><br />
            <div>
                <label htmlFor="avatar">Upload Avatar</label><br />
                <input type="file" id="avatar" name="avatar" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
            </div><br />
            <button type="submit">Update</button>
        </form>
        
    );
}