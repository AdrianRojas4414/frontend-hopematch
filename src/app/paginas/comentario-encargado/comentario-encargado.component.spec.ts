import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioEncargadoComponent } from './comentario-encargado.component';

describe('ComentarioEncargadoComponent', () => {
  let component: ComentarioEncargadoComponent;
  let fixture: ComponentFixture<ComentarioEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
