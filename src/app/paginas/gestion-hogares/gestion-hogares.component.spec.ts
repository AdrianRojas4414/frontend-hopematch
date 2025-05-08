import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHogaresComponent } from './gestion-hogares.component';

describe('GestionHogaresComponent', () => {
  let component: GestionHogaresComponent;
  let fixture: ComponentFixture<GestionHogaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionHogaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionHogaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
