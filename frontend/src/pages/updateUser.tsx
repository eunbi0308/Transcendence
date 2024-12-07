import React from "react";
import ReactDOM from "react-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export default function UpdateUser() {
    async function updateUser(formData: FormData) {
        const nickname = formData.get("nickname");
        
        try {
            const response = await axios(
                {
                    method: 'patch',
                    url: 'https://localhost:3000/users/me',
                    data: { nickname },
                }
            )
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Failed to update user:', error);
        }

    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); updateUser(new FormData(e.target as HTMLFormElement)); }}>
            <div>Update Nickname</div>
            <input name="nickname" />
            <button type="submit">Update</button>
        </form>
        
    );
}