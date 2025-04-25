import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, LoginRequest, SignupRequest, AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is stored in localStorage on service initialization
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedToken = localStorage.getItem(this.tokenKey);
    const storedUser = localStorage.getItem(this.userKey);

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        // If there's an error parsing the user, clear storage
        this.clearStorage();
      }
    }
  }

  private clearStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

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

  // For development/testing without a backend
  simulateLogin(email: string, password: string): Observable<User> {
    return of({
      id: '1',
      email: email,
      username: email.split('@')[0]
    }).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        // Store user in localStorage
        localStorage.setItem(this.userKey, JSON.stringify(user));
        localStorage.setItem(this.tokenKey, 'fake-jwt-token');

        // Update subjects
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // Real login with backend
  login(email: string, password: string): Observable<User> {
    // For development without backend, use simulateLogin
    if (!environment.apiUrl) {
      return this.simulateLogin(email, password);
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          // Store token and user
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));

          // Update subjects
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);

          return response.user;
        }),
        catchError(this.handleError)
      );
  }

  // Signup with backend
  signup(userData: SignupRequest): Observable<User> {
    // For development without backend
    if (!environment.apiUrl) {
      return this.simulateLogin(userData.email, userData.password);
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, userData)
      .pipe(
        map(response => {
          // Store token and user
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));

          // Update subjects
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);

          return response.user;
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    // If we have a backend logout endpoint
    if (environment.apiUrl) {
      // Optional: Call logout endpoint
      // this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    }

    // Clear storage and update subjects
    this.clearStorage();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
