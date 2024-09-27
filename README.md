# Cheat Meal Food Delivery App

Welcome to **Cheat Meal**, your go-to food delivery platform for satisfying all your cravings. Whether you're a customer looking for a quick, delicious meal or a restaurant owner wanting to reach more customers, **Cheat Meal** has got you covered. This web app features separate authentication for customers and restaurants, ensuring a seamless experience for both parties.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Screenshots](#screenshots)
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Features

- **Customer & Restaurant Authentication**: Secure login for both customers and restaurants with separate dashboards.
- **Restaurant Menu Management**: Restaurants can manage their menu, add new dishes, and update existing ones.
- **Order Tracking**: Customers can track their food orders in real-time.
- **Payment Integration**: Multiple payment options, including credit card, debit card, and digital wallets.
- **User Reviews & Ratings**: Customers can leave reviews and rate the food quality, delivery, and service.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Search & Filter**: Users can search for restaurants or dishes based on location, cuisine, or price.
- **Push Notifications**: Get real-time updates on order status, new deals, and promotions.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for secure user sessions
- **Payment Gateway**: Stripe API for payment processing
- **Cloud Storage**: AWS S3 for image and media storage
- **Deployment**: Vercel (Frontend), Heroku (Backend)

## Installation

To run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Abhishek-Jaiswar/cheat-meal.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cheat-meal
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables. Create a `.env` file in the root directory and add the following keys:

   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET=your-stripe-secret-key
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   ```

5. Run the backend server:

   ```bash
   npm run dev
   ```

6. Open a new terminal navigate to frontend and run it by:

   ```bash
   npm run dev
   ```

Your Cheat Meal Food Delivery App should now be up and running at `http://localhost:3000`.

## Usage

### For Customers

1. **Sign Up/Log In**: Create an account or log in to an existing one.
2. **Browse Restaurants**: Explore the list of partnered restaurants.
3. **Order Food**: Select items from the menu, customize your order, and proceed to checkout.
4. **Track Order**: Follow your order's journey from preparation to delivery in real-time.

### For Restaurants

1. **Sign Up/Log In**: Register your restaurant or log in to an existing account.
2. **Manage Menu**: Add, remove, or update menu items.
3. **Process Orders**: Accept and track customer orders.
4. **View Analytics**: Get insights into sales and customer reviews.

## Screenshots

### Home Page
![Home Page](https://your-screenshot-url.com/home-page)

### Customer Dashboard
![Customer Dashboard](https://your-screenshot-url.com/customer-dashboard)

### Restaurant Dashboard
![Restaurant Dashboard](https://your-screenshot-url.com/restaurant-dashboard)

## API Documentation

The app provides several API endpoints for interacting with customer and restaurant data.

### Authentication

- **POST** `/api/v1/auth/signup` - Sign up as a customer or restaurant
- **POST** `/api/v1/auth/login` - Log in to your account

### Customer Endpoints

- **GET** `/api/customers/orders` - View customer orders
- **POST** `/api/customers/order` - Place a new order

### Restaurant Endpoints

- **GET** `/api/restaurants/menu` - Get restaurant's menu
- **POST** `/api/restaurants/menu` - Add a new menu item
- **PATCH** `/api/restaurants/menu/:id` - Update a menu item

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please feel free to reach out:

- **Email**: support@cheatmeal.com
- **Website**: [Cheat Meal](https://cheatmeal.com)
- **LinkedIn**: [Cheat Meal LinkedIn](https://www.linkedin.com/in/abhishek-jaiswar-86762030a/)
