import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionElecteurComponent } from './gestion-electeur.component';

describe('GestionElecteurComponent', () => {
  let component: GestionElecteurComponent;
  let fixture: ComponentFixture<GestionElecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionElecteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionElecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
