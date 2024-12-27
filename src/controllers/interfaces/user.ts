export enum Funcao {
  COMPRADOR = "COMPRADOR",
  VISUALIZADOR = "VISUALIZADOR",
  ADMINISTRADOR = "ADMINISTRADOR"
}

export interface ICreateUserRequest {
  emailAcesso: string,
  funcao: Funcao,
  nome: string,
  responsavel: string,
  sobrenome: string,
  gruposVinculados: string[],
  LojasVinculadas: string[],
}

export interface IGetUsers {
  ativo: boolean,
  emailAcesso: string,
  funcao: Funcao,
  id: string,
  linkFoto: string,
  nome: string,
  responsavel: string,
  sobrenome: string,
  gruposVinculados: string[],
  LojasVinculadas: string[],
}