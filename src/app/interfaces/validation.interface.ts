import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export interface ValidationRule {
  name: string;
  validator: ValidatorFn;
  message: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string;
  validations: ValidationRule[];
  defaultValue?: any;
}

export interface FormConfig {
  fields: FieldConfig[];
  formGroupValidators?: ValidatorFn[];
}

export interface ValidationError {
  field: string;
  errorName: string;
  errorMessage: string;
}
