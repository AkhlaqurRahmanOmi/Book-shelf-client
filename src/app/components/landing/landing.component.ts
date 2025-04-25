import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { AppButtonComponent } from '../app-button/app-button.component';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    AppButtonComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit, OnDestroy {
  appName: string = 'BookShelf';
  redirectDelay: number = 10; // 10 seconds
  progress: number = 0;
  countdownText: string = '';
  private subscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Create a countdown timer that updates every 100ms
    this.subscription = interval(100).pipe(
      take(this.redirectDelay * 10 + 1) // +1 to ensure we reach 100%
    ).subscribe(count => {
      // Calculate progress percentage
      this.progress = (count / (this.redirectDelay * 10)) * 100;

      // Calculate remaining seconds
      const remainingSeconds = Math.ceil((this.redirectDelay * 10 - count) / 10);
      this.countdownText = `Redirecting in ${remainingSeconds} seconds...`;

      // Redirect when complete
      if (count === this.redirectDelay * 10) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Skip the countdown and go directly to login
  skipIntro(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.router.navigate(['/login']);
  }
}
