import React, { useRef } from 'react';
import io from 'socket.io-client';
import './join.css';

export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = io('https://quickconnect-server-production.up.railway.app', {
      transports: ['websocket'],
    });
    socket.emit('set_username', username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div className="join-container">
      <h1>Bem-vindo ao Quick Connect</h1>
      <input type="text" ref={usernameRef} placeholder="Digite seu nome de usuário" />
      <button onClick={handleSubmit}>Entrar no Chat</button>
    </div>
  );
}
