import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadrinosSuspendidosComponent } from './padrinos-suspendidos.component';

describe('PadrinosSuspendidosComponent', () => {
  let component: PadrinosSuspendidosComponent;
  let fixture: ComponentFixture<PadrinosSuspendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadrinosSuspendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadrinosSuspendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
