import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEncargadoComponent } from './editar-encargado.component';

describe('EditarEncargadoComponent', () => {
  let component: EditarEncargadoComponent;
  let fixture: ComponentFixture<EditarEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
