import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePadrinoComponent } from './detalle-padrino.component';

describe('DetallePadrinoComponent', () => {
  let component: DetallePadrinoComponent;
  let fixture: ComponentFixture<DetallePadrinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePadrinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePadrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
