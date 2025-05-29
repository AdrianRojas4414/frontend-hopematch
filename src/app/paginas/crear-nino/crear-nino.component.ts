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
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    this.encargadoService.createNino(this.idEncargado, this.ninoForm.value).subscribe(() => {
      alert('Niño registrado con éxito');
      this.router.navigate([`/ninos-hogar`]);
    }, error => {
      console.error('Error al registrar niño:', error);
      alert('Hubo un error al registrar el niño');
    });
  }
  
  cancelarRegistro(): void {
    this.router.navigate([`/ninos-hogar`]);
  }
}
