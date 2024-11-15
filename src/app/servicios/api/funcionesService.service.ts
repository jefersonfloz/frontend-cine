import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_FUNCION_ADD, API_FUNCION_DELETE, API_FUNCION_GET_ALL, API_FUNCION_GET_PAGINATION, API_FUNCION_UPDATE } from '../../utilidades/domains/URIs';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  public urlGetFunciones: string = API_FUNCION_GET_ALL;
  public urlPaginasFunciones: string = API_FUNCION_GET_PAGINATION;
  public urlAddFuncion: string = API_FUNCION_ADD;
  public urlUpdateFuncion: string = API_FUNCION_UPDATE;
  public urlDeleteFuncion: string = API_FUNCION_DELETE;
  

  constructor(private http:HttpClient) {}

  public getFunciones(): Observable<any>{
    return this.http.get<any>(this.urlGetFunciones);
  }

  public getFuncionesPaginadas(limite: number, offset: number): Observable<any> {
    return this.http.get<any>(`${API_FUNCION_GET_PAGINATION}?limite=${limite}&offset=${offset}`);
  }

  public addFuncion(funcion:any): Observable<any>{
    return this.http.post<any>(this.urlAddFuncion,funcion);
  }

  public updateFuncion(id:number,funcion:any): Observable<any>{
    return this.http.put<any>(`${this.urlUpdateFuncion}/${id}`,funcion);
  }

  public deleteFuncion(id:number):Observable<any>{
    return this.http.delete<any>(`${this.urlDeleteFuncion}/${id}`);
  }

}
