import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearCuentaEncargadoComponent } from './formulario-crear-cuenta-encargado.component';

describe('FormularioCrearCuentaEncargadoComponent', () => {
  let component: FormularioCrearCuentaEncargadoComponent;
  let fixture: ComponentFixture<FormularioCrearCuentaEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearCuentaEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCrearCuentaEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
