import { Server } from "socket.io";

let io;

export default function InitSocket(server) {

    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("socket connected");
    });

    return io;
};


export const getIo = () => io;