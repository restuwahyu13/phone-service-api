import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerRepair {
  createControllerRepair(req: Request, res: Response): Promise<any>
  resultsControllerRepair(req: Request, res: Response): Promise<any>
  resultControllerRepair(req: Request, res: Response): Promise<any>
  deleteControllerRepair(req: Request, res: Response): Promise<any>
  updateControllerRepair(req: Request, res: Response): Promise<any>
}

export interface IServiceRepair {
  createServiceRepair(req: Request): Promise<Record<string, any>>
  resultsServiceRepair(req: Request): Promise<Record<string, any>>
  resultServiceRepair(req: Request): Promise<Record<string, any>>
  deleteServiceRepair(req: Request): Promise<Record<string, any>>
  updateServiceRepair(req: Request): Promise<Record<string, any>>
}

export type IRepair = {
  service_id: number
  company_id: number
  device_cd: string
  description: string
  active: boolean
  walk_in_service: boolean
  preliminary_check: boolean
  prepayment: boolean
  created_by_id: number
  created_by_screen_id: string
  created_date_time: any
  last_modified_by_id: number
  last_modified_by_screen_id: string
  last_modified_date_time: any
  noted_id?: number
  created_at?: any
  updated_at?: any
}
