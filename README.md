# SecureVault – Audit-Log Driven Expense Manager

SecureVault is a full-stack MERN application designed with a focus on security and financial traceability. It implements robust authentication and an immutable audit trail that logs every transaction modification.

## Features
- **Secure Authentication**: JWT-based login and registration with bcrypt password hashing.
- **Financial Dashboard**: Interactive UI displaying income, expenses, and current balance.
- **Transaction Vault**: Securely add and delete transactions with access control.
- **Audit Logging**: Every transaction creation or deletion is recorded with timestamp, action type, amount, and source IP.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Architecture**: RESTful API with strict JWT middleware protection.

## Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

## Installation & Setup

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Setup Environment Variables:
   Create a `.env` file in the `backend/` directory or use the provided `.env.example`:
   ```env
   MONGO_URI=mongodb://localhost:27017/securevault
   JWT_SECRET=supersecretjwtkey123!
   PORT=5000
   ```
4. Start the backend server: `node server.js`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Wait for the installation to finish, then start the Vite development server: `npm run dev`

### 3. Usage
Open `http://localhost:5173` in your browser. Register a new user, log in, add some transactions, and view the Audit Logs to see the immutable trail of actions.
