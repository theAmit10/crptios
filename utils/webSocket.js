import {setMarketData} from '../store/cryptoSlice';

const binanceWebSocket = new WebSocket(
  'wss://stream.binance.com:9443/ws/btcusdt@trade',
);

binanceWebSocket.onopen = () => {
  console.log('WebSocket connection opened successfully.');
};

binanceWebSocket.onmessage = event => {
  const data = JSON.parse(event.data);
  console.log('Received data:', data);
  setMarketData(data);
};

binanceWebSocket.onclose = event => {
  console.log('WebSocket connection closed:', event);
};

export default binanceWebSocket;
