import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDonacionComponent } from './detalle-donacion.component';

describe('DetalleDonacionComponent', () => {
  let component: DetalleDonacionComponent;
  let fixture: ComponentFixture<DetalleDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
