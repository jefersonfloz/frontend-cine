import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_FUNCION_ADD, API_FUNCION_DELETE, API_FUNCION_GET_ALL } from '../../utilidades/domains/URIs';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  public urlGetFunciones: string = API_FUNCION_GET_ALL;
  public urlDeleteFuncion: string = API_FUNCION_DELETE;
  public urlAddFuncion: string = API_FUNCION_ADD;


  constructor(private http:HttpClient) {}

  public getFunciones(): Observable<any>{
    return this.http.get<any>(this.urlGetFunciones);
  }

  public deleteFuncion(id:number):Observable<any>{
    return this.http.delete<any>(`${this.urlDeleteFuncion}/${id}`);
  }

  public addFuncion(funcion:any): Observable<any>{
    return this.http.post<any>(this.urlAddFuncion,funcion);
  }


  
}
