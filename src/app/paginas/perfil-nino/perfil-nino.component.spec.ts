import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilNinoComponent } from './perfil-nino.component';

describe('PerfilNinoComponent', () => {
  let component: PerfilNinoComponent;
  let fixture: ComponentFixture<PerfilNinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilNinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilNinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
