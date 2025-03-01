import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthoriserComponent } from './non-authoriser.component';

describe('NonAuthoriserComponent', () => {
  let component: NonAuthoriserComponent;
  let fixture: ComponentFixture<NonAuthoriserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAuthoriserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAuthoriserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
