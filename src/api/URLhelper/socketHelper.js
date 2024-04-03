import io from 'socket.io-client';

export const socket = io('http://192.168.1.24:3000');

socket.on('connect', () => {
  console.log('Socket Connected!!');
});

