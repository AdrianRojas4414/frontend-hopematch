import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoDonacionComponent } from './encargado-donacion.component';

describe('EncargadoDonacionComponent', () => {
  let component: EncargadoDonacionComponent;
  let fixture: ComponentFixture<EncargadoDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncargadoDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncargadoDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
