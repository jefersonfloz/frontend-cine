import { Component, OnDestroy, OnInit} from '@angular/core';
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
  funciones: any[]=[];
  formularioAgregar: boolean = false; //maneja la ventana para agregar una funcion
  nuevaFuncion: any = { idPelicula: '', tipoFuncion: '', horaFuncion: '', fechaFuncion: '', idSala: '' };

  constructor(private funcionesServicio:FuncionesService){}
  
  ngOnInit(): void {
    this.getAllFunciones();
          
  }
  ngOnDestroy(): void {
      
  }
  
  public getAllFunciones():void{
      this.funcionesServicio.getFunciones().subscribe((data)=>{
        this.funciones=data;
        console.log(data);
      })

  }

  public addFuncion(): void {
    this.funcionesServicio.addFuncion(this.nuevaFuncion).subscribe({
      next: () => {
        this.getAllFunciones(); // Actualiza la lista de funciones
        this.formularioAgregar = false; // Oculta el formulario
        this.nuevaFuncion = { idPelicula: '', tipoFuncion: '', horaFuncion: '', fechaFuncion: '', idSala: '' }; // Reinicia el formulario
      },
      error: (error) => {
        console.error('Error al agregar la función:', error);
        alert('Hubo un error al intentar agregar la función.');
      }
    });
  }

  public deleteFuncion(id: number) {
    this.funcionesServicio.deleteFuncion(id).subscribe({
      next: () => {
        this.getAllFunciones();
      },
      error: (error) => {
        // Accede al mensaje devuelto por el backend
        const mensajeError = error.error.respuesta || 'Hubo un error al intentar eliminar la función.';
        console.error('No se pudo eliminar la función:', error);
        alert(mensajeError);  // Muestra el mensaje del backend en la alerta
      }
    });
  }
    
}

