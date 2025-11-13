import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHost } from './profile-host';

describe('ProfileHost', () => {
  let component: ProfileHost;
  let fixture: ComponentFixture<ProfileHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
