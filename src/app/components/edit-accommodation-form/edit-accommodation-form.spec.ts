import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccommodationFormComponent } from './edit-accommodation-form';

describe('EditAccommodationFormComponent', () => {
  let component: EditAccommodationFormComponent;
  let fixture: ComponentFixture<EditAccommodationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccommodationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccommodationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
