import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-input-field.component.html',
  styleUrl: './app-input-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputFieldComponent),
      multi: true,
    },
  ]
})
export class AppInputFieldComponent implements ControlValueAccessor {
   @Input() label: string = ''; // Label for the input field
  @Input() type: string = 'text'; // Input type (e.g., text, password, email)
  @Input() placeholder: string = ''; // Placeholder text
  @Input() customClass: string = ''; // Custom Tailwind CSS classes

  // FormControl for validation
  control = new FormControl();

  // Internal value
  value: string = '';

  // Function to propagate changes to the parent form
  onChange: any = () => {};
  onTouched: any = () => {};

  // Write value to the input (used by Angular forms)
  writeValue(value: string): void {
    this.value = value || '';
  }

  // Register change handler (used by Angular forms)
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register touched handler (used by Angular forms)
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Handle input changes
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
