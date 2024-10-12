import React, { useState } from 'react';
import './App.css';
import FetchComponent from './FetchComponent.tsx';
import PostComponent from './PostComponent.tsx';

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [response, setResponse] = useState<string[]>([]);
  const apiUrl = 'http://localhost:3000/chats/hallo';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      addResponse();
      setInputValue('');
    }
  };

  const addResponse = () => {
    if (inputValue.trim() !== '') {
      setResponse([...response, inputValue]);
    }
  }

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

    </div>
  );
}

export default App;
