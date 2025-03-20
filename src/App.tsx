import React, { useState } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #282c34;
  color: white;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 24px;
  background-color: #61dafb;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  margin: 20px;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

const Score = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const App: React.FC = () => {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore((prev: number) => prev + 1);
  };

  return (
    <GameContainer>
      <Score>Счёт: {score}</Score>
      <Button onClick={handleClick}>Кликни меня!</Button>
    </GameContainer>
  );
};

export default App; 