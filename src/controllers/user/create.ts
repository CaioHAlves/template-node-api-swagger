import { Controller, Post, Body, Route, Tags } from 'tsoa'
import { User } from '../../models/user'
import { ICreateUserRequest } from '../interfaces/user'

interface CreateUserResponse {
  message?: string
  code: number
  idUsuario?: string
}

@Route("users")
@Tags("Users")
export class UserCreate extends Controller {
  @Post('/create')
  static async create(@Body() body: ICreateUserRequest): Promise<CreateUserResponse> {
    
    const { emailAcesso } = body

    const existUser = await User.findOne({ emailAcesso })

    if (!emailAcesso) {
      return { message: "Um email é necessário para realizar o cadastro", code: 422 }
    }

    if (existUser && existUser.emailAcesso === emailAcesso) {
      return { message: "Já existe usuário com esse email", code: 422 }
    }

    const newUser = {
      ...body,
      linkFoto: "",
      ativo: true,
      gruposVinculados: [],
      lojasVinculadas: []
    }

    return User.create(newUser)
      .then((res) => {
        return {
          message: "Create",
          code: 200,
          idUsuario: res.id
        }
      })
      .catch((err) => {
        console.log(err)
        return {
          message: "Erro ao criar usuario",
          code: 422
        }
      })
  }
}