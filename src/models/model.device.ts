import { Model, RelationMappings, RelationMappingsThunk } from 'objection'
import { DTODevice } from '@dto/dto.device'
import { ModelCompany } from '@models/model.company'
import { ModelUser } from '@models/model.user'

export class ModelDevice extends Model implements DTODevice {
  device_id!: number
  company_id!: number
  device_cd!: string
  description!: string
  active!: boolean
  complexity!: string
  created_by_id!: number
  created_by_screen_id!: string
  created_date_time!: any
  last_modified_by_id!: number
  last_modified_by_screen_id!: string
  last_modified_date_time: any
  noted_id?: number
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'device'
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      company: {
        relation: Model.HasOneRelation,
        modelClass: ModelCompany,
        join: {
          from: `${this.tableName}.company_id`,
          to: `${ModelCompany.tableName}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: ModelUser,
        join: {
          from: `${this.tableName}.created_by_id`,
          to: `${ModelUser.tableName}.id`
        }
      }
    }
  }

  model(): typeof ModelDevice {
    return ModelDevice
  }

  $beforeInsert(): void {
    this.created_date_time = new Date(this.created_date_time)
    this.last_modified_date_time = new Date(this.last_modified_date_time)
    this.created_at = new Date()
  }

  $beforeUpdate(): void {
    this.created_date_time = new Date(this.created_date_time)
    this.last_modified_date_time = new Date(this.last_modified_date_time)
    this.updated_at = new Date()
  }
}
