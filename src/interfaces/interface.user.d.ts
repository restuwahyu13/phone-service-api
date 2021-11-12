import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerUser {
  registerControllerUser(req: Request, res: Response): Promise<any>
  loginControllerUser(req: Request, res: Response): Promise<any>
}

export interface IServiceUser {
  registerServiceUser(req: Request): Promise<Record<string, any>>
  loginServiceUser(req: Request): Promise<Record<string, any>>
}

export type IUser = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
  active: boolean
  role: string
  created_at?: any
  updated_at?: any
}
