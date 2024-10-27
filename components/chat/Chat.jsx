import React, { useRef, useEffect, useState } from 'react';
import './chat.css';

export default function Chat({ socket }) {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;
    socket.emit('message', message);
    clearInput();
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Quick Connect</div>

      <div className="chat-messages">
        {messageList.map((message, index) => (
          <div
            key={index}
            className={`message ${message.author === 'Você' ? 'sent' : 'received'}`}
          >
            <span>
              <strong>{message.author}:</strong> {message.text}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input ref={messageRef} type="text" placeholder="Digite sua mensagem" />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
}
