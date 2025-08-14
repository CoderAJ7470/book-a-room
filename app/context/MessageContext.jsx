'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = ({ content, type = 'info', duration = 5000 }) => {
    const messageObj = { content, type, duration };
    setMessage(messageObj);
    sessionStorage.setItem('appMessage', JSON.stringify(messageObj));

    setTimeout(() => {
      setMessage(null);
      sessionStorage.removeItem('appMessage');
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
