# Agora tutordhips 2.0

This project is a Next.js based web application that was migrated from Create React App (CRA). We have also migrated from Epayco to Stripe for payment processing, and Redux to Redux Toolkit for state management. The image uploading functionality has been updated as well.

## Tech Stack

- **Next.js**: A React framework with hybrid static & server rendering, route pre-fetching, and more.
- **React Redux**: A predictable state container for JavaScript apps.
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **Stripe**: A suite of payment APIs that powers commerce for businesses of all sizes.
- **Axios**: Promise based HTTP client for the browser and node.js.
- **date-fns and date-fns-tz**: Modern JavaScript date utility library.
- **Sass**: A mature, stable, and powerful professional grade CSS extension language.
- **Lottie**: A library for Android, iOS, Web, and Windows that parses Adobe After Effects animations exported as JSON with Bodymovin and renders them natively on mobile and on the web.
- **Cloudinary**: A cloud-based image and video management service.
- **SweetAlert2**: A beautiful, responsive, customizable and accessible replacement for JavaScript's popup boxes.

## Installation

To get started with this project:

1. **Clone the repository**: https://github.com/Nicolas-Rodriguez-Ch/agora-tutorships-client

2. **Navigate into the directory**: cd repository


3. **Install the dependencies**: npm install


4. **Create a `.env.local` file and add your environment variables**: touch .env.local

Open the `.env.local` file and add the following (replace the values with your own):

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
NEXT_PUBLIC_APP_BACKEND_URL=your_backend_url


5. **Run the application**:
In development mode: npm run dev

In production mode:
Build the application first: npm run build

Then start the application: npm run start

## Operation Instructions

To start the application in development mode, run `npm run dev`. This will start the application on `http://localhost:3000` (or your custom port if you've set one).

To build the application for production, run `npm run build`. This will create a `next build` which you can then start with `npm run start`.

This application uses Stripe for payment processing, so make sure you have valid Stripe keys.