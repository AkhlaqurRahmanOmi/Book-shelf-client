# Contributing to BookShelf

Thank you for considering contributing to BookShelf! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report:
- Check the issue tracker to see if the bug has already been reported
- Ensure the bug is related to the BookShelf application

When submitting a bug report, include:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Any relevant details about your environment (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! When suggesting an enhancement:
- Use a clear and descriptive title
- Provide a detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- Include any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- MongoDB (local or Atlas connection)

### Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/book-shelf.git
   cd book-shelf
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

### Backend Setup

1. Clone the backend repository
   ```bash
   git clone https://github.com/yourusername/book-shelf-backend.git
   cd book-shelf-backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DATABASE_URL="mongodb://localhost:27017/bookshelf"
   SESSION_SECRET="your-secret-key"
   ```

4. Start the development server
   ```bash
   npm run start:dev
   ```

## Coding Guidelines

### Angular Guidelines

- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Use standalone components where possible
- Implement proper error handling
- Write comprehensive unit tests

### NestJS Guidelines

- Follow the [NestJS Style Guide](https://docs.nestjs.com/first-steps)
- Use dependency injection
- Implement proper validation and error handling
- Write comprehensive unit tests

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)

Thank you for contributing to BookShelf!
