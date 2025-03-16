import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEncargadoComponent } from './perfil-encargado.component';

describe('PerfilEncargadoComponent', () => {
  let component: PerfilEncargadoComponent;
  let fixture: ComponentFixture<PerfilEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
