import React, {useState} from "react";
export const handlePost = async (
    message: string,                          // The message being sent
    setResponse: (data: any) => void,         // Function to update the response state
    setError: (error: string | null) => void, // Function to update the error state
    url: string = 'http://localhost:3000/chats' // Optional URL parameter with a default value
  ) => {
      try {
          const res = await fetch(url, {
              method: 'POST', // Specify that this is a POST request
              headers: {
                  'Content-Type': 'application/json', // Specify that we're sending JSON data
              },
              body: JSON.stringify({ message }), // Convert the message state to JSON and send it
          });
  
          // Check if the response is not ok
          if (!res.ok) {
              throw new Error('Network response was not ok'); // Handle network errors
          }
  
          const data = await res.json(); // Parse the JSON response
          setResponse(data); // Update the response state with the data received
          setError(null); // Clear any previous error messages
      } catch (err: any) {
          setError(err.message); // Update the error state with the error message
          setResponse(null); // Clear any previous response data on error
      }
  };

export const fetchSingle = async (id) => {
    try
    {
        const response = await fetch(`http://localhost:3000/chats/${id}`);

        if (!response.ok) {
            throw new Error ('Response was not good - fetchSingle');
        }
        const data = await response.json();
        return data.message;
    }
    catch(error)
    {
        console.error('Error fetching chat:', error);
        return '';
    }
}
  