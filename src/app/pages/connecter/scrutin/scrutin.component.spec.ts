import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinComponent } from './scrutin.component';

describe('ScrutinComponent', () => {
  let component: ScrutinComponent;
  let fixture: ComponentFixture<ScrutinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrutinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrutinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
