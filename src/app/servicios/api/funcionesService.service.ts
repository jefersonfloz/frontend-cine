import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_GET_ALL } from '../../utilidades/domains/URIs';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  public urlFunciones: string = API_GET_ALL;

  constructor(private http:HttpClient) {}

  public getFunciones(): Observable<any>{
    return this.http.get<any>(this.urlFunciones);
  }

  
}
