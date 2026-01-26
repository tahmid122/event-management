"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

type ChatMessage = {
  id: string;
  clientId?: string;
  content: string;
  senderId: string;
  senderName?: string;
  isMe: boolean;
};

const WS_URL = "ws://10.0.20.216:5000";
const MY_USER_ID = "cmkupr0mn00008kuyyor21xru";

const genClientId = () =>
  "tmp_" + Date.now() + Math.random().toString(36).slice(2);

const ChatApp = () => {
  const token = Cookies.get("access_token");
  const socketRef = useRef<WebSocket | null>(null);
  const didInit = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const ws = new WebSocket(`${WS_URL}/?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type !== "MESSAGE") return;

      const msg = data.message;

      setMessages((prev) => {
        // 🔁 Replace optimistic message
        const index = prev.findIndex(
          (m) =>
            m.isMe && m.content === msg.content && m.senderId === msg.senderId,
        );

        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            id: msg.id,
            content: msg.content,
            senderId: msg.senderId,
            senderName: msg.sender?.name,
            isMe: true,
          };
          return updated;
        }

        // 📩 Message from other user
        return [
          ...prev,
          {
            id: msg.id,
            content: msg.content,
            senderId: msg.senderId,
            senderName: msg.sender?.name,
            isMe: msg.senderId === MY_USER_ID,
          },
        ];
      });
    };

    ws.onclose = () => setIsConnected(false);

    return () => ws.close();
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current) return;

    const clientId = genClientId();

    socketRef.current.send(
      JSON.stringify({
        type: "SEND_MESSAGE",
        receiverId: "vmH3pQL2t9F5FhbBwZ05WygK3Kmzj4o5",
        chatId: "cmkqq9xcg0000k0uy5e7u8wq7",
        message: input,
        clientId,
      }),
    );

    // ⚡ Optimistic
    setMessages((prev) => [
      ...prev,
      {
        id: clientId,
        clientId,
        content: input,
        senderId: MY_USER_ID,
        isMe: true,
      },
    ]);

    setInput("");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-xl mb-4">Chat {isConnected ? "🟢" : "🔴"}</h1>

      <div className="h-96 overflow-y-auto bg-gray-800 p-4 rounded mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-2 p-2 rounded max-w-xs ${
              m.isMe ? "ml-auto bg-blue-600" : "mr-auto bg-gray-700"
            }`}
          >
            {!m.isMe && (
              <div className="text-xs text-gray-300">{m.senderName}</div>
            )}
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded text-black"
        />
        <button className="bg-blue-600 px-4 rounded">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
