import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPadrinoComponent } from './perfil-padrino.component';

describe('PerfilPadrinoComponent', () => {
  let component: PerfilPadrinoComponent;
  let fixture: ComponentFixture<PerfilPadrinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPadrinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPadrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
