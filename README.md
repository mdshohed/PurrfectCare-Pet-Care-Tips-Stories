# BikeShare - BD Bike Rental Store

[![Live URL](https://img.shields.io/badge/Live%20URL-Visit-green)](https://purrfect-care-pet-care-tips-stories.vercel.app)

## Overview

**Purrfect Care: Pet Care Tips & Stories** is an engaging platform designed for pet lovers to share their experiences and insights. After logging in, users can create posts, follow other members, and interact with content through likes and comments. Unique to the platform is the premium post feature, where users can charge for access, facilitating a subscription-like model for exclusive content. Administrators play a crucial role in managing the community, with the ability to review and publish premium posts, block or unblock users, and oversee payment transactions. Additionally, they can delete posts that violate community standards, ensuring a safe and vibrant environment for all pet enthusiasts. With its user-friendly interface and robust administrative controls, Purrfect Care fosters a supportive community dedicated to sharing knowledge and tips about pet care.

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

  - Next.js, NextUI, TypeScript, Tailwind CSS
  - **Live Demo**: [Purrfect Care: Pet Care Tips & Stories](https://purrfect-care-pet-care-tips-stories.vercel.app)
  - **Client Repository**: [GitHub -Purrfect Care: Pet Care Tips & Stories](https://github.com/mdshohed/PurrfectCare-Pet-Care-Tips-Stories.git)

- **Backend**:

  - Node.js, Express.js, Typescript, MongoDB, Cloudinary, Multer, JWT for Authentication
  - **Server Repository**: [GitHub - bike-rental-reservation-system-backend](https://github.com/mdshohed/pet-care-tips-and-stories-server.git)

- **Payment Gateway**:

  - Stripe for secure payment processing.

- **State Management**:

  - React Context API and tanstack/react-query for efficient API interaction.

- **Styling**:
  - Tailwind CSS and Ant Design for consistent, responsive, and modern design components.

## Setup Instructions

1. **Clone the Repositories**

   ```bash
   git clonehttps://github.com/mdshohed/pet-care-tips-and-stories-server.git
   git clone https://github.com/mdshohed/PurrfectCare-Pet-Care-Tips-Stories.git
   ```

2. **Install Dependencies**

   For the client:

  ```bash
   cd pet-care-tips-and-stories-server
   npm install
   ```

   ```bash
   cd PurrfectCare-Pet-Care-Tips-Stories
   npm install
   ```

   For the server:
 

3. **Environment Variables**

   Create a `.env` file in the root directory In server:

   ```bash
    NEXT_PUBLIC_BASE_API=<you-server-start-api>
    NEXT_PUBLIC_PAYMENT_GATEWAY_PK=<your-payment-gateway-pk>
   ```

4. **Start the Development Servers**

   For the server:

   ```bash
   npm run dev
   ```

5. **Admin Credentials**


   ```bash
   Email: mdshohed170@gmail.com
   Password: 123456
   ```

6. **Build for Production**

   When ready to deploy the client:

   ```bash
   npm run build
   ```
