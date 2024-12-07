import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import TwoFactorAuth from "./TwoFactorAuth";
import Button from '@mui/joy/Button';

const Login = () => {
    return (
        // This is the login page. It will redirect to the 42 intra login page.
        <Style>
            <h1>Transcendence</h1>
            <Button
                component="a"
                variant="solid" 
                sx={{ 
                    color: '#5865F2', 
                    backgroundColor: 'white',
                    transition: '0.3s',
                    '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)',
                    }
                }}
                href="https://localhost:3000/auth/42/login"
                size="lg"
            >
                Login with 42.intra
            </Button>
        </Style>
    );
};

const Style = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #5865F2;
    height: 100vh;
    position: relative;
    
    h1 {
        color: white;
        font-family: 'Roboto', sans-serif;
        font-size: 3rem;
        margin-bottom: 2rem;
    }
    
    .login_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 10px;
        font-family: 'Roboto', sans-serif;
        background-color: white;
        cursor: pointer;
        transition: 0.3s;
        margin: 1rem;
        a {
            background-color: white;
            font-family: 'Roboto', sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
            color: #5865F2;
            text-decoration: none; /* Remove underline */
            transition: color 0.3s;

            &:hover {
                color: #F88379;
        }
    }
`
export default Login