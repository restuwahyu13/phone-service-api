import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerCompany {
  createControllerCompany(req: Request, res: Response): Promise<any>
  resultsControllerCompany(req: Request, res: Response): Promise<any>
  resultControllerCompany(req: Request, res: Response): Promise<any>
  deleteControllerCompany(req: Request, res: Response): Promise<any>
  updateControllerCompany(req: Request, res: Response): Promise<any>
}

export interface IServiceCompany {
  createServiceCompany(req: Request): Promise<Record<string, any>>
  resultsServiceCompany(req: Request): Promise<Record<string, any>>
  resultServiceCompany(req: Request): Promise<Record<string, any>>
  deleteServiceCompany(req: Request): Promise<Record<string, any>>
  updateServiceCompany(req: Request): Promise<Record<string, any>>
}

export type ICompany = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  state: string
  city: string
  country: string
  postcode: string
  active: boolean
  created_at?: any
  updated_at?: any
}
