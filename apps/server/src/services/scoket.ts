import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis();
const sub = new Redis();
class SocketService {
  private _io: Server;

  constructor() {
    console.log("Server init");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }
  public initListeners() {
    console.log("Init socket listners");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("New user connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        // publish this message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
