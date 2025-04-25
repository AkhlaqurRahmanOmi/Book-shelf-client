import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { ValidationRule } from '../../interfaces/validation.interface';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.css'
})
export class ValidationErrorsComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';
  @Input() validationRules: ValidationRule[] = [];

  constructor(private validationService: ValidationService) {}

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors || !this.validationService.isInvalidAndTouched(this.control)) {
      return [];
    }

    return Object.keys(this.control.errors)
      .map(errorKey => {
        const rule = this.validationRules.find(r => r.name === errorKey);
        return rule ? rule.message : `Invalid ${this.fieldName}`;
      });
  }
}
