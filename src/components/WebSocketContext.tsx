import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WebSocket_URL } from '../config';
import { getQueryParam } from '../utils/getUrlParamsLegacy';
import { use } from 'i18next';
import { wsBus } from '../utils/wsBus';

type Message = any;  

type WebSocketContextType = {
  isConnected: boolean;
  messages: Message[];
  thisConnect: string;
  setMessages: (msg: any) => void;
  connect: () => void;
  sendMessage: (msg: any) => void;
  close: () => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [thisConnect, setThisConnect]: any = useState();
  const [thisAddress, setThisAddress] = useState(getQueryParam("address"))

  const sendMessage = (msg: any) => {
    setThisConnect(msg?.payload)
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
    } else {
      console.warn('[WebSocket] Not connected');
    }
  };

  const connect = () => {
    if (ws.current) return;

    ws.current = new WebSocket(WebSocket_URL);

    ws.current.onopen = () => {
      console.log('[WebSocket] connected');
      sendMessage({ type: 'init' }); 
      if (thisConnect) {
        setTimeout(() => {
          sendMessage({ type: "subscribe", payload: `${thisConnect}` })
        }, 600)
      }  
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {  
      if (event?.data === "p") {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send('o');
        }
        return
      }

      const data = JSON.parse(event?.data); 
      if (data?.id && (data?.id).includes(getQueryParam("address"))) {
        if (data?.type?.includes('price_init') && Array.isArray(data?.payload) && data?.payload?.length > 0) {
          setMessages(data.payload);
        }
        else if (data?.type?.includes('price_update') && Array.isArray(data?.payload) && data?.payload?.length > 0) {
          let _payload = data.payload
          if (_payload.length === 1) {
            _payload[0].isUP = true
          }
          setMessages((prev) => {
            if (prev.length === 0) return _payload;
            return [...prev.slice(0, -1), _payload];
          });
        } else if (data?.type?.includes('price_append') && Array.isArray(data?.payload) && data?.payload?.length > 0) {
          setMessages((prev) => [...prev, data.payload]);
        }
      }
    };

    ws.current.onerror = (err) => {
      console.error('[WebSocket] error:', err);
    };

    ws.current.onclose = () => {
      console.log('[WebSocket] disconnected');
      setIsConnected(false);
      ws.current = null;
      setTimeout(() => connect(), 3000); 
    };
  };


  const close = () => {
    ws.current?.close();
    ws.current = null;
    setIsConnected(false);
  };

  useEffect(() => {
    return () => close();
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, messages, connect, sendMessage, setMessages, close, thisConnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error('useWebSocket must be used inside WebSocketProvider');
  return ctx;
};
