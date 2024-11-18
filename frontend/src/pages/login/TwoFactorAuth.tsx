import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:3000/verify-2fa', { code });
      if (response.data.success) {
        setSuccess('2FA verification successful!');
        setError('');
      } else {
        setError('Invalid 2FA code. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container>
      <h1>Google 2-Factor Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 2FA code"
          required
        />
        <button type="submit">Verify</button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  height: 100vh;
  padding: 2rem;
  box-sizing: border-box;

  h1 {
    color: #333;
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      padding: 0.5rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: white;
      background-color: #5865f2;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #4752c4;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 1rem;
`;

export default TwoFactorAuth;