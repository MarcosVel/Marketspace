# Ignite Marketspace

## Overview

Ignite Marketspace is a marketplace application developed as part of RocketSeat's Ignite Challenge 03. This project highlights the use of modern front-end technologies with a React Native-based mobile application, showcasing a full-stack approach to building scalable and maintainable applications.

## 🧐 Features

- **User Authentication**: Secure login and registration system.
- **Product Listings**: Create, update, delete, and view product listings.
- **Responsive Design**: Optimized for various screen sizes.
- **RESTful API**: Backend services with Node.js and Express.
- **Database Integration**: MongoDB for data persistence.
- **Real-time Updates**: WebSocket integration for real-time notifications.

## 💻 Front-end Technologies Used

- **React Native**: For building the mobile application.
- **TypeScript**: Ensures type safety and code quality.
- **Styled-components**: For styling the application components.
- **Axios**: For making API requests.
- **React Navigation**: For navigation within the app.
- **Formik**: For handling form state and validation.
- **Yup**: For schema validation.
- **Expo**: To streamline the development process.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- React Native CLI
- Expo CLI

### 🛠️ Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/MarcosVel/ignite-marketspace.git
    cd ignite-marketspace
    ```

2. **Backend Setup**:
    ```sh
    cd backend
    yarn
    npm start
    ```

3. **Mobile App Setup**:
    ```sh
    cd mobile
    yarn
    npx expo start
    ```

### Configuration

- **Backend**: Update `.env` with your MongoDB URI.
- **Mobile**: Update `mobile/src/services/api.js` with your baseURL.

## Usage

1. **Start the backend server**:
    ```sh
    cd backend
    yarn start
    ```

2. **Run the mobile app**:
    ```sh
    cd mobile
    npx expo start
    ```

