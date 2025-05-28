import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../../models/tarefa-models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {
  private apiUrl = `${environment.apiUrl}/Tarefa`;

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}`);
  }

  getTarefasById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  getTarefasPorStatus(status: string): Observable<Tarefa[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<Tarefa[]>(url);
  }

  postTarefas(tarefa: Tarefa): Observable<Tarefa> {

      const payload = {
    nome: tarefa.nome,
    descricao: tarefa.descricao,
    status: tarefa.status,
    usuario_id: tarefa.usuarioId // Observe se o backend usa outro nome (como usuario_id)
  };
  
  console.log('Enviando payload:', payload); // Para debug
  return this.http.post<Tarefa>(this.apiUrl, payload);

    return this.http.post<Tarefa>(`${this.apiUrl}`, tarefa);
  }

  putTarefas(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  deleteTarefas(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
