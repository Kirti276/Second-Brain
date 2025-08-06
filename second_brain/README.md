# 🧠 Second Brain - Personal Knowledge Management API

A **personal knowledge management system** built with Node.js, Express, and MongoDB that allows users to organize, store, and share their digital content and resources.

## 📖 What is Second Brain?

Second Brain is a RESTful API that serves as your digital memory bank - a place to store, organize, and share important links, articles, videos, and other content you want to remember and reference later. Think of it as your personal digital library where you can curate and organize all the valuable information you come across.

## ✨ Key Features

- **🔐 User Authentication**: Secure signup/signin with JWT tokens and bcrypt password hashing
- **📚 Content Management**: Add, view, and delete your saved content with titles, links, and types
- **🏷️ Content Organization**: Categorize content by type and add tags for better organization
- **🔗 Sharing Capability**: Generate shareable links to make your knowledge public
- **👥 User Profiles**: Each user has their own private knowledge base
- **🔒 Secure**: Password hashing, JWT authentication, and user-specific data isolation
- **📱 RESTful API**: Clean, intuitive API endpoints for easy integration

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Validation**: Zod for request validation
- **Language**: TypeScript for type safety
- **CORS**: Enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd second_brain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   Or for development:
   ```bash
   npm run dev
   ```

The API will be running on `http://localhost:5000`



## 📚 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/v1/signup
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

#### Sign In
```http
POST /api/v1/signin
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

### Content Management Endpoints

#### Add Content
```http
POST /api/v1/content
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Article Title",
  "link": "https://example.com/article",
  "type": "article"
}
```

#### Get User's Content
```http
GET /api/v1/content
Authorization: Bearer <your_jwt_token>
```

#### Delete Content
```http
DELETE /api/v1/content
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "contentId": "content_id_here"
}
```

### Sharing Endpoints

#### Enable/Disable Sharing
```http
POST /api/v1/brain/share
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "share": true  // or false to disable sharing
}
```

#### Access Shared Knowledge Base
```http
GET /api/v1/brain/:shareLink
```

## 💡 Use Cases

- **Students**: Save research papers, study materials, and educational resources
- **Professionals**: Organize work-related articles, tools, and references
- **Researchers**: Collect and categorize academic papers and findings
- **Content Creators**: Store inspiration, references, and resources
- **Anyone**: Build a personal digital library of valuable information

## 🔧 Development

### Project Structure
```
src/
├── index.ts          # Main application file with all routes
├── db.ts            # Database models and connection
├── middleware.ts    # Authentication middleware
├── utils.ts         # Utility functions
└── config.ts        # Configuration constants
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Build and start the development server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with Express.js and MongoDB
- Authentication powered by JWT and bcrypt
- Type safety provided by TypeScript
- Validation handled by Zod

---

**Transform your scattered bookmarks into an organized, searchable knowledge base with Second Brain!** 🧠✨

*Built with ❤️ using Node.js, Express, and MongoDB* 