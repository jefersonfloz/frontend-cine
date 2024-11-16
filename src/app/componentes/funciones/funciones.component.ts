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
  mensajeExito: string = '';
  mensajeError: string = '';
  mostrarMensajeExito: boolean = false; 
  mostrarMensajeError: boolean = false;  


  constructor(private funcionesServicio: FuncionesService) {}

  ngOnInit(): void {
    this.getPaginatedFunciones();
  }

  ngOnDestroy(): void {}

  public getPaginatedFunciones(): void {
    const offset = (this.pagina - 1) * this.limite;
    this.funcionesServicio.getFuncionesPaginadas(this.limite, offset).subscribe({
      next: (data) => {
        this.funciones = data.funciones;
        // Si la cantidad de funciones obtenidas es menor que el límite, desactivamos el botón "Siguiente"
        this.hayMasFunciones = data.funciones.length === this.limite;

        // Si la página actual está vacía después de una eliminación, volvemos a la página anterior
        if (this.funciones.length === 0 && this.pagina > 1) {
          this.pagina--;
          this.getPaginatedFunciones();
        }
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
      next: (respuesta) => {
        this.getPaginatedFunciones();
        this.mostrarAgregar = false;

        this.mensajeExito = `Función agregada correctamente. ID de la función: ${respuesta.idFuncion}`;
        this.mostrarMensajeExito = true;  // Muestra el mensaje de éxito
        setTimeout(() => this.mostrarMensajeExito = false, 5000);  // Oculta el mensaje después de 5 segundos

        this.resetFormulario();
      },
      error: (error) => {
        this.mensajeError = error.error.respuesta || 'Hubo un error al intentar agregar la función.';
        console.error('No se pudo agregar la función:', error);
        this.mostrarMensajeError = true;  // Muestra el mensaje de error
        setTimeout(() => this.mostrarMensajeError = false, 5000);  // Oculta el mensaje después de 5 segundos
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
      next: (respuesta) => {
        this.getPaginatedFunciones();
        this.mostrarEditar = false;
        this.mensajeExito = `Función actualizada correctamente.`;
        this.mostrarMensajeExito = true;  // Muestra el mensaje de éxito
        setTimeout(() => this.mostrarMensajeExito = false, 5000); 
        this.resetFormulario();
      },
      error: (error) => {
        this.mensajeError = error.error.respuesta || 'Hubo un error al intentar actualiar la función.';
        console.error('No se pudo agregar la función:', error);
        this.mostrarMensajeError = true;  // Muestra el mensaje de error
        setTimeout(() => this.mostrarMensajeError = false, 5000);
      }
    });
  }

  private resetFormulario(): void {
    this.nuevaFuncion = { idPelicula: '', tipoFuncion: '', horaFuncion: '', fechaFuncion: '', idSala: '' };
  }

 public deleteFuncion(id: number): void {
    this.funcionesServicio.deleteFuncion(id).subscribe({
      next: (respuesta) => {
        if (respuesta.respuesta === "Función eliminada correctamente") {
          const { idFuncion, idPelicula, horaFuncion, fechaFuncion, idSala } = respuesta.funcionEliminada;
          this.mensajeExito = `Función eliminada correctamente. 
          ID de la función: ${idFuncion}, Pelicula: ${idPelicula}, Hora: ${horaFuncion}, Fecha: ${fechaFuncion}, Sala: ${idSala}`;
          this.mostrarMensajeExito = true;  // Muestra el mensaje de éxito
          setTimeout(() => this.mostrarMensajeExito = false, 5000);  // Oculta el mensaje después de 5 segundos
          this.getPaginatedFunciones();
        }
      },
      error: (error) => {
        this.mensajeError = error.error.respuesta || 'Hubo un error al intentar eliminar la función.';
        this.mostrarMensajeError = true;  // Muestra el mensaje de error
        setTimeout(() => this.mostrarMensajeError = false, 5000);  // Oculta el mensaje después de 5 segundos
      }
    });
  }

  
}
