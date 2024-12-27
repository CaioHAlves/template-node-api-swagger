import { Funcao } from "../../controllers/interfaces/user";

export interface GetParamsList { 
  nome?: string, 
  emailAcesso?: string, 
  funcao?: Funcao, 
  ativo?: boolean, 
  page?: number, 
  limit?: number, 
  sort?: string, 
  direction?: 'asc' | 'desc' 
}