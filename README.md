# TechKnow

A full-stack web application built with React.js and Node.js that helps users share and manage technical knowledge.

## Project Structure

- `client/` - React.js frontend application
- `server/` - Node.js backend server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/2004pranay/Hackathon.git
cd techknow
```

2. Install Server Dependencies
```bash
cd server
npm install
```

3. Install Client Dependencies
```bash
cd ../client
npm install
```

4. Configure Environment Variables
Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1. Start the Backend Server
```bash
cd server
npm start
```

2. Start the Frontend Development Server
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000` and the API server will run on `http://localhost:5000`.

## Features

- User authentication and authorization
- Interactive dashboard interface
- Modern and responsive design
- RESTful API backend

## Tech Stack

### Frontend
- React.js (^18.2.0)
- Material UI components and icons (^5.15.14)
- Redux Toolkit for state management (^2.2.2)
- React Router for navigation (^6.22.3)
- Axios for HTTP requests (^1.6.8)
- Styled Components for styling (^6.1.8)
- Date handling with date-fns (^3.6.0) and dayjs (^1.11.10)
- Charts and data visualization (@mui/x-charts ^7.0.0)

### Backend
- Node.js with Express.js (^4.19.1)
- MongoDB with Mongoose (^8.2.3)
- JWT Authentication (jsonwebtoken ^9.0.2)
- bcrypt for password hashing (^5.1.1)
- CORS support (^2.8.5)
- dotenv for environment variables (^16.4.5)

### Development Tools
- nodemon for hot-reloading (^3.1.9)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
