import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoVisitasComponent } from './encargado-visitas.component';

describe('EncargadoVisitasComponent', () => {
  let component: EncargadoVisitasComponent;
  let fixture: ComponentFixture<EncargadoVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncargadoVisitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncargadoVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
