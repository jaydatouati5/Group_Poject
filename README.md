# Project Title

## Cloning the Project

To clone this project, run the following command in your terminal:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of the repository.

## Dependencies

### Client

- `axios`: Promise-based HTTP client for making requests.
- `react-router-dom`: Library for routing in React applications.
- `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`: Libraries for testing React components.
- `react`, `react-dom`: Core libraries for building and rendering React applications.
- `react-scripts`: Scripts and configuration used by Create React App.
- `web-vitals`: Library for measuring performance metrics.

### Server

- `bcryptjs`: Library for hashing passwords.
- `cookie-parser`: Middleware for parsing cookies.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `dotenv`: Module for loading environment variables from a `.env` file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for creating and verifying JSON Web Tokens.
- `mongoose`: MongoDB object modeling tool.

## Installation

To install the project dependencies, navigate to the project directory and run the following commands for both client and server:

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

## Branching Strategy

This project will be maintained by three people:
- Jayda (Me)
- Slah
- Adel

Each person should create their separate branch to work on. For example:
- Jayda's branch: `jayda-dev`
- Slah's branch: `slah-dev`
- Adel's branch: `adel-dev`

To create and switch to your branch, use the following commands:

```bash
git checkout -b <your-branch-name>
```

Replace `<your-branch-name>` with your respective branch name.

## Contributing

1. Create a new branch for your feature or bug fix.
2. Commit your changes to your branch.
3. Push your branch to the remote repository.
4. Create a pull request to merge your changes into the main branch.
