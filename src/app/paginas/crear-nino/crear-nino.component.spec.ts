import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNinoComponent } from './crear-nino.component';

describe('CrearNinoComponent', () => {
  let component: CrearNinoComponent;
  let fixture: ComponentFixture<CrearNinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearNinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
