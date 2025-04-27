import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/book.interface';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    AppButtonComponent
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggleRead = new EventEmitter<Book>();

  onEdit(): void {
    this.edit.emit(this.book);
  }

  onDelete(): void {
    this.delete.emit(this.book.id);
  }

  onToggleRead(): void {
    const updatedBook: Book = {
      ...this.book,
      isRead: !this.book.isRead
    };
    this.toggleRead.emit(updatedBook);
  }

  // Format the date to a readable string
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
