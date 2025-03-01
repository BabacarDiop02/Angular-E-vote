import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionResultatComponent } from './gestion-resultat.component';

describe('GestionResultatComponent', () => {
  let component: GestionResultatComponent;
  let fixture: ComponentFixture<GestionResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionResultatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
