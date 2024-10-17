# BikeShare - BD Bike Rental Store

[![Live URL](https://img.shields.io/badge/Live%20URL-Visit-green)](https://bd-bike-rental-reservation-system.vercel.app/)

## Overview

**bike-rental-reservation-system** is a user-friendly web application designed to simplify the process of bike rental system. The platform allows users to browse Rent A bike, view details, Booking for Rental and Cost will be Per Hours. Administrators are provided with a powerful dashboard to manage Bike Return, Bike manage, coupon code set, and user manage. The platform offers a seamless experience for both regular users and administrators with an intuitive, modern design.

## Table of Contents

- [Overview](#overview)
- [Public Pages](#public-pages)
- [Admin Dashboard](#admin-pages)
- [User Dashboard](#user-dashboard)
- [Additional Features](#additional-features)
- [Technologies Used](#technologies-used-and-video)
- [Setup Instructions](#setup-instructions)

## Key Features

### Public Pages

- **Home Page**:
  - A hero section, a clear call-to-action button, and featured Bikes.
  - A Key Feature of Bike renter services with user ratings and feedback.
  - A Spin Wheel percentage board that a user can be able to get a coupon code for discount. 
  - Navigation to key pages such as Bikes, Booking, and Login.


- **User Authentication**:
  - **Sign Up** and **Login** pages with form validation and token-based authentication.
  - Users are assigned the default "USER" role, with one initial "ADMIN" role in the database.

- **Bikes Page**:
  - Browse a list of available Bikes with filtering, sorting, and searching functionalities.
  - Detailed Bike descriptions, prices, and Per Hours Cost. Model, Brands, and Year.

- **Bike Details Page**:

  - Displays Current Bike Booking button. , with real-time updates on booked and available Bikes.
  - Allows users to select a date and time, and book Modal.
  - Compare current bike with another bike. 

- **Booking Page**:

  - Displays the selected Bike details, and give booking process with current select calender.
  - Integration with **Stripe** for payment processing.

- **Custom Error Pages**:
  - A 404 error page is designed to guide users back to safe pages, such as the home or login page.

### Admin Pages

- **Admin Dashboard**:
  - A comprehensive dashboard to manage services, return bike list, Bike management, Coupon Management, and user roles management.
  - Bike Management: Add, update, or delete Bike with real-time updates.
  - Return Management: Return booking bikes and calculated Total Duration and Total Cost with discount. 
  - Coupon Management: Admin can add some coupon code with percentage for user discount that user will be able to get a coupon code for booking bikes. 
  - User Management: View users, update roles.
  - Admin can update their personal information.


### User Dashboard
  - A comprehensive dashboard that show user rental bikes count. and due cost and paid cost. 
  - Rental management: user can see booking bikes after admin return. user can be able to pay due using stripe. if user paid all money then rental bike will be show in paid list. 
  - Users can update their personal information.

### Additional Features

- **Responsive Design**:
  - The platform is fully responsive and optimized for both desktop and mobile devices.
- **Secure Authentication**:
  - Token-based authentication ensures secure user sessions and role-based access control.
-  **About Page**
  - I Just added about page that show company all details. location. about why choose a user to our bike rental. 


## Technologies Used and Video

- **Video**
  - Video URL: [Bike Rental Reservation System](https://youtu.be/DQZ-LMn-YaU)

- **Frontend**:

  - React, Redux Toolkit, TypeScript, Ant Design, Tailwind CSS
  - **Live Demo**: [bike-rental-reservation-system](https://bd-bike-rental-reservation-system.vercel.app/)
  - **Client Repository**: [GitHub - bike-rental-reservation-system](https://github.com/mdshohed/bike-rental-reservation-system)

- **Backend**:

  - Node.js, Express.js, Typescript, MongoDB, JWT for Authentication
  - **Server Repository**: [GitHub - bike-rental-reservation-system-backend](https://bike-rental-reservation-system-server-seven.vercel.app/)

- **Payment Gateway**:

  - Stripe for secure payment processing.

- **State Management**:

  - Redux Toolkit, RTK Query for efficient API interaction.

- **Styling**:
  - Tailwind CSS and Ant Design for consistent, responsive, and modern design components.

## Setup Instructions

1. **Clone the Repositories**

   ```bash
   git clone https://github.com/mdshohed/bike-rental-reservation-system-backend.git
   git clone https://github.com/mdshohed/bike-rental-reservation-system.git
   ```

2. **Install Dependencies**

   For the client:

   ```bash
   cd bike-rental-reservation-system
   npm install
   ```

   For the server:

   ```bash
   cd bike-rental-reservation-system-backend
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory In server:

   ```bash
    NODE_ENV=development 
    PORT=5000
    DATABASE_URL=database url
    BCRYPT_SALT_ROUNDS=10
    DEFAULT_PASS=usingYourPassword
    JWT_ACCESS_SECRET=yourSecretKey
    JWT_REFRESH_SECRET=yourSecretKey
    JWT_ACCESS_EXPIRES_IN=1d
    JWT_REFRESH_EXPIRES_IN=365d
   ```

4. **Start the Development Servers**

   For the server:

   ```bash
   npm run dev
   ```

5. **Admin Credentials**


   ```bash
   Email: mdshohed@gmail.com
   Password: 12345
   ```

6. **Build for Production**

   When ready to deploy the client:

   ```bash
   npm run build
   ```
