import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_URL || "localhost:3333");
socket.on("connect", () => {
    console.log("connected")
    const engine = socket.io.engine;
    engine.once('upgrade', () => console.log(engine.transport.name))
});
socket.on("disconnect", () => console.log("disconnected"));