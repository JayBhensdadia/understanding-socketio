import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected!!!");
});

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMsg, setCurrentMsg] = useState("");

  const [room, setRoom] = useState("");

  socket.on("recieve-message", (msg) => {
    setMessages([...messages, msg]);
  });

  return (
    <div>
      <p>messages:</p>
      <div>
        {messages.map((msg) => {
          return <p>{msg}</p>;
        })}
      </div>
      <div>
        <input type="text" onChange={(e) => setCurrentMsg(e.target.value)} />
        <input type="text" onChange={(e) => setRoom(e.target.value)} />
        <button
          onClick={() => {
            socket.emit("send-message", currentMsg, room);
          }}
        >
          send
        </button>

        <button
          onClick={() => {
            socket.emit("join-room", room);
          }}
        >
          join
        </button>
      </div>
    </div>
  );
};

export default App;
