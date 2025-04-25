import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppInputFieldComponent } from '../app-input-field/app-input-field.component';
import { AppButtonComponent } from '../app-button/app-button.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../interfaces/auth.interface';
import { ValidationService } from '../../services/validation.service';
import { FieldConfig, FormConfig, ValidationRule } from '../../interfaces/validation.interface';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppInputFieldComponent,
    AppButtonComponent,
    ValidationErrorsComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
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
      name: [rules['required']],
      username: [rules['required'], rules['minLength3']],
      email: [rules['required'], rules['email']],
      password: [rules['required'], rules['minLength6']],
      confirmPassword: [
        rules['required'],
        {
          name: 'passwordMismatch',
          validator: () => null, // This is handled at the form level
          message: 'Passwords do not match'
        }
      ]
    };

    // Create form configuration
    this.formConfig = {
      fields: [
        {
          name: 'name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter your full name',
          validations: this.fieldValidations['name']
        },
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'Choose a username',
          validations: this.fieldValidations['username']
        },
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
          placeholder: 'Create a password',
          validations: this.fieldValidations['password']
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: 'Confirm your password',
          validations: this.fieldValidations['confirmPassword']
        }
      ],
      formGroupValidators: [this.validationService.passwordMatchValidator]
    };

    // Create form group from configuration
    this.signupForm = this.validationService.createFormGroup(this.formConfig);
  }

  onSubmit(): void {
    // Mark all fields as touched to trigger validation display
    if (this.signupForm.invalid) {
      this.validationService.markFormGroupTouched(this.signupForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { name, username, email, password } = this.signupForm.value;
    const userData: SignupRequest = { name, username, email, password };

    this.authService.signup(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully! Redirecting to login...';

        // Redirect to login page after a short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Failed to create account. Please try again.';
        console.error('Signup error:', error);
      }
    });
  }
}
