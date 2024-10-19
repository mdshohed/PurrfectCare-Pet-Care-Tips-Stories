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
  - home page has 2 part. all post with infinity scroll. and side bar user list and premium list part. 
  - a user can perform in a post like, unlike. comment, delete, edit comment. 
  - a user can filter category wise post. also a user can search any type of post using title and description text. 
  - find-post showing only post.


- **User Authentication**:
  - **Sign Up** and **Login** pages with form validation and token-based authentication.
  - Users are assigned the default "USER" role, with one initial "ADMIN" role in the database.
  - User can Reset password if they forgot their password. 

### Admin Pages

- **Admin Dashboard**:
  - A comprehensive dashboard to that show total users, posts, premium post, total payment details.
  - Premium Post: A user after creating a post will be pending untill admin accepted
  - Payment List: Admin can see all premium post total subscription money. 
  - User Management: Admin can perform a user block or unblock.
  - Admin can update their personal Profile with Image.


### User Dashboard
  - A comprehensive dashboard that show user all post that they create from creating page.  
  - Friend Connection: A user can see his/her follower, following, and can send following request.
  - PDF Generation: Users can generate PDFs outlining nutrition needs based on a pet’s age and weight
  - Users can update their personal Profile with Image.

### Additional Features

- **Responsive Design**:
  - The platform is fully responsive and optimized for both desktop and mobile devices.
- **Secure Authentication**:
  - Token-based authentication ensures secure user sessions and role-based access control.
-  **About Page**
  - I Just added about page that show purrfectCare all details. location. 


## Technologies Used and Video

- **Video**
  - Video URL: [Purrfect Care: Pet Care Tips & Stories](https://youtu.be/iidZuWALJYo)

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
