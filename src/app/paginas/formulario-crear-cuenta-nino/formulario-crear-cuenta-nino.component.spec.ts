import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearCuentaNinoComponent } from './formulario-crear-cuenta-nino.component';

describe('FormularioCrearCuentaNinoComponent', () => {
  let component: FormularioCrearCuentaNinoComponent;
  let fixture: ComponentFixture<FormularioCrearCuentaNinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearCuentaNinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCrearCuentaNinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
