import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario/usuario-service.service';
import { Usuario } from '../models/usuario-models';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  constructor(private readonly usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

    getUsuarios() {
      this.usuarioService.getUsuarios().subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log('Usuários recebidos:', data);
          },
        error: (error) => {
          console.error('Erro ao obter usuários:', error);
        },
        complete: () => {
          console.log('Requisição de usuários concluída');
        }
      });
    }

    criarUsuario(){
      const newUsuario: Usuario = {
        nome: 'Fulano de Tal',
        email: 'fulano@email.com'
      };

      this.usuarioService.postUsuario(newUsuario).subscribe({
        next: (data) => {
          console.log('Usuário criado:', data);
          this.getUsuarios();
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        },
        complete: () => {
          console.log('Requisição de criação de usuário concluída');
        }
      });
    }
  }