// 'use client';

// import React, { useState } from 'react';

// interface ChatButtonProps {
//   sellerName: string;
// }

// export const ChatButton: React.FC<ChatButtonProps> = ({ sellerName }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would implement the actual message sending logic
//     alert(`Message sent to ${sellerName}: ${message}`);
//     setMessage('');
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition duration-200"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//         Chat with Seller
//       </button>

//       {/* Chat Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Message to {sellerName}</h3>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSendMessage} className="p-4">
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message here..."
//                 className="w-full h-32 p-3 border rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Message {
  chatId: string;
  senderId: string;
  content: string;
}

interface ChatProps {
  chatId: string;
  userId: string;
}

const socket = io();

const Chat: React.FC<ChatProps> = ({ chatId, userId }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  const sendMessage = async () => {
    const messageData: Message = { chatId, senderId: userId, content: message };

    socket.emit("sendMessage", messageData);

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

  return (
    <div className="p-4 border rounded-lg">
      <div className="h-64 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 ${
              msg.senderId === userId ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded ${
                msg.senderId === userId ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type your message"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
