"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    email: string;
  };
  isMe: boolean;
};

const WS_BASE_URL = "ws://10.0.20.216:5000";

const ChatApp = () => {
  const { id: TICKET_ID }: { id: string } = useParams();

  const user = useAppSelector(useCurrentUser);
  const MY_USER_ID = user?.id;

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const token = Cookies.get("access_token");

      if (!token || !TICKET_ID) {
        setIsLoadingMessages(false);
        return;
      }

      try {
        setIsLoadingMessages(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/${TICKET_ID}`,
          {
            credentials: "include",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          // Transform the fetched messages
          const transformedMessages = data.data.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt,
            sender: {
              id: msg.sender.id,
              email: msg.sender.email,
            },
            isMe: msg.sender.id === MY_USER_ID,
          }));

          setMessages(transformedMessages);
          console.log(
            "📥 Loaded",
            transformedMessages.length,
            "messages from server",
          );
        }
      } catch (err) {
        console.error("❌ Failed to fetch messages:", err);
        toast.error("Failed to load chat history");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [TICKET_ID, MY_USER_ID]);

  // WebSocket connection
  useEffect(() => {
    let isActive = true;

    const connect = () => {
      if (!isActive) {
        console.log("⏸️ Effect no longer active, skipping connection");
        return;
      }

      if (socketRef.current) {
        const state = socketRef.current.readyState;
        if (state === WebSocket.OPEN || state === WebSocket.CONNECTING) {
          console.log("⚠️ WebSocket already exists in state:", state);
          return;
        }
      }

      setConnectionError(null);

      const token = Cookies.get("access_token");

      if (!token) {
        console.error("❌ No auth token found");
        setConnectionError("Authentication required");
        toast.error("Authentication required - please log in");
        return;
      }

      const wsUrl = `${WS_BASE_URL}?token=${token}`;

      console.log("🔄 Connecting to WebSocket...");

      try {
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
          if (!isActive) return;
          console.log("✅ WebSocket connected successfully");
          setIsConnected(true);
          setConnectionError(null);
          toast.success("Connected to chat");
        };

        ws.onmessage = (event) => {
          if (!isActive) return;
          console.log("📩 Received message:", event.data);

          try {
            const data = JSON.parse(event.data);

            if (data.type === "MESSAGE" && data.message) {
              setMessages((prev) => {
                // Avoid duplicate messages
                const exists = prev.some((msg) => msg.id === data.message.id);
                if (exists) {
                  console.log(
                    "⚠️ Duplicate message, skipping:",
                    data.message.id,
                  );
                  return prev;
                }

                console.log("➕ Adding new message:", data.message);

                // Add new message
                const newMessage: ChatMessage = {
                  id: data.message.id,
                  content: data.message.content,
                  createdAt: data.message.createdAt,
                  sender: {
                    id: data.message.sender?.id || data.message.senderId,
                    email: data.message.sender?.email || "Unknown",
                  },
                  isMe:
                    data.message.senderId === MY_USER_ID ||
                    data.message.sender?.id === MY_USER_ID,
                };

                return [...prev, newMessage];
              });
            } else if (data.type === "ERROR") {
              console.error("❌ Server error:", data.message);
              setConnectionError(data.message);
              toast.error(data.message || "Server error occurred");
            } else {
              console.log("📦 Received unknown message type:", data);
            }
          } catch (err) {
            console.error("❌ WS parse error:", err, "Raw data:", event.data);
          }
        };

        ws.onerror = (err) => {
          if (!isActive) return;
          console.error("❌ WebSocket error:", err);
          setConnectionError("Connection error occurred");
        };

        ws.onclose = (e) => {
          if (!isActive) return;
          console.log(
            "🔌 WebSocket closed. Code:",
            e.code,
            "Reason:",
            e.reason,
          );
          setIsConnected(false);

          if (socketRef.current === ws) {
            socketRef.current = null;
          }

          if (isActive && e.code !== 1000 && e.code !== 1008) {
            console.log("🔄 Reconnecting in 3 seconds...");
            setConnectionError("Disconnected. Reconnecting...");
            reconnectTimeoutRef.current = setTimeout(connect, 3000);
          } else if (e.code === 1008) {
            setConnectionError("Authentication failed");
            toast.error("Authentication failed");
          }
        };
      } catch (err) {
        console.error("❌ Failed to create WebSocket:", err);
        setConnectionError("Failed to connect");
        toast.error("Failed to connect to chat server");
      }
    };

    console.log("🚀 Starting initial connection...");
    connect();

    return () => {
      console.log("🧹 Cleaning up WebSocket");
      isActive = false;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (socketRef.current) {
        const ws = socketRef.current;
        if (
          ws.readyState === WebSocket.OPEN ||
          ws.readyState === WebSocket.CONNECTING
        ) {
          ws.close(1000, "Component unmounting");
        }
        socketRef.current = null;
      }
    };
  }, [MY_USER_ID]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(TICKET_ID);
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      toast.error("Not connected to chat server");
      return;
    }

    if (!TICKET_ID) {
      toast.error("Invalid ticket ID");
      return;
    }

    const messageContent = input.trim();
    const payload = {
      type: "SEND_MESSAGE",
      ticketId: TICKET_ID,
      message: messageContent,
    };

    try {
      socketRef.current.send(JSON.stringify(payload));
      console.log("✅ Message sent successfully");

      // Clear input immediately
      setInput("");
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Format time to be more readable
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // If today, show time
    if (diffInHours < 24 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    // If yesterday
    if (diffInHours < 48 && date.getDate() === now.getDate() - 1) {
      return (
        "Yesterday " +
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }

    // Otherwise show date and time
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get sender name from email (first part before @)
  const getSenderName = (email: string) => {
    return email.split("@")[0];
  };

  return (
    <div
      className="flex flex-col fixed left-0 bottom-0   w-full"
      style={{
        minHeight: "calc(100vh - 70px)",
        maxHeight: "calc(100vh - 70px)",
      }}
    >
      {/* Header */}
      <div className="bg-black border-b border-slate-900 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              T
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Ticket #{TICKET_ID?.slice(-8)}
              </h1>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-gray-600">
                  {isConnected ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Error Banner */}
      {connectionError && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <p className="text-sm text-red-800">{connectionError}</p>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-black">
        {isLoadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">Loading messages...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No messages yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Start the conversation by sending a message
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg, index) => {
              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe && "justify-end"}`}
                >
                  {/* Message */}
                  <div
                    className={`flex items-end gap-2 ${
                      msg.isMe ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                        msg.isMe ? "items-end" : "items-start"
                      } flex flex-col gap-1`}
                    >
                      {/* Sender Name (only for other users) */}
                      {!msg.isMe && (
                        <span className="text-xs text-gray-600 px-3 font-medium">
                          {getSenderName(msg.sender?.email)}
                        </span>
                      )}

                      {/* Message Content */}
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.isMe
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-black text-gray-900 border border-slate-900 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm break-words whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <span
                        className={`text-xs text-gray-500 px-3 ${
                          msg.isMe ? "text-right" : "text-left"
                        }`}
                      >
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}

      <div className="bg-black w-full border-t border-slate-900 px-6 py-4 w-full border">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                disabled={!isConnected}
                placeholder={
                  isConnected
                    ? "Type a message... (Press Enter to send, Shift+Enter for new line)"
                    : "Connecting to chat..."
                }
                rows={1}
                className="w-full px-4 py-3 bg-black border border-slate-900 rounded-full text-whiter placeholder-gray-500 focus:outline-none focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none "
                style={{
                  minHeight: "48px",
                  maxHeight: "120px",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!isConnected || !input.trim()}
              className="bg-pinkish text-white p-3 rounded-full hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
