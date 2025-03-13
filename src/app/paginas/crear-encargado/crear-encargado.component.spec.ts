import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEncargadoComponent } from './crear-encargado.component';

describe('CrearEncargadoComponent', () => {
  let component: CrearEncargadoComponent;
  let fixture: ComponentFixture<CrearEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
