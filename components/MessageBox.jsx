'use client';

import { useMessage } from '@/app/context/MessageContext';

import '@/assets/styles/messageBox.css';
import { useEffect, useState } from 'react';

export default function MessageBox() {
  const [isVisible, setIsVisible] = useState(false);
  const { message } = useMessage();

  /**
   * This useEffect needs to be called before the if check
   * below. This is because React does not like calling hooks
   * after a conditional statement. Calling this hook after that if statement
   * will result in the following error: "React has detected a change in the
   * order of hooks called by (forgot which component calls this, but some
   * component - most likely it will be this MessageBox component). This will
   * lead to bugs and errors if not fixed."
   */
  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const fadeOutTimeout = setTimeout(() => {
        setIsVisible(false);
      }, (message.duration || 3000) - 500);

      return () => clearTimeout(fadeOutTimeout);
    }
  }, [message]);

  if (!message) return null;

  const messageType = message.type;

  return (
    <div
      className={`message-container ${
        isVisible ? 'showing' : ''
      } ${messageType}`}
    >
      {message.content}
    </div>
  );
}
