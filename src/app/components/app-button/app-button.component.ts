import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.css',
})
export class AppButtonComponent {
  // Input properties to customize the button
  @Input() label: string = 'Submit'; // Default label
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type
  @Input() disabled: boolean = false; // Disable state
  @Input() customClass: string = ''; // Custom CSS classes
  @Input() variant: ButtonVariant = 'primary'; // Button variant
  @Input() size: ButtonSize = 'medium'; // Button size
  @Input() fullWidth: boolean = false; // Full width button
  @Input() isLoading: boolean = false; // Loading state

  // Output event when the button is clicked
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled && !this.isLoading) {
      this.onClick.emit();
    }
  }
}
