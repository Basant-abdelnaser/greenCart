# GreenCart - MERN Stack E-Commerce Platform

## Overview

GreenCart is a full-stack e-commerce web application built with the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

The platform supports two types of users:

* **Customers**: Browse products, search and filter items, manage their cart, add addresses, and place orders.
* **Sellers/Admins**: Manage products, monitor orders, and control product availability through a dedicated dashboard.

## Features

### Customer Features

* User registration and authentication
* Secure login and logout
* Browse all products
* View product details
* Search products by name
* Add products to cart
* Update cart quantities
* Manage delivery addresses
* Place orders using Cash on Delivery (COD)
* View order history

### Seller Features

* Seller authentication
* Seller dashboard
* Add new products
* Upload multiple product images
* View all products
* Archive/disable products by changing stock status
* View all customer orders

## Tech Stack

### Frontend

* React.js
* React Router
* Context API
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (Image Uploads)
* Cloudinary (upload cloud images)

### Deployment

* Frontend: Vercel
* Backend: Vercel
* Database: MongoDB Atlas

---

## Live Demo

### Frontend

🔗 https://green-cart-sigma-nine.vercel.app

### Backend API

🔗 https://green-cart-backend-liard-three.vercel.app

---

## API Endpoints

### Authentication

#### User

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/user/register | Register new user          |
| POST   | /api/user/login    | Login user                 |
| GET    | /api/user/is-auth  | Verify user authentication |
| GET    | /api/user/logout   | Logout user                |

#### Seller

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | /api/seller/login   | Seller login                 |
| GET    | /api/seller/is-auth | Verify seller authentication |
| GET    | /api/seller/logout  | Seller logout                |

---

### Products

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | /api/products/add       | Add new product (Seller Only) |
| GET    | /api/products/list      | Get all products              |
| GET    | /api/products/:id       | Get single product            |
| PUT    | /api/products/stock/:id | Update product stock status   |

---

### Cart

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| PUT    | /api/cart/update | Update cart items |

---

### Address

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | /api/address/add | Add user address   |
| GET    | /api/address/get | Get user addresses |

---

### Orders

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| POST   | /api/orders/cod | Place Cash on Delivery order |
| GET    | /api/orders/:id | Get user orders              |
| GET    | /api/orders     | Get all orders (Seller Only) |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Basant-abdelnaser/greenCart.git
cd greencart
```

### Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGODB_URI = "mongodb+srv://dbUser:greencart123@cluster0.lw6zovr.mongodb.net"
NODE_ENV = "development"
JWT_SECRET = "secret#text"

# admin credentials
SELLER_EMAIL = "admin@gmail.com"
SELLER_PASSWORD = "admin123"

# cloudinary
CLOUDINARY_CLOUD_NAME = "dmqucmpl2"
CLOUDINARY_API_KEY = "724526647315785"
CLOUDINARY_API_SECRET = "tnPB92cH9yMF8GfiDgmClnnhhqE"
```

### Run Locally

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## Future Improvements

* Online payments integration (Stripe/Paymob)
* Order status tracking
* Wishlist functionality
* User profile management
* Sales analytics dashboard
* Product reviews and ratings

---

## Project Structure

```text
greencart/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── context/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── config/
│
└── README.md
```

## Author

Developed by **Bsant Abdelnaser**

Graduated in 2025 and passionate about Full-Stack Web Development using the MERN Stack.
