export interface DTODevice {
  id: number
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
