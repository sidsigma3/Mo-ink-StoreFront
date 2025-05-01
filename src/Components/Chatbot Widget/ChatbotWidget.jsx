import React, { useState } from 'react';
import { RiRobot3Fill } from "react-icons/ri";

// const response = await fetch('http://localhost:8000/chat', {

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `question=${encodeURIComponent(userMessage.text)}`,
      });
      const data = await response.json();

      simulateTyping(data.answer || '🤖 No answer found');
    } catch (err) {
      setMessages((msgs) => [...msgs, { text: '⚠️ Error talking to bot', sender: 'bot' }]);
      setIsTyping(false);
    }
  };

  const simulateTyping = (text) => {
    let index = 0;
    const speed = 20;
    let currentText = '';

    const type = () => {
      if (index < text.length) {
        currentText += text[index++];
        setMessages((msgs) => [...msgs.slice(0, -1), { text: currentText, sender: 'bot' }]);
        setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    setMessages((msgs) => [...msgs, { text: '', sender: 'bot' }]);
    type();
  };

  return (
    <>
<button onClick={toggleChat} style={styles.chatButton}>
  <RiRobot3Fill   size={30} />
</button>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>Ask Ink n Dyes</div>
          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                ...styles.message,
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#F3E8FF' : '#eee',
              }}>{msg.text}</div>
            ))}
            {isTyping && <div style={styles.typing}>🤖 Assistant is typing...</div>}
          </div>
          <form onSubmit={handleSend} style={styles.form}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={styles.input}
              required
            />
            <button type="submit" style={styles.send}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};

const styles = {
  chatButton: {
    position: 'fixed', bottom: 24, right: 24, padding: '20px 20px', borderRadius: '50%', backgroundColor: '#5B21B6', color: 'white', border: 'none', fontSize: 24, cursor: 'pointer', zIndex: 1000,
  },
  chatWindow: {
    position: 'fixed', bottom: 100, right: 24, width: 350, maxHeight: 500, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,0.2)', overflow: 'hidden', zIndex: 1000,
  },
  header: {
    backgroundColor: '#5B21B6', color: 'white', padding: '12px 16px', fontWeight: 'bold'
  },
  messages: {
    flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto',
  },
  message: {
    padding: '10px 14px', borderRadius: 12, maxWidth: '75%', whiteSpace: 'pre-wrap' 
  },
  typing: {
    fontStyle: 'italic', color: '#666', fontSize: 14
  },
  form: {
    display: 'flex', borderTop: '1px solid #ddd'
  },
  input: {
    flex: 1, padding: 12, border: 'none', fontSize: 14, outline: 'none'
  },
  send: {
    padding: '12px 16px', backgroundColor: '#5B21B6', color: 'white', border: 'none', cursor: 'pointer'
  }
};

export default ChatbotWidget;
