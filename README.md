Personal Asset Management App
A full-stack web application to help users manage their personal assets like laptops, bikes, phones, etc.
Each user can securely log in and manage their own assets — add, update, delete, and view them.


 Tech Stack
| Layer    | Tech                        |
| -------- | --------------------------- |
| Frontend | React.js, MUI (Material UI) |
| Backend  | Spring Boot (Java)          |
| Database | PostgreSQL                  |
| Auth     | JWT-based authentication    |



👤 User Management
Register / Login

JWT token-based authentication

Public & protected routes

💼 Asset Management
Add/Edit/Delete/View personal assets

Fields include: name, category, status, purchase date, warranty expiry, image URL

Pagination support

🗂️ Master Data Management
Manage Asset Categories (Laptop, Bike, Phone, etc.)

Manage Asset Statuses (Active, Sold, Discarded, etc.)

🖥️ UI
Responsive design using MUI

Navbar with logout and navigation

Feedback using snackbars & dialog

datetime-local support for date + time input



 How to Run
1. Clone the repository

git clone https://github.com/Prasanth-777/Asset-Mangement.git


2. Backend (Spring Boot)
Configure PostgreSQL DB in application.properties


3. Frontend (React + Vite)
cd frontend
npm install
npm run dev
