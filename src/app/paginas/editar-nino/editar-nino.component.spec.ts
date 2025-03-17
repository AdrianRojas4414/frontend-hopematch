import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNinoComponent } from './editar-nino.component';

describe('EditarNinoComponent', () => {
  let component: EditarNinoComponent;
  let fixture: ComponentFixture<EditarNinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarNinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


