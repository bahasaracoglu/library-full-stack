# Library Full Stack Application

This is a full-stack library application with separate frontend and backend directories.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (https://nodejs.org/)
- MySQL (https://www.mysql.com/)

### Installation

1. Clone the repository to your local machine.

```bash
git clone <your-repository-url>
cd library-full-stack
```

2. Install dependencies for both frontend and backend.

```bash
# Navigate to the backend directory and install dependencies
cd backend
npm install

# Navigate to the frontend directory and install dependencies
cd ../frontend
npm install
```

### Database Setup

1. Create a `library` database using MySQL CLI or a MySQL interface (phpMyAdmin, MySQL Workbench, etc.).

```sql
CREATE DATABASE library;
```

2. Navigate to the backend directory and run the following commands to set up the database and start the server.

```bash
cd ../backend
npm run resetdb
npm run server
```

### Running the Application

1. Navigate to the frontend directory and start the frontend server.

```bash
cd ../frontend
npm start
```

### Login

You can log in using the following credentials:

- **Kullanıcı Adı:** Baha Saraçoğlu

---
````
