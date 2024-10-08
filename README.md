# Teebay

This project is a full-stack web application with an Express backend, Prisma ORM, and a React frontend.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (or another database compatible with Prisma)

## Setup Instructions

### 1. Clone the Repository

### 2. Set Up the Backend

- #### Install Dependencies
- - Navigate to the server directory and install the required dependencies:
  - cd backend
  - npm install

-  #### Set Up the Database
  - Create a new PostgreSQL database
    - In your .env file, set your DATABASE_URL:
      -- DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

- #### Run Database Migrations
  - Generate and run the Prisma migrations to set up your database schema:
    -npx prisma migrate dev

- #### Start the Backend Server
  - npm start
  - The backend server should now be running on http://localhost:5000.

### 3. Set Up the FrontEnd
  - #### Install Dependencies
    - Navigate to the client directory and install the required dependencies:
    - cd client
    - npm install
      
  - #### Start the Frontend Development Server
   - npm start
     
### 4. Running the Application

  -Backend: http://localhost:5000
  -Frontend: http://localhost:3000


## A Video Showing the demonsstration:


https://github.com/user-attachments/assets/905263ca-1589-419b-a149-a0b7da7e384a


