// "use client";

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// interface Message {
//   chatId: string;
//   senderId: string;
//   content: string;
// }

// interface ChatProps {
//   chatId: string;
//   userId: string;
// }

// const socket = io();

// const Chat: React.FC<ChatProps> = ({ chatId, userId }) => {
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socket.emit("joinChat", chatId);

//     socket.on("receiveMessage", (newMessage: Message) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [chatId]);

//   const sendMessage = async () => {
//     const messageData: Message = { chatId, senderId: userId, content: message };

//     socket.emit("sendMessage", messageData);

//     await fetch("/api/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(messageData),
//     });

//     setMessages((prevMessages) => [...prevMessages, messageData]);
//     setMessage("");
//   };

//   return (
//     <div className="p-4 border rounded-lg">
//       <div className="h-64 overflow-y-scroll mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`my-2 ${
//               msg.senderId === userId ? "text-right" : "text-left"
//             }`}
//           >
//             <p
//               className={`inline-block p-2 rounded ${
//                 msg.senderId === userId ? "bg-blue-100" : "bg-gray-200"
//               }`}
//             >
//               {msg.content}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="border p-2 flex-grow"
//           placeholder="Type your message"
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { Send, Smile, Paperclip } from "lucide-react";

interface Message {
  chatId: string;
  senderId: string;
  content: string;
  timestamp: number;
}

interface ChatProps {
  chatId: string;
  userId: string;
  sellerName: string;
}

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
const socket = socketUrl ? io(socketUrl) : null;

export default function Chat({ chatId, userId, sellerName }: ChatProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const introductoryMessage: Message = {
      chatId,
      senderId: "seller",
      content: `Hello! Here are my details:\n\n- Name: ${sellerName}\n- Phone: +123-456-7890\n- Product: Sample Product\n- Price: $99.99`,
      timestamp: Date.now(),
    };

    setMessages([introductoryMessage]);

    if (!socket) {
      return;
    }

    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [chatId, sellerName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData: Message = {
      chatId,
      senderId: userId,
      content: message,
      timestamp: Date.now(),
    };

    socket?.emit("sendMessage", messageData);

    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <h2 className="text-xl font-semibold">Chat with {sellerName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  msg.senderId === userId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 opacity-75">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button className="text-gray-500 hover:text-gray-700">
            <Smile className="w-5 h-5" />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
