import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPadrinoComponent } from './editar-padrino.component';
import { PadrinoService } from '../../servicios/padrino.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('EditarPadrinoComponent', () => {
  let component: EditarPadrinoComponent;
  let fixture: ComponentFixture<EditarPadrinoComponent>;
  let mockPadrinoService: jasmine.SpyObj<PadrinoService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockPadrinoService = jasmine.createSpyObj('PadrinoService', ['getPadrinoById', 'updatePadrino']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1') 
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [EditarPadrinoComponent],
      providers: [
        { provide: PadrinoService, useValue: mockPadrinoService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPadrinoComponent);
    component = fixture.componentInstance;

    mockPadrinoService.getPadrinoById.and.returnValue(of({ id: 1, nombre: 'Juan', email: 'juan@example.com' }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});