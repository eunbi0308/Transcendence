import React, { useState } from 'react';
import { PostUser } from './PostRequest.tsx';
// import Chat from './Chat.tsx';
// import Game from './Game/Game.tsx';
import MatchMaking from './Game/Matchmaking.tsx';
import Game from './Game/Game.tsx';
import './Game/Matchmaking.css';

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const urlUser = 'http://localhost:3000/users';

    const startGame = () => setGameStarted(true);
    const endGame = () => setGameStarted(false);

    return (
        <div>
            {!gameStarted && <PostUser url={urlUser} />}
            
            {gameStarted ? <Game /> : <MatchMaking startGame={startGame} />}
        </div>
    );
}

export default App;
