import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPadrinosComponent } from './gestion-padrinos.component';

describe('GestionPadrinosComponent', () => {
  let component: GestionPadrinosComponent;
  let fixture: ComponentFixture<GestionPadrinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPadrinosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPadrinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
