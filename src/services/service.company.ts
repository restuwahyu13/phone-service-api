import { StatusCodes as status } from 'http-status-codes'
import { ModelCompany } from '@models/model.company'
import { ModelRepair } from '@models/model.repair'
import { ModelDevice } from '@models/model.device'
import { IServiceCompany, ICompany } from '@interfaces/interface.company'
import { Request } from '@helpers/helper.generic'

export class ServiceCompany extends ModelCompany implements IServiceCompany {
  /**
   * @method POST
   * @description function for create new company
   */

  public async createServiceCompany(req: Request<ICompany>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelCompany[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkCompany: ModelCompany = await super
        .model()
        .query()
        .where('name', req.body.name)
        .orWhere('email', req.body.email)
        .orWhere('phone', req.body.phone)
        .first()

      if (checkCompany) {
        throw { code: status.CONFLICT, message: 'Company name, email or phone already exist' }
      }

      const addNewCompany: ModelCompany = await super.model().query().insert(req.body)

      if (!addNewCompany) {
        throw { code: status.FORBIDDEN, message: 'Add new company failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Add new company success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for results all company
   */

  public async resultsServiceCompany(req: Request<ICompany>): Promise<Record<string, any>> {
    try {
      const limit: any = parseInt(req.query.limit as any) || 10
      const offset: any = parseInt(req.query.offset as any) || 0
      const sort: any = req.query.sort || 'desc'
      const perpage = limit
      const countData: ModelCompany[] = await super.model().query().select('id')
      const totalPage: number = Math.ceil(countData.length / perpage)

      const getCompanys: ModelCompany[] = await super.model().query().limit(limit).offset(offset).orderBy('id', sort)

      if (!getCompanys) {
        throw { code: status.NOT_FOUND, message: 'Companys data not found' }
      }

      const newGetCompanys: Record<string, any>[] = getCompanys.map(async (val: Record<string, any>) => {
        const getDevice: ModelDevice = await ModelDevice.query().where('company_id', val.id).first()
        const getRepair: ModelRepair = await ModelRepair.query().where('company_id', val.id).first()

        return {
          id: val.id,
          name: val.name,
          email: val.email,
          phone: val.phone,
          address: val.address,
          state: val.state,
          city: val.city,
          country: val.city,
          postcode: val.postcode,
          active: val.active,
          created_at: val.created_at,
          updated_at: val.updated_at,
          device: {
            id: getDevice.id,
            device_cd: getDevice.device_cd,
            description: getDevice.description,
            active: getDevice.active,
            complexity: getDevice.complexity,
            created_by_id: getDevice.created_by_id,
            created_by_screen_id: getDevice.created_by_screen_id,
            created_date_time: getDevice.created_date_time,
            last_modified_by_id: getDevice.last_modified_by_id,
            last_modified_by_screen_id: getDevice.last_modified_by_screen_id,
            last_modified_date_time: getDevice.last_modified_date_time
          },
          repair: {
            id: getRepair.id,
            company_id: getRepair.company_id,
            service_cd: getRepair.service_cd,
            description: getRepair.description,
            active: getRepair.active,
            walk_in_service: getRepair.walk_in_service,
            preliminary_check: getRepair.preliminary_check,
            prepayment: getRepair.prepayment,
            created_by_id: getRepair.created_by_id,
            created_by_screen_id: getRepair.created_by_screen_id,
            created_date_time: getRepair.created_date_time,
            last_modified_by_id: getRepair.last_modified_by_id,
            last_modified_by_screen_id: getRepair.last_modified_by_screen_id,
            last_modified_date_time: getRepair.last_modified_date_time
          }
        }
      })

      const companys: Record<string, any>[] = []

      for (let i in newGetCompanys) {
        const res = await newGetCompanys[i]
        companys.push(res)
      }

      return Promise.resolve({
        code: status.OK,
        message: 'Companys OK',
        companys: { count: countData.length, limit, page: totalPage, offset, data: companys }
      })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for result company data by specific id
   */

  public async resultServiceCompany(req: Request<ICompany>): Promise<Record<string, any>> {
    try {
      const getCompany: Record<string, any> = await super.model().query().findById(req.params.id)

      if (!getCompany) {
        throw { code: status.NOT_FOUND, message: `Company data not found, for this id ${req.params.id}` }
      }

      const getDevice: ModelDevice = await ModelDevice.query().where('company_id', getCompany.id).first()
      const getRepair: ModelRepair = await ModelRepair.query().where('company_id', getCompany.id).first()

      const getNewServiceCompany: Record<string, any> = {
        id: getCompany.id,
        name: getCompany.name,
        email: getCompany.email,
        phone: getCompany.phone,
        address: getCompany.address,
        state: getCompany.state,
        city: getCompany.city,
        country: getCompany.city,
        postcode: getCompany.postcode,
        active: getCompany.active,
        created_at: getCompany.created_at,
        updated_at: getCompany.updated_at,
        device: {
          id: getDevice.id,
          device_cd: getDevice.device_cd,
          description: getDevice.description,
          active: getDevice.active,
          complexity: getDevice.complexity,
          created_by_id: getDevice.created_by_id,
          created_by_screen_id: getDevice.created_by_screen_id,
          created_date_time: getDevice.created_date_time,
          last_modified_by_id: getDevice.last_modified_by_id,
          last_modified_by_screen_id: getDevice.last_modified_by_screen_id,
          last_modified_date_time: getDevice.last_modified_date_time
        },
        repair: {
          id: getRepair.id,
          company_id: getRepair.company_id,
          service_cd: getRepair.service_cd,
          description: getRepair.description,
          active: getRepair.active,
          walk_in_service: getRepair.walk_in_service,
          preliminary_check: getRepair.preliminary_check,
          prepayment: getRepair.prepayment,
          created_by_id: getRepair.created_by_id,
          created_by_screen_id: getRepair.created_by_screen_id,
          created_date_time: getRepair.created_date_time,
          last_modified_by_id: getRepair.last_modified_by_id,
          last_modified_by_screen_id: getRepair.last_modified_by_screen_id,
          last_modified_date_time: getRepair.last_modified_date_time
        }
      }

      return Promise.resolve({ code: status.OK, message: 'Company OK', device: getNewServiceCompany })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }

  /**
   * @method DELETE
   * @description function for delete specific service company by id
   */

  public async deleteServiceCompany(req: Request<ICompany>): Promise<Record<string, any>> {
    try {
      const checkCompanyId: ModelCompany = await super.model().query().findById(req.params.id)

      if (!checkCompanyId) {
        throw { code: status.NOT_FOUND, message: `Company data not found, for this id ${req.params.id}` }
      }

      const deleteCompany: number = await super.model().query().deleteById(checkCompanyId.id)

      if (!deleteCompany) {
        throw { code: status.FORBIDDEN, message: `Delete company data, for this id ${req.params.id} failed` }
      }

      return Promise.resolve({ code: status.OK, message: `Delete company data, for this id ${req.params.id} success` })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for update specific company by id
   */

  public async updateServiceCompany(req: Request<ICompany>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelCompany[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkCompanyId: ModelCompany = await super.model().query().findById(req.params.id)

      if (!checkCompanyId) {
        throw { code: status.NOT_FOUND, message: `Company data not found, for this id ${req.params.id}` }
      }

      const updateCompany: ModelCompany = await super.model().query().updateAndFetchById(req.params.id, req.body)

      if (!updateCompany) {
        throw { code: status.FORBIDDEN, message: 'Update company data failed' }
      }

      return Promise.resolve({ code: status.OK, message: 'Update company data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }
}
