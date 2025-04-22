import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilAdministradorComponent } from './perfil-administrador.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PerfilAdministradorComponent', () => {
  let component: PerfilAdministradorComponent;
  let fixture: ComponentFixture<PerfilAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PerfilAdministradorComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});