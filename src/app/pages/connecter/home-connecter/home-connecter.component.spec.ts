import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConnecterComponent } from './home-connecter.component';

describe('HomeConnecterComponent', () => {
  let component: HomeConnecterComponent;
  let fixture: ComponentFixture<HomeConnecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeConnecterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeConnecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
