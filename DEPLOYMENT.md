# Deployment Guide


## Deployment Options

### 1. Frontend Deployment (Current)
The frontend is currently deployed on Bolt Hosting, providing a static version of the application for demonstration purposes.

**Features Available in Demo:**
- Complete UI/UX showcase
- All component interactions
- Responsive design demonstration
- Form validation and error handling

**Note**: The demo version shows the frontend interface without backend connectivity. For full functionality, follow the local setup instructions below.

### 2. Full-Stack Local Deployment

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or cloud service)
- Google AI API key

#### Setup Instructions

1. **Clone and Install**
```bash
git clone [repository-url]
cd adaptive-ai-chatbot
npm install
```

2. **Environment Configuration**
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/chatbot

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# AI Integration
GEMINI_API_KEY=your-google-ai-api-key

# Server
PORT=5000
```

3. **Database Setup**
- Install MongoDB locally or use MongoDB Atlas
- Ensure MongoDB is running on the specified URI
- The application will automatically create necessary collections

4. **Start Development Servers**
```bash
# Start both frontend and backend
npm run dev:full

# Or start individually
npm run server  # Backend only
npm run dev     # Frontend only
```

5. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 10. Troubleshooting

#### Common Issues
1. **MongoDB Connection Error**
   - Check MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **API Key Issues**
   - Verify Google AI API key is valid
   - Check API quotas and limits
   - Ensure proper environment variable setup

3. **CORS Errors**
   - Update CORS configuration in server
   - Check frontend URL in environment variables

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set
