import React, { useEffect, useState } from 'react';
import './App.css';
import FetchComponent from './FetchComponent.tsx';
import PostComponent from './PostComponent.tsx';
import { handlePost, fetchSingle } from './utils/Utils.tsx';

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [response, setResponse] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fetchedMessage, setFetchedMessage] = useState<string>('');
  const [idInput, setIdInput] = useState<string>('');
  const [id, setId] = useState<string>('');
  const apiUrl = 'http://localhost:3000/chats/hallo';
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  
  const changeIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdInput(event.target.value);
    // setId(idInput);
  }

  const changeId = () => {
    setId(idInput);
    
  };
  const addItem = () => {
    handlePost(inputValue, setResponse, setError);
    setInputValue('');
    // if (inputValue.trim() !== '') {
    //   setItems([...items, inputValue]);
    //   addResponse();
    // }
  };

  const addResponse = () => {
    if (inputValue.trim() !== '') {
      setResponse([...response, inputValue]);
    }
  }
  useEffect(() => {
    const fetchMessage = async () => {
      const message = await fetchSingle(id);
      setFetchedMessage(message);
    };
    fetchMessage();
  }, [id]);

  return (
    <div className="App">
      <h1>Chat</h1>

      <div className='chatContainer'>
      <div className='chatUser'>
      <ul>
        {items.map((item, index) => (
           <li key={index}>
           <strong>User:</strong> {/* Add the label above the message */}
           <div>{item}</div>
         </li>
        ))}
      </ul>
        </div>

        <div className='chatContact'>
        <ul>
          {items.map((response, index) => (
            <li key={index}>
              <strong>Contact:</strong> {}
              <div>{response}</div>
            </li>
          ))}
        </ul>
        </div>
        </div>

      <div className='addButton'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add Item</button> {/* Step 4 */}
      </div>
      <FetchComponent url={apiUrl} />
        <p>{fetchedMessage}</p>
        <input type="text" value={idInput} onChange={changeIdInput} placeholder='which id?'/>
          <button onClick={changeId}></button>

    </div>
  );
}

export default App;
