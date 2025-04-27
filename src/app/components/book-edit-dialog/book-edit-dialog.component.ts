import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../interfaces/book.interface';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppInputFieldComponent } from '../app-input-field/app-input-field.component';

@Component({
  selector: 'app-book-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppButtonComponent,
    AppInputFieldComponent
  ],
  templateUrl: './book-edit-dialog.component.html',
  styleUrl: './book-edit-dialog.component.css'
})
export class BookEditDialogComponent implements OnInit {
  @Input() book: Book | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  bookForm!: FormGroup;
  dialogTitle = 'Add New Book';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.bookForm && this.book) {
      this.dialogTitle = 'Edit Book';
      this.bookForm.patchValue({
        title: this.book.title,
        author: this.book.author,
        description: this.book.description,
        coverImage: this.book.coverImage,
        genre: this.book.genre,
        publishedYear: this.book.publishedYear,
        rating: this.book.rating,
        isRead: this.book.isRead
      });
    } else if (this.bookForm) {
      this.dialogTitle = 'Add New Book';
      this.bookForm.reset({
        isRead: false
      });
    }
  }

  private initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      coverImage: [''],
      genre: [''],
      publishedYear: [null, [Validators.min(1000), Validators.max(new Date().getFullYear())]],
      rating: [null, [Validators.min(0), Validators.max(5)]],
      isRead: [false]
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.bookForm.controls).forEach(key => {
        const control = this.bookForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    // Just emit the form value directly
    // The parent component will handle creating the proper DTO
    this.save.emit(this.bookForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
