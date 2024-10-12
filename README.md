# Express & TypeScript Starter Kit

This is a starter kit for building APIs with **Express** and **TypeScript**. It includes a basic setup with **MongoDB** for data storage, along with commonly used middlewares, error handling, and structured project architecture.

## Features

- **TypeScript** support for improved development experience
- **Express** for building web applications and APIs
- **MongoDB** for data storage
- **CORS** support for cross-origin requests
- **Helmet** for securing HTTP headers
- **Morgan** for logging HTTP requests
- **Error handling** with custom error classes

## Prerequisites

- Node.js 22
- MongoDB (installed locally or use a cloud service)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/express-typescript-starter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd express-typescript-starter
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a .env file by copying the .env.sample:

   ```bash
   cp .env.sample .env.production #  development & test
   ```

5. Update the .env file with your configuration settings.

## Usage

To start the server, run:

```bash
npm run start
```

For development mode with auto-reloading, run:

```bash
npm run dev
```

## Running Tests

To run the tests, use:

```bash
npm test
```

# Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.
