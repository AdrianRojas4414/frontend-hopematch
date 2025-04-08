import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHogarComponent } from './detalle-hogar.component';

describe('DetalleHogarComponent', () => {
  let component: DetalleHogarComponent;
  let fixture: ComponentFixture<DetalleHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleHogarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
