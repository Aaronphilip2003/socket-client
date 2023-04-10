import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("ws://localhost:8000");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

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

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        placeholder="message"
        value={inputText}
        onChange={handleInputTextChange}
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
}

export default App;
