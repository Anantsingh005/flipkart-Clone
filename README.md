# Flipkart Clone

A frontend e-commerce website inspired by Flipkart, built with HTML, CSS, and vanilla JavaScript. The project implements a multi-page shopping experience with product discovery, search, product details, login flow, wishlist interaction, and a persistent shopping cart using browser local storage.

## Live Demo

https://flipkart-clone-anant5.vercel.app

## Repository

https://github.com/Anantsingh005/flipkart-Clone

## Overview

This project was developed as a hands-on frontend project to recreate key patterns found in a modern e-commerce application.

The implementation includes:

- Multi-page e-commerce UI
- Product categories and product cards
- Hero banner carousel
- Product search
- Product detail rendering
- Product image gallery and variants
- Wishlist interaction
- Login and OTP-style validation flow
- Shopping cart management
- Quantity controls and item removal
- Cart persistence with `localStorage`
- Responsive layouts
- Vercel deployment

## Key Features

### Product Discovery

- Flipkart-inspired header and category navigation
- Promotional hero carousel with multiple banners
- Product sections and product cards
- Search interface for products
- Category-oriented shopping experience

### Product Details

- Dynamic product detail page
- Product image gallery
- Product highlights and specifications
- Product variants such as color and size where applicable
- Add to Cart and Buy Now actions
- Wishlist interaction

### Shopping Cart

- Add products to the cart
- Increase and decrease product quantity
- Remove products
- Save cart state in browser `localStorage`
- Dynamic cart count
- Order and price summary calculations
- Empty-cart state

### Login Flow

- Dedicated login page
- Email/mobile input validation
- OTP-style interaction
- Redirect to the post-login page after successful input

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and markup |
| CSS3 | Styling, layouts, and responsive design |
| JavaScript (ES6+) | Interactivity, DOM manipulation, and application logic |
| Local Storage API | Client-side cart persistence |
| Font Awesome | UI icons |
| Google Fonts | Typography |
| Git & GitHub | Version control and source management |
| Vercel | Deployment |

## Project Structure

```text
flipkart-Clone/
│
├── assent/
│   └── Images, banners, logos, and other project assets
│
├── index.html
├── style.css
├── script.js
│
├── login.html
├── login.css
├── login.js
│
├── afterlogin.html
├── afterlogin.css
│
├── product.html
├── product.css
├── product.js
│
├── cart.html
├── cart.css
├── cart.js
│
└── README.md
```

## JavaScript Modules

### `script.js`

Handles core homepage interactions such as:

- Hero banner carousel
- Search behavior
- Location-related UI
- Cart counter
- Homepage interactions

### `product.js`

Handles product-page functionality including:

- Product metadata
- Dynamic product rendering
- Product gallery
- Variants
- Specifications
- Highlights
- Wishlist
- Cart actions
- Buy confirmation flow

### `cart.js`

Handles cart functionality including:

- Reading cart data from `localStorage`
- Rendering cart items
- Quantity updates
- Removing products
- Cart totals
- Cart state synchronization

### `login.js`

Handles:

- Login form submission
- Input validation
- OTP-style confirmation
- Redirect to the post-login page

## Getting Started

### Prerequisites

No backend server or database is required to run the current version.

You need:

- A modern web browser
- VS Code (recommended)
- Live Server extension (recommended)

### Clone the Repository

```bash
git clone https://github.com/Anantsingh005/flipkart-Clone.git
```

### Open the Project

```bash
cd flipkart-Clone
```

Open the folder in VS Code:

```bash
code .
```

### Run Locally

Open `index.html` in a browser, or use the VS Code Live Server extension:

```text
Right-click index.html → Open with Live Server
```

## Data and Architecture

This is currently a client-side frontend project.

- Product information is managed in JavaScript.
- Cart information is stored in browser `localStorage`.
- No external backend or database is required.
- Login is implemented as a frontend demonstration flow and does not provide real authentication.

## Responsive Design

The interface is designed to adapt to different screen sizes and provide a consistent shopping experience across desktop, tablet, and mobile layouts.

## Screenshots

1. Home page  ("./assent/home.png")
2. Product details page 
3. Login page
4. Shopping cart

## Future Improvements

- Backend API integration
- Database integration
- Real user authentication
- Product API integration
- Advanced search and filtering
- Product sorting
- Wishlist persistence
- Checkout workflow
- Payment gateway integration
- Order history and tracking
- User profile management
- Improved mobile navigation

## Deployment

The project is deployed using Vercel.

Live application:

https://flipkart-clone-anant5.vercel.app

## Disclaimer

This project is created for educational and portfolio purposes.

It is an independent frontend project inspired by the Flipkart shopping experience and is not affiliated with, sponsored by, or endorsed by Flipkart.

All trademarks, logos, and brand assets belong to their respective owners.

## Author

**Anant Singh**

GitHub: https://github.com/Anantsingh005

Project: https://github.com/Anantsingh005/flipkart-Clone

Live Demo: https://flipkart-clone-anant5.vercel.app

---

If you found this project useful, consider giving the repository a star.
