import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./style.css";

// const socket = io("ws://localhost:8000");
const socket = io("http://192.168.251.222:8000");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    socket.on("message", (text) => {
      setMessages([...messages, text]);
    });
  }, [messages]);

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    socket.emit("message", inputText);
    setInputText("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameClick = () => {
    socket.emit("login", name);
  };

  return (
    <div class="chat-container">
      <div class="chat-box">
        <ul class="chat-messages">
          {messages.map((message, index) => (
            <li key={index} class="chat-message">
              {message}
            </li>
          ))}
        </ul>

        <div class="chat-input">
          <input
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={handleNameChange}
          />
          <button onClick={handleNameClick}>Login</button>
        </div>

        <div class="chat-input">
          <input
            type="text"
            placeholder="Enter message"
            value={inputText}
            onChange={handleInputTextChange}
          />
          <button onClick={handleSendClick}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
