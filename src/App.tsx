import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { SystemConfigModal } from './components/SystemConfigModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Chat } from './types';
import { api } from './utils/api';

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  const loadChats = async () => {
    try {
      setLoading(true);
      const fetchedChats = await api.getChats();
      setChats(fetchedChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await api.createChat();
      setChats([newChat, ...chats]);
      setCurrentChat(newChat);
      setSidebarOpen(false);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleSelectChat = async (chat: Chat) => {
    try {
      const fullChat = await api.getChat(chat._id);
      setCurrentChat(fullChat);
      setSidebarOpen(false);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!currentChat) return;

    try {
      const response = await api.sendMessage(currentChat._id, message);
      
      // Update current chat with new messages
      const updatedMessages = [
        ...currentChat.messages,
        response.userMessage,
        response.aiMessage,
      ];

      const updatedChat = {
        ...currentChat,
        messages: updatedMessages,
        updatedAt: new Date(),
      };

      setCurrentChat(updatedChat);

      // Update chat in the list
      setChats(chats.map(chat => 
        chat._id === currentChat._id 
          ? { ...chat, updatedAt: new Date() }
          : chat
      ));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!confirm('Are you sure you want to delete this chat?')) return;

    try {
      await api.deleteChat(chatId);
      setChats(chats.filter(chat => chat._id !== chatId));
      
      if (currentChat?._id === chatId) {
        setCurrentChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleClearAllChats = async () => {
    if (!confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) return;

    try {
      await api.clearAllChats();
      setChats([]);
      setCurrentChat(null);
    } catch (error) {
      console.error('Error clearing all chats:', error);
    }
  };

  const handleSaveConfig = async (config: string) => {
    if (!currentChat) return;

    try {
      await api.updateChatConfig(currentChat._id, config);
      setCurrentChat({
        ...currentChat,
        systemConfig: config,
      });
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthForm 
        isLogin={isLogin} 
        onToggle={() => setIsLogin(!isLogin)} 
      />
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onClearAllChats={handleClearAllChats}
        onOpenSettings={() => setConfigModalOpen(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <ChatInterface
        chat={currentChat}
        onSendMessage={handleSendMessage}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        loading={loading}
      />

      <SystemConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        onSave={handleSaveConfig}
        currentConfig={currentChat?.systemConfig || ''}
        chat={currentChat}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;