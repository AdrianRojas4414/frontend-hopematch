import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAdministradorComponent } from './editar-administrador.component';
import { AdministradorService } from '../../servicios/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('EditarAdministradorComponent', () => {
  let component: EditarAdministradorComponent;
  let fixture: ComponentFixture<EditarAdministradorComponent>;
  let mockAdminService: jasmine.SpyObj<AdministradorService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockAdminService = jasmine.createSpyObj('AdministradorService', ['getAdministradorById', 'updateAdministrador']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [EditarAdministradorComponent],
      providers: [
        { provide: AdministradorService, useValue: mockAdminService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAdministradorComponent);
    component = fixture.componentInstance;

    mockAdminService.getAdministradorById.and.returnValue(of({ 
      id: 1, 
      nombre: 'Admin', 
      email: 'admin@example.com' 
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});