import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from '../interfaces/book.interface';
import { environment } from '../../environments/environment';

export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  genre?: string;
  publishedYear?: number;
  rating?: number;
  isRead?: boolean;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  description?: string;
  coverImage?: string;
  genre?: string;
  publishedYear?: number;
  rating?: number;
  isRead?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;
  private booksSubject = new BehaviorSubject<Book[]>([]);
  public books$ = this.booksSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // Important for session-based auth
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}, Message: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  // Get all books
  getBooks(mine: boolean = false): Observable<Book[]> {
    let params = new HttpParams();
    if (mine) {
      params = params.set('mine', 'true');
    }

    return this.http.get<Book[]>(this.apiUrl, {
      ...this.httpOptions,
      params
    }).pipe(
      tap(books => this.booksSubject.next(books)),
      catchError(this.handleError)
    );
  }

  // Get a book by ID
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new book
  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, this.httpOptions).pipe(
      tap(newBook => {
        const currentBooks = this.booksSubject.value;
        this.booksSubject.next([...currentBooks, newBook]);
      }),
      catchError(this.handleError)
    );
  }

  // Update a book
  updateBook(id: string, book: UpdateBookDto): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, book, this.httpOptions).pipe(
      tap(updatedBook => {
        const books = this.booksSubject.value;
        const index = books.findIndex(b => b.id === updatedBook.id);
        if (index !== -1) {
          const updatedBooks = [
            ...books.slice(0, index),
            updatedBook,
            ...books.slice(index + 1)
          ];
          this.booksSubject.next(updatedBooks);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Delete a book
  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      tap(() => {
        const books = this.booksSubject.value;
        const updatedBooks = books.filter(book => book.id !== id);
        this.booksSubject.next(updatedBooks);
      }),
      catchError(this.handleError)
    );
  }

  // Toggle read status
  toggleReadStatus(id: string): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}/toggle-read`, {}, this.httpOptions).pipe(
      tap(updatedBook => {
        const books = this.booksSubject.value;
        const index = books.findIndex(b => b.id === updatedBook.id);
        if (index !== -1) {
          const updatedBooks = [
            ...books.slice(0, index),
            updatedBook,
            ...books.slice(index + 1)
          ];
          this.booksSubject.next(updatedBooks);
        }
      }),
      catchError(this.handleError)
    );
  }
}
