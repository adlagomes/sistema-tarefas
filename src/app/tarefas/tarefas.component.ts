import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../service/tarefa/tarefa-service.service';
import { Tarefa } from '../models/tarefa-models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: false,
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent implements OnInit {
  statusSelecionado: string = '1';
  tarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[] = [];

  novaTarefa: Omit<Tarefa, 'id' | 'usuario'> = {
    nome: '',
    descricao: '',
    status: 1,
    usuarioId: undefined
  };

  constructor(private readonly tarefaService: TarefaService) { }
  
  ngOnInit(): void {
    this.getTarefas();
  }

  getTarefas() {
    this.tarefaService.getTarefas().subscribe({
      next: (data) => {
        this.tarefas = data;
        this.filtrarTarefas();
        console.log('Tarefas recebidas:', data);
      },
      error: (error) => {
        console.error('Erro ao obter tarefas:', error);
      },
      complete: () => {
        console.log('Requisição de tarefas concluída');
      }
    })
  }

  filtrarTarefas() {
    if (!this.statusSelecionado) {
      this.tarefasFiltradas = [...this.tarefas];
    } else {
      const statusNum = Number(this.statusSelecionado);
      this.tarefasFiltradas = this.tarefas.filter(t => t.status === statusNum);
    }
  }

  postTarefa(form: NgForm) {

    if(this.novaTarefa.usuarioId !== undefined && this.novaTarefa.usuarioId < 0) {
      alert('O ID do usuário não pode ser menor que 0');
      return;
    }

    if(form.invalid) return;

    this.tarefaService.postTarefas({
      ...this.novaTarefa,
      status: parseInt(this.novaTarefa.status.toString())
    } as Tarefa).subscribe({
      next: (data) => {
        console.log('Tarefa criada com sucesso:', data);
        this.getTarefas(); // Atualiza a lista de tarefas após criar
        // form.resetForm();
        // this.novaTarefa = {
        //   nome: '',
        //   descricao: '',
        //   status: 1,
        //   usuarioId: undefined 
        // } // Reseta o formulário após a criação
      },
      error: (error) => {
        console.error('Erro ao criar tarefa:', error);
      }
    });
  }

  putTarefa(id: number, tarefa: Tarefa) {

    const tarefaAtualizada = {
      id: tarefa.id,
      nome: tarefa.nome,
      descricao: tarefa.descricao,
      status: typeof tarefa.status === 'string' ? parseInt(tarefa.status) : tarefa.status,
      usuario: tarefa.usuario
    };

    console.log('Enviando para API:', tarefaAtualizada); // Para debug

    this.tarefaService.putTarefas(id, tarefaAtualizada).subscribe({
      next: (data) => {
        console.log('Tarefa atualizada com sucesso:', data);
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index !== -1) {
        this.tarefas[index] = { ...tarefaAtualizada };
        this.filtrarTarefas();
        // form.resetForm();
        // this.novaTarefa = {
        //   nome: '',
        //   descricao: '',
        //   status: 1,
        //   usuarioId: undefined 
        // } // Reseta o formulário após a criação
        
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar tarefa:', error);
      },
      complete: () => {
        console.log('Requisição de atualização de tarefa concluída');
      }
    });
  }
  
  deleteTarefas(id: number) {
    if(confirm('Tem certeza que deseja excluir?')) {
      this.tarefaService.deleteTarefas(id).subscribe({
        next: () => {
          console.log(`Tarefa com ID ${id} removida com sucesso.`);
          this.getTarefas(); // Atualiza a lista de tarefas após remover
        },
        error: (error) => {
          console.error(`Erro ao remover tarefa com ID ${id}:`, error);
        },
        complete: () => {
          console.log(`Requisição de remoção de tarefa com ID ${id} concluída`);
        }
      });
    }
    
  }

  getStatusText(status: number): string {
    switch(status) {
      case 1: return 'A fazer';
      case 2: return 'Em andamento';
      case 3: return 'Concluído';
      default: return 'Desconhecido';
    }
  }
}
