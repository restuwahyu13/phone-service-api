import { Model } from 'objection'
import { DTOCompany } from '@dto/dto.company'

export class ModelCompany extends Model implements DTOCompany {
  id!: number
  name!: string
  email!: string
  phone!: number
  address!: string
  state!: string
  city!: string
  country!: string
  postcode!: number
  active!: boolean
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'company'
  }

  model(): typeof ModelCompany {
    return ModelCompany
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate(): void {
    this.updated_at = new Date()
  }
}
