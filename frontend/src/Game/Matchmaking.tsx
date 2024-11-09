import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Matchmaking.css';

interface MatchMakingProps {
    startGame: () => void;
}

export default function MatchMaking({ startGame }: MatchMakingProps) {
    const [playerId, setPlayerId] = useState('');
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState<number | null>(null); // Countdown state

    const joinQueue = async () => {
        try {
            if (playerId === '') {
                setMessage("Player ID can't be empty!");
                return;
            }
            const response = await axios.post('http://localhost:3000/queue/join', { playerId });
            if (response.data !== "") {
                console.log("You matched with an opponent!");
                const gameResponse = await axios.post('http://localhost:3000/games', {
                    player1_user_id: 1,
                    player2_user_id: 2,
                    winner_user_id: 2,
                    is_ladder_game: true,
                });
                if (gameResponse.data) {
                    console.log("Game created " + response.data);
                    setMessage("Matched against " + response.data);
                    setCountdown(3); // Start countdown from 3 seconds
                } else {
                    setMessage("Found a player in queue, but failed to make a game");
                }
            } else {
                setMessage(`${playerId} was added to the queue`);
            }
        } catch (error) {
            setMessage('Error joining queue/match.');
        }
    };

    useEffect(() => {
        let timer: number | null = null; // Use number type for timer
        if (countdown !== null && countdown > 0) {
            timer = window.setInterval(() => {
                setCountdown((prev) => (prev !== null ? prev - 1 : null));
            }, 1000);
        } else if (countdown === 0) {
            startGame();
        }
    
        return () => {
            if (timer) clearInterval(timer); // Clear the interval on cleanup
        };
    }, [countdown, startGame]);
    
    return (
        <>
            <h1>Matchmaking</h1>
            <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="Enter Player ID"
            />
            <button onClick={joinQueue}>Join Queue</button>
            {message && <p>{message}</p>}
            {countdown !== null && countdown > 0 && <p>Game starting in {countdown} seconds...</p>}
        </>
    );
}
