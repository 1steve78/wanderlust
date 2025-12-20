# 🌍 WanderLust

WanderLust is a full-stack travel stay listing platform that allows users to explore, create, and manage property listings.  
This project focuses on real-world backend development concepts such as authentication, authorization, image handling, and deployment.

---

## 🚀 Features

- User authentication and authorization using Passport.js  
- Create, edit, and delete property listings  
- Upload and manage images using Cloudinary  
- Secure session-based authentication  
- Server-side rendering with EJS templates  
- RESTful routing and MVC architecture  

---

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Frontend**
- EJS Templates
- CSS / Bootstrap

**Authentication**
- Passport.js
- Express-Session

**Media Storage**
- Cloudinary

**Deployment**
- Render

---

## 📂 Project 

wanderlust/
│
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── controllers/ # Application logic
├── views/ # EJS templates
├── public/ # Static assets (CSS, JS)
├── utils/ # Helper utilities
├── app.js # Main server file
└── .env # Environment variables


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

PORT=8080
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret


---

## 🧑‍💻 Run Locally

### 1. Clone the repository

git clone https://github.com/1steve78/wanderlust
cd wanderlust


### 3. Start MongoDB
Ensure MongoDB is running locally or your MongoDB Atlas connection is active.

### 4. Start the server

### 5. Open in browser
http://localhost:8080


---

## 🔐 Authentication

- Passport.js handles login and signup
- Sessions are managed using Express-Session
- Protected routes ensure only authorized users can modify listings

---

## ☁️ Image Uploads

- Images are uploaded via forms
- Stored securely on Cloudinary
- Image URLs are saved in MongoDB

---

## 📌 Learning Outcomes

- Backend architecture using Express and MongoDB  
- Authentication and authorization workflows  
- Cloud-based image storage  
- MVC design pattern  
- Deployment and environment configuration  

---

## 🔮 Future Enhancements

- Search and filter listings  
- Reviews and ratings system  
- Map integration  
- Pagination and performance optimization  

---

## 📜 License

This project is built for learning and portfolio purposes.


