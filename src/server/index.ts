import Socket from './Socket';
import Server from './Server';
import HotDev from './HotDev';
import * as path from 'path';

const socketPort = 8080;
const serverPort = 8081;
const webRoot = path.join(__dirname, '../../', './dist/client');

const webSocket = new Socket(socketPort);
webSocket.listen();

const httpServer = new Server(serverPort, webRoot);
httpServer.listen().then(() => webSocket.refreshAllClients());

new HotDev(webRoot, webSocket);
