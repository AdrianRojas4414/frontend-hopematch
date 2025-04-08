import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarEncargadoComponent } from './hogar-encargado.component';

describe('HogarEncargadoComponent', () => {
  let component: HogarEncargadoComponent;
  let fixture: ComponentFixture<HogarEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HogarEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HogarEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
