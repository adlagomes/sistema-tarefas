import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Usuario } from '../../models/usuario-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/Usuario`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  putUsuario(id: number, usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario)
  }

  deleteUsuario(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
