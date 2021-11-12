import { Model } from 'objection'
import { DTOUser } from '@dto/dto.user'
import { hashPassword } from '@libs/lib.bcrypt'

export class ModelUser extends Model implements DTOUser {
  id!: number
  first_name!: string
  last_name!: string
  email!: string
  phone!: string
  password!: string
  active!: boolean
  role!: string
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'user'
  }

  model(): typeof ModelUser {
    return ModelUser
  }

  async $beforeInsert(): Promise<void> {
    const password: string = await hashPassword(this.password)
    this.password = password
    this.phone = String(this.phone)
    this.created_at = new Date()
  }

  async $beforeUpdate(): Promise<void> {
    const password = await hashPassword(this.password)
    this.password = password
    this.phone = String(this.phone)
    this.updated_at = new Date()
  }
}
