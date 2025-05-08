import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNinosComponent } from './gestion-ninos.component';

describe('GestionNinosComponent', () => {
  let component: GestionNinosComponent;
  let fixture: ComponentFixture<GestionNinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionNinosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionNinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
