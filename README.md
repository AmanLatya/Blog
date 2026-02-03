# Blog / Article Backend System

This project is a simple Blog / Article platform built as a backend assignment.  
It supports user authentication, role-based access, blog posts, and comments.

The goal of this project is to demonstrate backend concepts like authentication, authorization, database relationships, and API integration with a basic frontend.

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)

**Frontend**
- React (Vite)
- Axios

---

## Features

### Authentication
- User Registration
- User Login
- JWT based authentication

### User Roles
- **Reader**: Can view published blog posts
- **Writer**: Can create, update, and delete their own posts
- **Admin**: Can manage all posts and comments

### Blog Posts
- Create blog posts with title, content, tags
- Draft and Published status
- Only published posts are visible publicly
- Pagination and search supported

### Comments
- Authenticated users can comment on published posts
- Users can delete only their own comments
- Admin can delete any comment

### Frontend
- Simple React frontend
- Displays list of published blog posts
- Uses Axios to fetch data from backend API

---

## Database Schema

- **Users**
- **Posts**
- **Comments**

Relationships:
- One user can have multiple posts
- One post can have multiple comments

---


---

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/AmanLatya/Blog.git
### 2. Backend Setup
cd backend
npm install
npm run dev

Create a `.env` file:
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_secret
### 3. Frontend Setup
cd frontend
npm install
npm run dev

---

## API Endpoints (Basic)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Posts
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

### Comments
- `POST /api/comments`
- `DELETE /api/comments/:id`

---

## Notes
- This project focuses on backend logic and API functionality.
- UI is kept minimal as per assignment requirements.
- Proper role-based access control is implemented.

---

## Author
Aman

