# Bazaar Shopping App

Bazaar is a shopping app that allows users to browse and purchase items from various categories. It is built using React.js, Tailwind CSS, Redux, Firebase, Stripe, and TypeScript.

## Table of Contents

-   Features
-   Installation
-   Usage
-   Technologies Used
-   Contributing
-   License

## Features

-   Browse products by categories.
-   Add items to the shopping cart.
-   Manage the shopping cart (update quantities, remove items).
-   Checkout using Stripe for secure payments.
-   Authentication using Firebase.

## Installation

1. Clone the repository:

    `git clone https://github.com/Wickedlolz/bazaar.git`

    `cd bazaar`

2. Install dependencies:

    `npm install`

3. Set up Firebase and Stripe credentials:

-   Create a Firebase project and configure it in your Firebase console.
-   Obtain Stripe API keys and set them up in your Stripe dashboard.

4. Create a .env file in the root of the project and add the following:

    `REACT_APP_FIREBASE_API_KEY=your_firebase_api_key`
    `REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain`
    `REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id`
    `REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key`

Replace your_firebase_api_key, your_firebase_auth_domain, your_firebase_project_id, and your_stripe_public_key with your respective Firebase and Stripe credentials.

## Usage

To start the app, run:

`npm start`

The app will start at http://localhost:3000. You can access the app in your web browser.

## Technologies Used

-   React.js - A JavaScript library for building user interfaces.
-   Tailwind CSS - A utility-first CSS framework for rapidly building custom designs.
-   Redux - A predictable state container for JavaScript apps.
-   Firebase - A platform developed by Google for creating mobile and web applications.
-   Stripe - A technology company that builds economic infrastructure for the internet.
-   TypeScript - A superset of JavaScript that adds optional static typing.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the Contributing Guidelines.

## License

This project is licensed under the MIT License.
