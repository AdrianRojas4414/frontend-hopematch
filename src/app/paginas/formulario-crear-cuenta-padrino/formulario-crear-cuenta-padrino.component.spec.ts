import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearCuentaPadrinoComponent } from './formulario-crear-cuenta-padrino.component';

describe('FormularioCrearCuentaPadrinoComponent', () => {
  let component: FormularioCrearCuentaPadrinoComponent;
  let fixture: ComponentFixture<FormularioCrearCuentaPadrinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearCuentaPadrinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCrearCuentaPadrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
