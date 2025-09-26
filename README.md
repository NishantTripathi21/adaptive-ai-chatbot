# Adaptive AI Chatbot Platform

A full-stack, production-ready AI chatbot application built with modern web technologies. This project demonstrates advanced web development skills including real-time chat interfaces, user authentication, database management, and AI integration.



##  Project Overview

This is a comprehensive chatbot platform that allows users to interact with Google's Gemini AI through a beautiful, responsive web interface. The application supports multiple chat sessions, custom AI configurations, and persistent conversation history.

## ✨ Key Features

### 🔐 Authentication System
- **Secure User Registration & Login**: JWT-based authentication with bcrypt password hashing
- **Session Management**: Persistent login sessions with automatic token refresh
- **Protected Routes**: Secure API endpoints with middleware authentication

### 💬 Advanced Chat Interface
- **Real-time Messaging**: Instant message delivery with typing indicators
- **Multi-turn Conversations**: Maintains conversation context across messages
- **Message History**: Persistent storage of all conversations in MongoDB
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎯 System Configuration
- **Custom AI Modes**: Configure the AI for specific tasks (DSA Mentor, Code Reviewer, etc.)
- **Preset Configurations**: Quick-select from predefined AI personalities
- **Dynamic Behavior**: Switch between different AI modes within the same session
- **Context Preservation**: Maintains conversation flow when switching modes

### 📚 Chat Management
- **Multiple Chat Sessions**: Create and manage unlimited chat conversations
- **Chat History**: View all previous conversations with timestamps
- **Selective Deletion**: Remove specific chats or clear entire history
- **Search & Organization**: Easy navigation through chat history

### 🎨 User Experience
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Dark/Light Themes**: Consistent design language throughout the application
- **Mobile-First Design**: Responsive layout that works on all screen sizes
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠 Technical Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Tailwind CSS** for utility-first styling and responsive design
- **Lucide React** for consistent iconography
- **Context API** for global state management
- **Custom Hooks** for reusable logic and API interactions

### Backend
- **Node.js & Express** for RESTful API development
- **MongoDB & Mongoose** for document-based data storage
- **JWT Authentication** for secure user sessions
- **bcryptjs** for password hashing and security
- **CORS** for cross-origin resource sharing

### AI Integration
- **Google Gemini AI** (gemini-2.5-flash model) for natural language processing
- **Multi-turn Conversation** support with context preservation
- **System Instructions** for customizable AI behavior
- **Error Handling** for robust AI response management

### Development Tools
- **Vite** for fast development and optimized builds
- **ESLint & TypeScript** for code quality and type safety
- **Concurrently** for running multiple development servers
- **Environment Variables** for secure configuration management

## Architecture & Design Patterns

### Frontend Architecture
- **Component-Based Design**: Modular, reusable React components
- **Custom Hooks**: Separation of concerns with reusable logic
- **Context Providers**: Centralized state management for authentication
- **TypeScript Interfaces**: Strong typing for data models and API responses

### Backend Architecture
- **RESTful API Design**: Clean, predictable endpoint structure
- **Middleware Pattern**: Authentication, CORS, and error handling
- **Schema Validation**: Mongoose schemas for data integrity
- **Error Handling**: Comprehensive error responses and logging

### Database Design
- **User Management**: Secure user profiles with encrypted passwords
- **Chat Sessions**: Hierarchical chat organization with metadata
- **Message Storage**: Efficient message storage with timestamps
- **Indexing**: Optimized queries for chat history retrieval

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication

### Chat Management
- `GET /api/chats` - Retrieve user's chat history
- `POST /api/chats` - Create new chat session
- `GET /api/chats/:id` - Get specific chat with messages
- `DELETE /api/chats/:id` - Delete specific chat
- `DELETE /api/chats` - Clear all chat history

### Messaging
- `POST /api/chats/:id/messages` - Send message and get AI response
- `PATCH /api/chats/:id/config` - Update chat system configuration

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google AI API key

### Installation
```bash
# Clone the repository
git clone https://github.com/NishantTripathi21/adaptive-ai-chatbot
cd adaptive-ai-chatbot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development servers
npm run dev:full
```

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/chatbot
JWT_SECRET=your-jwt-secret-key
GEMINI_API_KEY=your-google-ai-api-key
PORT=5000
```

## 📱 Features Showcase

### Smart System Configuration
Users can customize the AI's behavior for specific use cases:
- **DSA Mentor**: Helps with data structures and algorithms
- **Code Reviewer**: Analyzes code for best practices and improvements
- **Interview Coach**: Prepares users for technical interviews
- **Creative Writer**: Assists with creative writing and brainstorming

### Responsive Chat Interface
- Message bubbles with user/AI distinction
- Timestamp display for all messages
- Typing indicators during AI response generation
- Smooth scrolling and message animations

### Comprehensive Chat Management
- Sidebar navigation with chat list
- Quick chat creation and deletion
- Bulk operations for chat history management
- Search and filter capabilities
