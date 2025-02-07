//models: definem a estrutura dos dados a serem guardados  (ex: nome, email, cpf).
export interface ITask {
    id: string;
    descricao: string;
    data: string;
    status: 'completed' | 'in_progress';
}