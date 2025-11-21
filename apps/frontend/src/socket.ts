import { io } from "socket.io-client";

const sessionId = crypto.randomUUID();

export const socket = io("http://localhost:4000", {
  query: { sessionId }
});
