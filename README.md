# Auth Microservice

This microservice handles user authentication and management for the Aluminum E-commerce platform.
It provides APIs for:
```bash
✅ User Registration & Login
✅ JWT Authentication
✅ Role-based Access Control
✅ Profile Management (including image upload with Cloudinary)
✅ User Management (Admin only)
```

## 📂 Project Structure
```bash
auth-micro-/
├── config/
│   ├── cloudinary.js        # Cloudinary configuration
│   ├── db.js                # MongoDB connection
│   ├── jwt.js               # JWT token generation & verification
├── controllers/
│   ├── auth.controller.js   # Register & login logic
│   ├── user.controller.js   # Profile, role, and user management
├── middleware/
│   ├── auth.middleware.js   # JWT authentication middleware
│   ├── role.middleware.js   # Role-based access control
│   ├── upload.js            # Multer upload configuration
│   ├── validate.middleware.js # Express validator rules
├── models/
│   └── User.js              # User schema & model
├── routes/
│   ├── auth.routes.js       # Authentication routes
│   ├── user.routes.js       # User management routes
├── uploads/                 # Temporary image storage
├── .env                     # Environment variables (ignored in Git)
├── .gitignore
├── package.json
├── server.js                # App entry point
└── README.md
```

## ⚙️ Requirements

Node.js v16+

MongoDB

Cloudinary Account (for image uploads)

NPM or Yarn

## 🔑 Environment Variables

Create a .env file in the root directory with:

```bash
PORT=port-of-ur-choice
MONGODB_URL=ur_mongodb_connection_string
JWT_SECRET_KEY=ur_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📦 Installation
Clone the repository
```bash
git clone https://github.com/BouzirJawad/auth-micro-.git
cd auth-micro-
```

Install dependencies
```bash
npm install
```

▶️ Run the Server
```bash
npm start
```


## 📡 API Endpoints

Auth Routes (/api/auth)
```bash
POST	/register	Register a new user
POST	/login	Login and get JWT
```
User Routes (/api/users)
```bash
GET	/	Get all users	Admin only
GET	/:userId	Get a single user by ID	Authenticated
PUT	/:userId/profile	Update user profile (with image)	Authenticated
PUT	/:userId/role	Update user role	Admin only
DELETE	/:userId/delete	Delete user	Admin only
```

🔐 Authentication & Authorization

JWT-based authentication

Authorization header:
```bash
Authorization: Bearer <token>
```
Role-based access using middleware 
```bash
checkRole(["admin"])
```

🖼 Profile Image Handling

Images uploaded using Multer to uploads/ temporarily.

Then uploaded to Cloudinary and local file removed.

Old Cloudinary image deleted when updating profile.

✅ Validations

Registration: name, email, password rules

Login: email & password required

Profile update: optional fields + password confirmation

Role update: only admin can change roles

📦 Tech Stack
```
Node.js, Express.js
MongoDB + Mongoose
JWT (authentication)
Cloudinary (image storage)
Multer (file upload)
Express-Validator (validation)
```

📌 Future Enhancements
````
Add Refresh Tokens
Add Forgot Password / Reset Password
Add Email Verification
````

---
✅ Author

Jawad Bouzir
Full Stack JavaScript Developer in progress 🚀
