import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPadrinoComponent } from './crear-padrino.component';

describe('CrearPadrinoComponent', () => {
  let component: CrearPadrinoComponent;
  let fixture: ComponentFixture<CrearPadrinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPadrinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPadrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
