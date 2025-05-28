import { StatusTarefa } from "./statusTarefa-enum";
import { Usuario } from "./usuario-models";


export interface Tarefa {

  id: number;
  nome: string;
  descricao?: string;
  status: StatusTarefa;
  usuarioId?: number;
  usuario?: Usuario; // Navegação para o usuário associado à tarefa
}