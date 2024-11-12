import { Component, OnDestroy, OnInit} from '@angular/core';
import { FuncionesService } from '../../servicios/api/funcionesService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css'
})
export class FuncionesComponent implements OnInit, OnDestroy {
    funciones: any[]=[];

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


}

