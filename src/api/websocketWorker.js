// import useWebSocket from 'react-native-use-websocket';


const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
const webSocket = new useWebSocket(socketUrl);

webSocket.onopen = () => {
  // WebSocket connection opened
  console.log("Websocket Opened :: ");
};

webSocket.onmessage = event => {
  // Data received from WebSocket
  self.postMessage(JSON.parse(event.data));
};


export default webSocket;