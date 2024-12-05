// socket.js
import { io } from 'socket.io-client';

const socket = io('https://chat-app-server-7yxy.onrender.com'); // Adjust the URL to your server

export default socket;