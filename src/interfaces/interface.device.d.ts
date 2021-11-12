import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerDevice {
  createControllerDevice(req: Request, res: Response): Promise<any>
  resultsControllerDevice(req: Request, res: Response): Promise<any>
  resultControllerDevice(req: Request, res: Response): Promise<any>
  deleteControllerDevice(req: Request, res: Response): Promise<any>
  updateControllerDevice(req: Request, res: Response): Promise<any>
}

export interface IServiceDevice {
  createServiceDevice(req: Request): Promise<Record<string, any>>
  resultsServiceDevice(req: Request): Promise<Record<string, any>>
  resultServiceDevice(req: Request): Promise<Record<string, any>>
  deleteServiceDevice(req: Request): Promise<Record<string, any>>
  updateServiceDevice(req: Request): Promise<Record<string, any>>
}
export type IDevice = {
  device_id: number
  company_id: number
  device_cd: string
  description: string
  active: boolean
  complexity: string
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
