
export enum StatusTarefa {
  AFazer = 1,
  EmAndamento = 2,
  Concluido = 3
}
export function getStatusTarefaLabel(status: StatusTarefa): string {
  switch (status) {
    case StatusTarefa.AFazer:
      return 'A Fazer';
    case StatusTarefa.EmAndamento:
      return 'Em Andamento';
    case StatusTarefa.Concluido:
      return 'Concluído';
    default:
      return 'Desconhecido';
  }
}
