import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccommodation } from './edit-accommodation';

describe('EditAccommodation', () => {
  let component: EditAccommodation;
  let fixture: ComponentFixture<EditAccommodation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccommodation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccommodation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
