# 📚 BookShelf - Personal Book Management Application

BookShelf is a modern web application that helps you manage your personal book collection. Built with Angular 19 for the frontend and NestJS for the backend, it provides a seamless experience for tracking your reading journey.

![BookShelf App Screenshot](src/assets/images/app-screenshot.png)

## ✨ Features

- **User Authentication**
  - Secure registration and login
  - Session-based authentication
  - Profile management

- **Book Management**
  - Add books to your personal collection
  - Track reading status (read/unread)
  - Categorize books by genre
  - Rate and review books
  - Search and filter your collection

- **Responsive Design**
  - Beautiful UI that works on desktop and mobile devices
  - Intuitive user experience

## 🛠️ Tech Stack

### Frontend
- **Angular 19** - Latest version with standalone components
- **RxJS** - Reactive programming
- **TailwindCSS** - Utility-first CSS framework
- **Lottie** - For beautiful animations

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma ORM** - Next-generation ORM for Node.js
- **MongoDB** - NoSQL database
- **Express** - Web framework for Node.js

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- MongoDB (local or Atlas connection)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-shelf.git
   cd book-shelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:4200/`

### Backend Setup

1. **Clone the backend repository**
   ```bash
   git clone https://github.com/yourusername/book-shelf-backend.git
   cd book-shelf-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DATABASE_URL="mongodb://localhost:27017/bookshelf"
   SESSION_SECRET="your-secret-key"
   ```

4. **Start the development server**
   ```bash
   npm run start:dev
   ```

5. **Verify the API is running**
   The API will be available at `http://localhost:3000/`

## 📋 API Endpoints

### Authentication
- `POST /users/register` - Register a new user
- `POST /users/login` - Login
- `POST /users/logout` - Logout
- `GET /users/profile` - Get current user profile

### Books
- `GET /books` - Get all books (with optional `mine=true` query parameter)
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book
- `PATCH /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book
- `PATCH /books/:id/toggle-read` - Toggle read status

## 🧩 Project Structure

### Frontend Structure

```
src/
├── app/
│   ├── components/
│   │   ├── app-button/
│   │   ├── app-input-field/
│   │   ├── book-card/
│   │   ├── book-edit-dialog/
│   │   ├── home/
│   │   ├── landing/
│   │   ├── login/
│   │   ├── signup/
│   │   └── validation-errors/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── interfaces/
│   │   ├── auth.interface.ts
│   │   ├── book.interface.ts
│   │   └── validation.interface.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── book.service.ts
│   │   └── validation.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── environments/
└── styles/
```

### Backend Structure

```
src/
├── middleware/
│   ├── cors.middleware.ts
│   ├── validation.middleware.ts
│   ├── session.middleware.ts
│   ├── passport.middleware.ts
│   └── index.ts
├── prisma/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   └── prisma.controller.ts
├── user/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   ├── login.dto.ts
│   │   └── index.ts
│   ├── guards/
│   │   ├── authenticated.guard.ts
│   │   ├── local-auth.guard.ts
│   │   └── index.ts
│   ├── strategies/
│   │   ├── local.strategy.ts
│   │   └── index.ts
│   ├── serializers/
│   │   ├── local.serializer.ts
│   │   └── index.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── book/
│   ├── dto/
│   │   ├── create-book.dto.ts
│   │   ├── update-book.dto.ts
│   │   └── index.ts
│   ├── book.controller.ts
│   ├── book.module.ts
│   └── book.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 💾 Database Schema

BookShelf uses MongoDB with Prisma ORM. The main data models are:

### User Model
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  username  String?
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  books     Book[]
}
```

### Book Model
```prisma
model Book {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  title        String
  author       String
  description  String
  coverImage   String?
  genre        String?
  publishedYear Int?
  rating       Float?
  isRead       Boolean  @default(false)
  dateAdded    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  userId       String   @db.ObjectId
  user         User     @relation(fields: [userId], references: [id])
}
```

## 🔒 Authentication Flow

BookShelf uses session-based authentication:

1. User registers or logs in
2. Server creates a session and sends a cookie
3. Frontend includes this cookie in all subsequent requests
4. Protected routes check for valid session
5. Logout destroys the session

## 🎨 UI Components

BookShelf includes several reusable UI components:

- **AppButton** - Customizable button component
- **AppInputField** - Form input with validation
- **BookCard** - Display book information
- **ValidationErrors** - Show form validation errors

## 🔄 Application Workflow

### User Authentication Flow
1. User visits the landing page
2. User navigates to login or signup page
3. After successful authentication, user is redirected to the home page

### Book Management Flow
1. User views their book collection on the home page
2. User can add a new book using the "Add Book" button
3. User can edit or delete existing books
4. User can toggle the read status of books
5. User can search and filter their book collection

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

## 📦 Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For detailed guidelines on how to contribute, please read our [CONTRIBUTING.md](CONTRIBUTING.md) file.

In short:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Troubleshooting

### Common Issues

#### Frontend Issues
- **CORS Errors**: Ensure the backend CORS configuration includes your frontend URL
- **Authentication Issues**: Check if cookies are being properly sent with requests
- **Form Validation Errors**: Verify that all required fields are properly filled

#### Backend Issues
- **Database Connection Errors**: Verify your MongoDB connection string in the `.env` file
- **Session Issues**: Ensure the SESSION_SECRET is properly set
- **API Errors**: Check the backend logs for detailed error messages

### Debugging Tips
- Use browser developer tools to inspect network requests and responses
- Check the browser console for JavaScript errors
- Use the backend logs to identify server-side issues
- Test API endpoints using tools like Postman or Insomnia

## 🙏 Acknowledgements

- [Angular](https://angular.dev/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
