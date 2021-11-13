import { StatusCodes as status } from 'http-status-codes'
import { ModelRepair } from '@models/model.repair'
import { IServiceRepair, IRepair } from '@interfaces/interface.repair'
import { Request } from '@helpers/helper.generic'

export class ServiceRepair extends ModelRepair implements IServiceRepair {
  /**
   * @method POST
   * @description function for create new service repair
   */

  public async createServiceRepair(req: Request<IRepair>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelRepair[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkServiceRepairCode: ModelRepair = await super.model().query().findOne({ service_cd: req.body.service_cd })

      if (checkServiceRepairCode) {
        throw { code: status.CONFLICT, message: 'Service repair code already exist' }
      }

      const addNewServiceRepair: ModelRepair = await super.model().query().insert(req.body)

      if (!addNewServiceRepair) {
        throw { code: status.FORBIDDEN, message: 'Add new service repair failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Add new service repair success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for results all service repair
   */

  public async resultsServiceRepair(req: Request<IRepair>): Promise<Record<string, any>> {
    try {
      const limit: any = parseInt(req.query.limit as any) || 10
      const offset: any = parseInt(req.query.offset as any) || 0
      const sort: any = req.query.sort || 'desc'
      const perpage = limit
      const countData: ModelRepair[] = await super.model().query().select('id')
      const totalPage: number = Math.ceil(countData.length / perpage)

      const getServiceRepairs: ModelRepair[] = await super
        .model()
        .query()
        .select(
          'repair_service.*',
          'company.*',
          'company.id as companyId',
          'company.email as companyEmail',
          'company.phone as companyPhone',
          'user.*'
        )
        .join('company', 'repair_service.company_id', '=', 'company.id')
        .join('user', 'repair_service.created_by_id', '=', 'user.id')
        .limit(limit)
        .offset(offset)
        .orderBy('repair_service.id', sort)

      if (!getServiceRepairs) {
        throw { code: status.NOT_FOUND, message: 'Devices data not found' }
      }

      const newGetServiceRepairs: Record<string, any>[] = getServiceRepairs.map((val: Record<string, any>) => {
        return {
          service_id: val.service_id,
          service_cd: val.service_cd,
          description: val.description,
          active: val.active,
          walk_in_service: val.walk_in_service,
          preliminary_check: val.preliminary_check,
          prepayment: val.prepayment,
          noted_id: val.note,
          created_by: `${val.first_name}  ${val.last_name}`,
          company: {
            id: val.companyId,
            name: val.name,
            email: val.companyEmail,
            phone: val.companyPhone,
            address: val.address,
            state: val.state,
            city: val.city,
            country: val.city,
            postcode: val.postcode,
            active: val.active
          }
        }
      })

      return Promise.resolve({
        code: status.OK,
        message: 'Service Repairs OK',
        services: { count: countData.length, limit, page: totalPage, offset, data: newGetServiceRepairs }
      })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for result service repair data by specific id
   */

  public async resultServiceRepair(req: Request<IRepair>): Promise<Record<string, any>> {
    try {
      const getServiceRepair: Record<string, any> = await super
        .model()
        .query()
        .select(
          'repair_service.*',
          'company.*',
          'company.id as companyId',
          'company.email as companyEmail',
          'company.phone as companyPhone',
          'user.*'
        )
        .join('company', 'repair_service.company_id', '=', 'company.id')
        .join('user', 'repair_service.created_by_id', '=', 'user.id')
        .where('device.id', req.params.id)
        .first()

      if (!getServiceRepair) {
        throw { code: status.NOT_FOUND, message: `Service repair data not found, for this id ${req.params.id}` }
      }

      const getNewServiceRepair: Record<string, any> = {
        service_id: getServiceRepair.service_id,
        service_cd: getServiceRepair.service_cd,
        description: getServiceRepair.description,
        active: getServiceRepair.active,
        walk_in_service: getServiceRepair.walk_in_service,
        preliminary_check: getServiceRepair.preliminary_check,
        prepayment: getServiceRepair.prepayment,
        noted_id: getServiceRepair.note,
        created_by: `${getServiceRepair.first_name}  ${getServiceRepair.last_name}`,
        company: {
          id: getServiceRepair.companyId,
          name: getServiceRepair.name,
          email: getServiceRepair.companyEmail,
          phone: getServiceRepair.companyPhone,
          address: getServiceRepair.address,
          state: getServiceRepair.state,
          city: getServiceRepair.city,
          country: getServiceRepair.city,
          postcode: getServiceRepair.postcode,
          active: getServiceRepair.active
        }
      }

      return Promise.resolve({ code: status.OK, message: 'Service Repair OK', device: getNewServiceRepair })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method DELETE
   * @description function for delete specific service repair by id
   */

  public async deleteServiceRepair(req: Request<IRepair>): Promise<Record<string, any>> {
    try {
      const checkServiceRepairId: ModelRepair = await super.model().query().findById(req.params.id)

      if (!checkServiceRepairId) {
        throw { code: status.NOT_FOUND, message: `Service repair data not found, for this id ${req.params.id}` }
      }

      const deleteServiceRepair: number = await super.model().query().deleteById(req.params.id)

      if (!deleteServiceRepair) {
        throw { code: status.FORBIDDEN, message: `Delete service repair data, for this id ${req.params.id} failed` }
      }

      return Promise.resolve({ code: status.OK, message: `Delete service repair data, for this id ${req.params.id} success` })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for update specific service repair by id
   */

  public async updateServiceRepair(req: Request<IRepair>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelRepair[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkServiceRepairId: ModelRepair = await super.model().query().findById(req.params.id)

      if (!checkServiceRepairId) {
        throw { code: status.NOT_FOUND, message: `Service repair data not found, for this id ${req.params.id}` }
      }

      const updateServiceRepair: ModelRepair = await super.model().query().updateAndFetchById(req.params.id, req.body)

      if (!updateServiceRepair) {
        throw { code: status.FORBIDDEN, message: 'Update service repair data failed' }
      }

      return Promise.resolve({ code: status.OK, message: 'Update service repair data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }
}
