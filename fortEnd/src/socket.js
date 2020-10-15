/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-10-15 12:46:15
 * @LastEditTime: 2020-10-15 14:05:30
 */
import io from 'socket.io-client';
const socket = io('http://127.0.0.1:3000', { transports: ['websocket'] });

export default socket;