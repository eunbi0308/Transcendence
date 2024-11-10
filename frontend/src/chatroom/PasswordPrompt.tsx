import React from "react";

export const PasswordPrompt = () =>
{
    const [passwordInput, setPasswordInput] = useState("");
    return(
        <div>
            <input type="text" value={passwordInput}  />
        </div>
    )
}