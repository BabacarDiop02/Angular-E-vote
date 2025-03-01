import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElectorComponent } from './add-elector.component';

describe('AddElectorComponent', () => {
  let component: AddElectorComponent;
  let fixture: ComponentFixture<AddElectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddElectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddElectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
