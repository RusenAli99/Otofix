import React, { useState } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Merhaba! Aracınızdaki sorunu detaylıca yazın, size yardımcı olayım.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/api/faults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = {
        sender: 'bot',
        text: data.reply || 'Bir hata oluştu. Lütfen tekrar deneyin.'
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Hata:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Sunucuya bağlanılamadı.'
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🧠 OtoFix Chatbot</div>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Arıza yazın..."
        />
        <button onClick={handleSend}>Gönder</button>
      </div>
    </div>
  );
}

export default ChatBot;
