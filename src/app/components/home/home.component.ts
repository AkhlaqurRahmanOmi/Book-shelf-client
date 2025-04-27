import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, CreateBookDto, UpdateBookDto } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookEditDialogComponent } from '../book-edit-dialog/book-edit-dialog.component';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    BookEditDialogComponent,
    AppButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  isLoading = true;
  isDialogOpen = false;
  selectedBook: Book | null = null;
  searchQuery = '';
  errorMessage = '';

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Get only the user's books by setting mine=true
    this.bookService.getBooks(true).subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = [...books];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.errorMessage = error.message || 'Failed to load books. Please try again.';
        this.isLoading = false;

        // If unauthorized, redirect to login
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error logging out:', error);
      }
    });
  }

  onAddBook(): void {
    this.selectedBook = null;
    this.isDialogOpen = true;
  }

  onEditBook(book: Book): void {
    this.selectedBook = book;
    this.isDialogOpen = true;
  }

  onDeleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error deleting book:', error);
        }
      });
    }
  }

  onToggleRead(book: Book): void {
    this.bookService.toggleReadStatus(book.id).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error updating book:', error);
      }
    });
  }

  onSaveBook(bookData: any): void {
    if (this.selectedBook) {
      // Update existing book
      const updateData: UpdateBookDto = {
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        coverImage: bookData.coverImage,
        genre: bookData.genre,
        publishedYear: bookData.publishedYear,
        rating: bookData.rating,
        isRead: bookData.isRead
      };

      this.bookService.updateBook(this.selectedBook.id, updateData).subscribe({
        next: () => {
          this.isDialogOpen = false;
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    } else {
      // Add new book
      const newBook: CreateBookDto = {
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        coverImage: bookData.coverImage,
        genre: bookData.genre,
        publishedYear: bookData.publishedYear,
        rating: bookData.rating,
        isRead: bookData.isRead || false
      };

      this.bookService.createBook(newBook).subscribe({
        next: () => {
          this.isDialogOpen = false;
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error adding book:', error);
        }
      });
    }
  }

  onCancelDialog(): void {
    this.isDialogOpen = false;
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = query;

    if (!query) {
      this.filteredBooks = [...this.books];
      return;
    }

    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      (book.genre && book.genre.toLowerCase().includes(query))
    );
  }
}
