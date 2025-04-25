import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppInputFieldComponent } from '../app-input-field/app-input-field.component';
import { AppButtonComponent } from '../app-button/app-button.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { FormConfig, ValidationRule } from '../../interfaces/validation.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppInputFieldComponent,
    AppButtonComponent,
    ValidationErrorsComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  formConfig!: FormConfig;
  fieldValidations: { [key: string]: ValidationRule[] } = {};

  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rules = this.validationService.getCommonValidationRules();

    // Define field validations
    this.fieldValidations = {
      email: [rules['required'], rules['email']],
      password: [rules['required'], rules['minLength6']]
    };

    // Create form configuration
    this.formConfig = {
      fields: [
        {
          name: 'email',
          label: 'Email address',
          type: 'email',
          placeholder: 'Enter your email',
          validations: this.fieldValidations['email']
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
          validations: this.fieldValidations['password']
        }
      ]
    };

    

    // Create form group from configuration
    this.loginForm = this.validationService.createFormGroup(this.formConfig);
  }

  onSubmit(): void {
    // Mark all fields as touched to trigger validation display
    if (this.loginForm.invalid) {
      this.validationService.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        // Navigate to home page or dashboard after successful login
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}
