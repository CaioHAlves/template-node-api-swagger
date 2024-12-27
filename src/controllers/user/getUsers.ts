import { Controller, Get, Route, Tags, Query } from 'tsoa';
import { User } from '../../models/user';
import { Funcao, IGetUsers } from '../interfaces/user';
import { SortOrder } from 'mongoose';

type Item = Omit<IGetUsers, "gruposVinculados" | "LojasVinculadas" | "ativo" | "responsavel">

interface GetUsersResponse {
  items: Array<Item>
  totalPages: number
  message?: string
  code: number
}

@Route('users')
@Tags('Users')
export class GetUsers extends Controller {
  @Get('/get')
  static async getUsers(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() nome?: string,
    @Query() emailAcesso?: string,
    @Query() funcao?: Funcao,
    @Query() ativo?: boolean,
    @Query() sort?: string,
    @Query() direction?: 'asc' | 'desc'
  ): Promise<GetUsersResponse> {

    let filter: { [key: string]: string | Funcao | boolean } = {}

    if (nome) {
      filter["nome"] = nome
    }
    if (emailAcesso) {
      filter["emailAcesso"] = emailAcesso
    }
    if (funcao) {
      filter["funcao"] = funcao
    }
    if (ativo) {
      filter["ativo"] = ativo
    }

    let sortObject: { [key: string]: SortOrder } = {}
    if (sort) {
      const sortFields = sort.split(',')
      const directionFields = direction ? direction.split(',') : []

      sortFields.forEach((field, index) => {
        const dir = directionFields[index] === 'desc' ? -1 : 1
        sortObject[field.trim()] = dir
      });
    }
    
    const users = await User.find(filter).sort(sortObject)

    const pageApi = page || 1
    const limitApi = limit || 10
    const nextPage = limitApi * (pageApi - 1)

    const list: Array<Item> = users.map(user => ({
      id: user.id,
      emailAcesso: user.emailAcesso,
      funcao: user.funcao as Funcao,
      linkFoto: user.linkFoto || "",
      nome: user.nome,
      sobrenome: user.sobrenome
    })).slice(nextPage, nextPage + limitApi)

    const totalPages = Math.ceil(list.length / limitApi)

    return {
      items: list,
      totalPages: totalPages,
      message: '',
      code: 200,
    };
  }
}
