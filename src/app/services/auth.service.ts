import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User, LoginRequest, SignupRequest } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // Important for session-based auth
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check if user is already authenticated
    this.checkAuthStatus();
  }

  // Check if user is already authenticated
  checkAuthStatus(): void {
    this.http.get<User>(`${this.apiUrl}/profile`, this.httpOptions)
      .pipe(
        catchError(() => {
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          return throwError(() => new Error('Not authenticated'));
        })
      )
      .subscribe(user => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      });
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

  // Register a new user
  register(userData: SignupRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData, this.httpOptions)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(this.handleError)
      );
  }

  // Login user
  login(loginData: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, loginData, this.httpOptions)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(this.handleError)
      );
  }

  // Logout user
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, this.httpOptions)
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(['/login']);
        }),
        catchError(this.handleError)
      );
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Update user profile
  updateProfile(id: string, updateData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, updateData, this.httpOptions)
      .pipe(
        tap(updatedUser => {
          this.currentUserSubject.next(updatedUser);
        }),
        catchError(this.handleError)
      );
  }
}
