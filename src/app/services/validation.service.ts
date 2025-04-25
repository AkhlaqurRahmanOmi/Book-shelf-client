import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfig, FormConfig, ValidationRule } from '../interfaces/validation.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private fb: FormBuilder) { }

  // Create a form group from a form configuration
  createFormGroup(config: FormConfig): FormGroup {
    const group: any = {};

    config.fields.forEach(field => {
      group[field.name] = [
        field.defaultValue || '',
        this.composeValidators(field.validations)
      ];
    });

    const formGroup = this.fb.group(group);

    // Add form-level validators if provided
    if (config.formGroupValidators && config.formGroupValidators.length > 0) {
      formGroup.setValidators(config.formGroupValidators);
    }

    return formGroup;
  }

  // Combine multiple validators into one
  private composeValidators(validations: ValidationRule[]): ValidatorFn[] {
    if (!validations || validations.length === 0) {
      return [];
    }
    return validations.map(validation => validation.validator);
  }

  // Get validation error message for a specific field and error
  getErrorMessage(fieldName: string, errorName: string, validations: ValidationRule[]): string {
    const validation = validations.find(v => v.name === errorName);
    return validation ? validation.message : 'Invalid field';
  }

  // Check if a form control has a specific error
  hasError(control: AbstractControl | null, errorName: string): boolean {
    return !!control?.errors?.[errorName] && (control.dirty || control.touched);
  }

  // Check if a form control is invalid and touched/dirty
  isInvalidAndTouched(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Mark all form controls as touched to trigger validation display
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      control?.markAsDirty();

      // If it's a nested form group, mark its controls too
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Common validation rules that can be reused across forms
  getCommonValidationRules(): { [key: string]: ValidationRule } {
    return {
      required: {
        name: 'required',
        validator: Validators.required,
        message: 'This field is required'
      },
      email: {
        name: 'email',
        validator: Validators.email,
        message: 'Please enter a valid email address'
      },
      minLength3: {
        name: 'minlength',
        validator: Validators.minLength(3),
        message: 'Must be at least 3 characters long'
      },
      minLength6: {
        name: 'minlength',
        validator: Validators.minLength(6),
        message: 'Must be at least 6 characters long'
      },
      maxLength50: {
        name: 'maxlength',
        validator: Validators.maxLength(50),
        message: 'Cannot exceed 50 characters'
      }
    };
  }

  // Password match validator for use at the form group level
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };
}
