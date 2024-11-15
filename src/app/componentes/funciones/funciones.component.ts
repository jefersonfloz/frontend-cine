import { Component, OnDestroy, OnInit } from '@angular/core';
import { FuncionesService } from '../../servicios/api/funcionesService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css'
})
export class FuncionesComponent implements OnInit, OnDestroy {
  funciones: any[] = [];
  mostrarAgregar: boolean = false;
  mostrarEditar: boolean = false;
  editarFuncion: any = { idPelicula: '', tipoFuncion: '', horaFuncion: '', fechaFuncion: '', idSala: '' };
  nuevaFuncion: any = { idPelicula: '', tipoFuncion: '', horaFuncion: '', fechaFuncion: '', idSala: '' };
  pagina: number = 1;
  limite: number = 10;
  hayMasFunciones: boolean = true;

  constructor(private funcionesServicio: FuncionesService) {}

  ngOnInit(): void {
    this.getPaginatedFunciones();
  }

  ngOnDestroy(): void {}

  public getAllFunciones(): void {
    this.funcionesServicio.getFunciones().subscribe((data) => {
      this.funciones = data;
      console.log(data);
    });
  }

  
  public getPaginatedFunciones(): void {
    const offset = (this.pagina - 1) * this.limite;
    this.funcionesServicio.getFuncionesPaginadas(this.limite, offset).subscribe({
      next: (data) => {
        this.funciones = data.funciones;
        this.hayMasFunciones = data.funciones.length === this.limite;
      },
      error: (error) => {
        console.error('Error al obtener funciones paginadas:', error);
      }
    });
  }

   // Métodos para cambiar de página
  public siguientePagina(): void {
    if (this.hayMasFunciones) {
      this.pagina++;
      this.getPaginatedFunciones();
    }
  }

  public paginaAnterior(): void {
    if (this.pagina > 1) {
      this.pagina--;
      this.getPaginatedFunciones();
    }
  }

  public addFuncion(): void {
    if (!this.nuevaFuncion.idPelicula || !this.nuevaFuncion.horaFuncion || !this.nuevaFuncion.fechaFuncion || !this.nuevaFuncion.idSala) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    this.funcionesServicio.addFuncion(this.nuevaFuncion).subscribe({
      next: () => {
        this.getPaginatedFunciones();
        this.mostrarAgregar = false;
        this.resetFormulario();
      },
      error: (error) => {
        const mensajeError = error.error.respuesta || 'Hubo un error al intentar agregar la función.';
        console.error('No se pudo agregar la función:', error);
        alert(mensajeError);
      }
    });
  }

  public openEdit(funcion: any): void {
    this.editarFuncion = { ...funcion };
    this.mostrarEditar = true;
  }
  

  public updateFuncion(): void {
    this.resetFormulario();
    if (!this.editarFuncion.idPelicula || !this.editarFuncion.horaFuncion || !this.editarFuncion.fechaFuncion || !this.editarFuncion.idSala) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    
    this.funcionesServicio.updateFuncion(this.editarFuncion.idFuncion, this.editarFuncion).subscribe({
      next: () => {
        this.getPaginatedFunciones();
        this.mostrarEditar = false;
        this.resetFormulario();
      },
      error: (error) => {
        alert(error.error.respuesta || 'Error al actualizar la función.');
      }
    });
  }

  private resetFormulario(): void {
    this.nuevaFuncion = { idPelicula: '', tipoFuncion: '', horaFuncion: '', fechaFuncion: '', idSala: '' };
  }

  public deleteFuncion(id: number) {
    this.funcionesServicio.deleteFuncion(id).subscribe({
      next: () => {
        this.getPaginatedFunciones();
      },
      error: (error) => {
        const mensajeError = error.error.respuesta || 'Hubo un error al intentar eliminar la función.';
        console.error('No se pudo eliminar la función:', error);
        alert(mensajeError);
      }
    });
  }
}
