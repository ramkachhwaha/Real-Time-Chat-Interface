import { Server } from "socket.io";
import messageModel from "../models/message.model.js";

let io;

export default function InitSocket(server) {

    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {

        console.log(socket.id + " socket connected");

        // user join room
        socket.on("join", (userId) => {
            socket.join(userId)
        });

        // join chat room
        socket.on("chatroom", (chatId) => {
            socket.join(chatId)
        });

        // typing indicator
        socket.on("typing", (chatId) => {
            socket.to(chatId).emit("typing");
        });

        socket.on("stopTyping", (chatId) => {
            socket.to(chatId).emit("stopTyping");
        });

        socket.on("messageDelivered", async ({ messageId, userId, chatId }) => {
            await messageModel.findByIdAndUpdate(messageId, {
                $addToSet: { delivered: true, seen: { $push: userId } },
            });

            socket.to(chatId).emit("deliverd", { messageId, userId, chatId ,message : "delivered"})
        });
    });


    io.on("disconnect", (reson) => {
        console.log(reson + " server socket disconnected");
    })

    return io;
};


export const getIo = () => io;