import http from "http";
import SocketService from "./services/scoket";
async function init() {
  const socketService = new SocketService();
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 8000;
  socketService.io.attach(httpServer);
  httpServer.listen(PORT, () => {
    console.log(`Http server is running at ${PORT}`);
  });

  socketService.initListeners();
}

init();
