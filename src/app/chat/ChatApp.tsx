"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";

type ChatMessage = {
  id: string;
  content: string;
  senderId: string;
  senderName?: string;
  createdAt?: string;
  isMe: boolean;
};

const WS_URL = "ws://10.0.20.216:5000";
const AUTH_TOKEN = Cookies.get("access_token");

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).slice(2);

const ChatApp = () => {
  const user = useAppSelector(useCurrentUser);
  const MY_USER_ID = user?.id;
  const socketRef = useRef<WebSocket | null>(null);
  const didInitRef = useRef(false);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // 🔒 Prevent React 18 StrictMode double connect
    if (didInitRef.current) return;
    didInitRef.current = true;

    const ws = new WebSocket(`${WS_URL}/?token=${AUTH_TOKEN}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("📩 Received:", event.data);

      try {
        const data = JSON.parse(event.data);

        if (data.type === "MESSAGE" && data.message) {
          const msg = data.message;

          setMessages((prev) => [
            ...prev,
            {
              id: msg.id,
              content: msg.content,
              senderId: msg.senderId,
              senderName: msg.sender?.name,
              createdAt: msg.createdAt,
              isMe: msg.senderId === MY_USER_ID,
            },
          ]);
        }
      } catch (err) {
        console.error("❌ Message parse error:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    ws.onclose = (e) => {
      console.log("🔌 Socket closed:", e.code);
      setIsConnected(false);
      socketRef.current = null;
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN ||
      !input.trim()
    ) {
      return;
    }

    const payload = {
      type: "SEND_MESSAGE",
      receiverId: "cmkuztk1g0005h8uybi8wvuyo",
      chatId: "cmkqq9xcg0000k0uy5e7u8wq7",
      message: input.trim(),
    };

    socketRef.current.send(JSON.stringify(payload));
    console.log("📤 Sent:", payload);

    // ⚡ Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        content: input,
        senderId: MY_USER_ID,
        isMe: true,
      },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`w-3 h-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <h1 className="text-xl font-bold">
          Chat {isConnected ? "(Online)" : "(Offline)"}
        </h1>
      </div>

      <div className="h-96 overflow-y-auto bg-gray-800 rounded p-4 mb-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center italic">No messages yet…</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 max-w-xs p-2 rounded ${
              msg.isMe
                ? "ml-auto bg-blue-600 text-right"
                : "mr-auto bg-gray-700"
            }`}
          >
            {!msg.isMe && (
              <div className="text-xs text-gray-300 mb-1">
                {msg.senderName || "User"}
              </div>
            )}
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!isConnected}
          placeholder={isConnected ? "Type a message…" : "Connecting…"}
          className="flex-1 p-3 rounded text-whiter border border-slate-900"
        />
        <button
          type="submit"
          disabled={!isConnected}
          className="bg-blue-600 px-6 py-3 rounded font-semibold disabled:bg-gray-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
