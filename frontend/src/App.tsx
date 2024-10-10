import React, { useState } from 'react';
import './App.css';
import ChatUser from './ChatUser';
import ChatContact from './ChatContact'; 

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]); // Changed to `responses`

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
      setResponses([...responses, inputValue]);
    }
  }

  return (
    <div className="App">
      <h1>Chat</h1>

      <div className='chatContainer'>
         <ChatUser items={items} />
         <ChatContact responses={responses} /> {/* Ensure this matches the state name */}
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
    </div>
  );
}

export default App;
