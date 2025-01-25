import { useState, useEffect, useCallback } from 'react';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Auto-detect protocol and connect
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const ws = new WebSocket(`${protocol}${window.location.host}:8080`);

    ws.onopen = () => {
      setConnected(true);
      console.log('Connected to WebSocket');

      // Subscribe to channels
      ws.send(JSON.stringify({
        type: 'subscribe',
        channel: 'chat'
      }));
      
      ws.send(JSON.stringify({
        type: 'subscribe',
        channel: 'notifications'
      }));
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('Disconnected from WebSocket');
      
      // Try to reconnect after 5 seconds
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        setSocket(null);
      }, 5000);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = useCallback((channel, message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'publish',
        channel,
        message
      }));
    }
  }, [socket]);

  return { connected, messages, sendMessage };
};

export default useWebSocket;
