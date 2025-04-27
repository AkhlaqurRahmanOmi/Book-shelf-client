import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditDialogComponent } from './book-edit-dialog.component';

describe('BookEditDialogComponent', () => {
  let component: BookEditDialogComponent;
  let fixture: ComponentFixture<BookEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
