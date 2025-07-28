import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);

  const openChat = (ticketId) => {
    setActiveChat(ticketId);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  return (
    <ChatContext.Provider value={{ activeChat, openChat, closeChat }}>
      {children}
      {activeChat && !window.location.pathname.includes('/disputes') && (
        <ChatUI ticketId={activeChat} onClose={closeChat} />
      )}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);