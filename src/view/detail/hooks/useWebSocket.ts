import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocket_URL } from '../../../config';

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const connect = useCallback(() => {
    if (ws.current) return;

    ws.current = new WebSocket(WebSocket_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      sendMessage({ type: "init" })
    };

    ws.current.onmessage = (event) => {
      console.log('WebSocket conneonmessagected');
      const data = JSON.parse(event.data);
      console.log(JSON.parse(event.data));
      // if (data?.payload?.length > 0 && Array.isArray(data?.payload)) {
      //   setMessages(prev => [...prev, data?.payload]);
      //   console.log(data.payload);
      // }
      if (data?.type.includes('price_init') && data?.payload?.length > 0 && Array.isArray(data?.payload)) {
        setMessages(data?.payload);
      }
      else if (data?.type.includes('price_update') && data?.payload?.length > 0 && Array.isArray(data?.payload)) {
        setMessages(prev => [...prev, data?.payload]);
      }
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      ws.current = null;
      setTimeout(() => connect(), 3000);
    };
  }, []);

  const sendMessage = useCallback((msg: any) => {
    console.log(ws.current);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not connected');
    }
  }, []);

  const close = useCallback(() => {
    ws.current?.close();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      // close();
    };
  }, [connect, close]);

  return {
    connect,
    isConnected,
    messages,
    sendMessage,
    close,
  };
}
