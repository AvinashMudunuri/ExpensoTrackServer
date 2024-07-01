### README.md

# ExpensoTrack Server Application

A Node.js application for tracking personal expenditures, including modes of payment, investments, loans, credit cards, and bill payments. This application is built with a modern tech stack including Express, MongoDB, and follows Domain-Driven Design (DDD) principles with comprehensive logging and testing.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Contributing](#contributing)
- [License](#license)

## Features

- User management (create, read, update, delete)
- Account management
- Track expenditures across different categories
- Logging with Winston
- Testing with Mocha and Chai

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Mocha and Chai for testing
- Winston for logging

## Installation

1. **Clone the repository**:
   bash
   git clone https://github.com/your-username/personal-expenditures.git
   cd personal-expenditures

2. **Install dependencies**:
   bash
   npm install

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your MongoDB URI:
   env
   MONGODB_URI=mongodb://localhost:27017/personal_expenditures

## Usage

1. **Start the server**:
   bash
   npm start

   The server will start on `http://localhost:3000`.

## Testing

1. **Run tests**:
   bash
   npm test

   This will run the tests located in the `test` directory using Mocha and Chai.

## API Endpoints

### User Endpoints

- **Create User**: `POST /api/users`

  - Request Body: `{ "name": "John Doe", "email": "john@example.com" }`
  - Response: `201 Created`

- **Get All Users**: `GET /api/users`
  - Response: `200 OK`, returns an array of users

### Account Endpoints

- **Create Account**: `POST /api/accounts`

  - Request Body: `{ "name": "Savings", "type": "bank" }`
  - Response: `201 Created`

- **Get All Accounts**: `GET /api/accounts`
  - Response: `200 OK`, returns an array of accounts

## Logging

The application uses Winston for logging. Logs are written to:

- `error.log`: Logs error messages
- `combined.log`: Logs all messages

In development, logs are also output to the console.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
