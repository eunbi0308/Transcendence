import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './Game.css';

const socket = io('http://localhost:3001');

const Game: React.FC = () => {
    const [scored, setScored] = useState(0);
    const [conceded, setConceded] = useState(0);
    const ballRef = useRef<HTMLDivElement | null>(null);
    const player1Ref = useRef<HTMLDivElement | null>(null);
    const player2Ref = useRef<HTMLDivElement | null>(null);
    const tableRef = useRef<HTMLDivElement | null>(null);
    const speedXRef = useRef(1.5);
    const speedYRef = useRef(1.5);
    const ballXRef = useRef(0);
    const ballYRef = useRef(0);
    const player1YRef = useRef(0);
    
    useEffect(() => {
        const ballElement = ballRef.current;
        const tableElement = tableRef.current;

        if (ballElement && tableElement) {
            resetBallPosition();

            socket.on('ballMove', (data) => {
                console.log("ws.on:ballMove");
                ballXRef.current = data.x;
                ballYRef.current = data.y;
                setScored(data.scored);
                setConceded(data.conceded); 
                if (ballElement) {
                    ballElement.style.left = `${ballXRef.current}px`;
                    ballElement.style.top = `${ballYRef.current}px`;
                }
            });

            socket.on('playerMove', (data) => {
                console.log("ws.on:playerMove");
                if (data.player === 1 && player1Ref.current) {
                    player1Ref.current.style.top = `${data.positionY}px`;
                } else if (data.player === 2 && player2Ref.current) {
                    player2Ref.current.style.top = `${data.positionY}px`;
                }
            });

            const moveBallInterval = setInterval(moveBall, 10);
            document.addEventListener('mousemove', handleMouseMove);

            return () => {
                clearInterval(moveBallInterval);
                document.removeEventListener('mousemove', handleMouseMove);
                socket.off('ballMove');
                socket.off('playerMove');
            };
        }
    }, []);

    const handleMouseMove = (event: MouseEvent) => {
        if (player1Ref.current && tableRef.current) {
            const tableRect = tableRef.current.getBoundingClientRect();
            const newTop = event.clientY - player1Ref.current.offsetHeight / 2;

            if (newTop >= tableRect.top && newTop + player1Ref.current.offsetHeight <= tableRect.bottom) {
                player1Ref.current.style.top = `${newTop}px`;
                player1YRef.current = newTop; // Update the reference
                socket.emit('playerMove', { player: 1, positionY: newTop });
            }
        }
    };

    const moveBall = () => {
        const tableElement = tableRef.current;
        const ballElement = ballRef.current;

        if (!tableElement || !ballElement) return;

        ballXRef.current -= speedXRef.current;
        ballYRef.current -= speedYRef.current;

        const tableRect = tableElement.getBoundingClientRect();

        if (ballYRef.current <= tableRect.top || ballYRef.current >= tableRect.bottom - ballElement.offsetHeight) {
            speedYRef.current = -speedYRef.current;
        }

        if (ballXRef.current <= 0) {
            setConceded((prev) => prev + 1);
            resetBallPosition();
        } else if (ballXRef.current >= tableRect.width - ballElement.offsetWidth) {
            setScored((prev) => prev + 1);
            resetBallPosition();
        }

        socket.emit('ballMove', {
            x: ballXRef.current,
            y: ballYRef.current,
            scored,
            conceded,
        });

        ballElement.style.left = `${ballXRef.current}px`;
        ballElement.style.top = `${ballYRef.current}px`;
    };

    const resetBallPosition = () => {
        if (ballRef.current && tableRef.current) {
            ballXRef.current = tableRef.current.clientWidth / 2 - ballRef.current.offsetWidth / 2;
            ballYRef.current = tableRef.current.clientHeight / 2 - ballRef.current.offsetHeight / 2;
            speedXRef.current = 1.5;
            speedYRef.current = 1.5;
        }
    };

    return (
        <div id="table" ref={tableRef}>
            <div id="player1" ref={player1Ref}></div>
            <div id="line"></div>
            <div id="player2" ref={player2Ref}></div>
            <div id="ball" ref={ballRef}></div>
            <div id="scored">{scored}</div>
            <div id="conceded">{conceded}</div>
        </div>
    );
};

export default Game;
