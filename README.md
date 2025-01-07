# library-management-system-backend

# Library Management System - Backend

This is the **backend** of the Library Management System, built with Node.js and Express.js. It provides RESTful APIs for handling user authentication, book management, transactions (borrowing and returning books), and admin functionalities.

## Features

- **Authentication**: JWT-based secure authentication.
- **Book Management**: Add, update, delete, and view books.
- **Borrow and Return Books**: APIs to allow users to borrow and return books.
- **Transaction Logs**: Tracks borrowing and returning activities.
- **Admin Privileges**: APIs for admin-only operations.

## Tech Stack

- **Node.js**: Runtime environment for JavaScript.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT**: Token-based authentication.
- **dotenv**: Environment variable management.
- **Nodemon**: Development server with live-reloading.

## Prerequisites

Before running the server, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) (v7+)
- [MongoDB](https://www.mongodb.com/) (local installation or a cloud database like MongoDB Atlas)

## Installation and Setup

Follow these steps to set up the server locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/library-management-server.git
   cd library-management-server

2. Install Dependencies Install all the required npm packages using:
    ```bash
    npm install
    
3. Set Environment Variables Create a .env file in the root directory and add the following configuration:
    ```env
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/libraryDB
    JWT_SECRET=your_jwt_secret

4. Start the Server Start the server using:
   ```bash
    npm start
   
  For development with live-reloading:
  ```bash
  npm run dev

5. Test API Endpoints Use tools like Postman or cURL to test the API at http://localhost:4000/api/v1.

# Demo For Library Management System
    [Demo Video on Youtube](https://youtu.be/TRPVZrmCj6o)