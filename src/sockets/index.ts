import { Server } from "socket.io";

export default function initSocketServer(httpServer: any) {
    const socketServer = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    socketServer.on("connection", async (socket) => {
        console.log("Total connections", (await socketServer.fetchSockets()).length);

        socket.on("room", async (room) => {
            socket.join(room.toLowerCase());
            socket.emit("joined_room", room.toLowerCase());

            const sockets = await socketServer.in(room.toLowerCase()).fetchSockets();
            socketServer.in(room).emit("population_change", sockets.length);
        });

        socket.on("message", async (data) => {
            socketServer.in(data.room).emit("receive_message", data);
        });

        socket.on("disconnecting", async (reason) => {
            for (const room of socket.rooms) {
                if (room !== socket.id) {
                    const sockets = await socketServer.in(room.toLowerCase()).fetchSockets();
                    socketServer.in(room).emit("population_change", sockets.length - 1);
                }
            }
            console.log("A user disconnected!", reason);
        })
    });
}