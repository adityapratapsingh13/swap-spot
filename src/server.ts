// const { createServer } = require("http");
// import { parse } from "url";

// const next = require("next");
// const socketIo = require("socket.io");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = socketIo(server);

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     socket.on("joinChat", (chatId) => {
//       socket.join(chatId);
//       console.log(`User joined chat: ${chatId}`);
//     });

//     socket.on("sendMessage", (message) => {
//       io.to(message.chatId).emit("receiveMessage", message);
//       // You can also save the message to your database here
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });
