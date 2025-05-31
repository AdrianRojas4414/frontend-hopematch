import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-crear-nino',
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-nino.component.html',
  styleUrl: './crear-nino.component.scss'
})
export class CrearNinoComponent implements OnInit {
  public texts = TEXTOS;
  ninoForm!: FormGroup;
  idEncargado!: number;
  necesidadesArray!: FormArray;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    this.idEncargado = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    this.ninoForm = this.fb.group({
      ci: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', [Validators.required, this.validateDateRange.bind(this)]],
      necesidades: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });

    if(this.idEncargado === 0  || !isEncargado){
      this.router.navigate(['#']);
    }

    if(isEncargado){
      this.ninoForm = this.fb.group({
        ci: ['', Validators.required],
        nombre: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        necesidades: this.fb.array([])
      });
      this.necesidadesArray = this.ninoForm.get('necesidades') as FormArray;
    }
  }

  validateDateRange(control: any): {[key: string]: boolean} | null {
    const selectedDate = new Date(control.value);
    const minDate = new Date('2007-01-01');
    const maxDate = new Date('2024-12-31');
    
    if (selectedDate < minDate || selectedDate > maxDate) {
      return { 'invalidDateRange': true };
    }
    return null;
  }

   private mostrarErroresFormulario(): void {
    const controls = this.ninoForm.controls;
    
    if (controls['ci'].errors?.['required']) {
      alert('El campo CI es obligatorio');
    } else if (controls['ci'].errors?.['pattern']) {
      alert('El CI debe contener solo números');
    }

    if (controls['nombre'].errors?.['required']) {
      alert('El campo nombre es obligatorio');
    } else if (controls['nombre'].errors?.['minlength']) {
      alert('El nombre debe tener al menos 3 caracteres');
    }

    if (controls['fechaNacimiento'].errors?.['required']) {
      alert('La fecha de nacimiento es obligatoria');
    } else if (controls['fechaNacimiento'].errors?.['invalidDateRange']) {
      alert('La fecha de nacimiento debe estar entre 2007-2024 (1-18 años)');
    }

    if (controls['necesidades'].errors?.['required'] || 
        controls['necesidades'].errors?.['minlength']) {
      alert('Debe agregar al menos una necesidad');
    }
  }

  addNecesidad(necesidadInput: HTMLInputElement): void {
    const necesidad = necesidadInput.value.trim();
    if (necesidad) {
      this.necesidadesArray.push(this.fb.control(necesidad));
      necesidadInput.value = '';
      this.ninoForm.get('necesidades')?.updateValueAndValidity();
    }
  }

  removeNecesidad(index: number): void {
    this.necesidadesArray.removeAt(index);
    this.ninoForm.get('necesidades')?.updateValueAndValidity();
  }

  onSubmit(): void {
     if (this.ninoForm.invalid) {
      this.mostrarErroresFormulario();
      return;
    }

    this.encargadoService.createNino(this.idEncargado, this.ninoForm.value).subscribe({
      next: () => {
        alert('Niño registrado con éxito');
        this.router.navigate([`/ninos-hogar`]);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert('Hubo un error al registrar el niño');
      }
    });
  }
  
  cancelarRegistro(): void {
    this.router.navigate([`/ninos-hogar`]);
  }
  
}
