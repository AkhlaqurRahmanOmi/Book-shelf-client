import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputFieldComponent } from './app-input-field.component';

describe('AppInputFieldComponent', () => {
  let component: AppInputFieldComponent;
  let fixture: ComponentFixture<AppInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
