import React, {useState} from "react";
import { handlePost } from "./utils/Utils.tsx";
const PostComponent: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // const handlePost = async () => {
    //     try {
           
    //         const res = await fetch('http://localhost:3000/chats', {
    //             method: 'POST', // Specify that this is a POST request
    //             headers: {
    //                 'Content-Type': 'application/json', // Specify that we're sending JSON data
    //             },
    //             body: JSON.stringify({ message }), // Convert the message state to JSON and send it
    //         });

    //         // Check if the response is not ok
    //         if (!res.ok) {
    //             throw new Error('Network response was not ok'); // Handle network errors
    //         }

    //         const data = await res.json(); // Parse the JSON response
    //         setResponse(data); // Update the response state with the data received
    //         setError(null); // Clear any previous error messages
    //     } catch (err: any) {
    //         setError(err.message); // Update the error state with the error message
    //     }
    // };

    const handleSubmit = () => {
        handlePost(message, setResponse, setError);
    }

    return (
        <div>
            <h2>Post a Message</h2>
            <input
                type="text"
                value={message} // Bind the input value to the message state
                onChange={(e) => setMessage(e.target.value)} // Update the message state on input change
                placeholder="Enter your message"
            />
            <button onClick={handleSubmit}>Send Message</button> {/* Call handlePost when button is clicked */}
            {response && <div>Response: {JSON.stringify(response)}</div>} {/* Display the server response */}
            {error && <div>Error: {error}</div>} {/* Display any error messages */}
        </div>
    );
};


export default PostComponent;