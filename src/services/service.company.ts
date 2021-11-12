import { StatusCodes as status } from 'http-status-codes'
import { ModelCompany } from '@models/model.company'
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
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for results all company
   */

  public async resultsServiceCompany(req: Request<ICompany>): Promise<Record<string, any>> {
    try {
      const limit: any = req.query.limit || 10
      const offset: any = req.query.offset || 0
      const sort: any = req.query.sort || 'desc'
      const countData: ModelCompany[] = await super.model().query().select('id')
      const totalData: number = Math.abs(Math.ceil(limit / countData.length))

      const getCompanys: ModelCompany[] = await super.model().query().limit(totalData).offset(offset).orderBy('created_at', sort)

      if (!getCompanys) {
        throw { code: status.NOT_FOUND, message: 'Companys data not found' }
      }

      // const newGetServiceCompanys: Record<string, any>[] = getServiceCompanys.map((val: Record<string, any>) => {
      //   return {
      //     service_id: val.service_id,
      //     service_cd: val.service_cd,
      //     description: val.description,
      //     active: val.active,
      //     walk_in_service: val.walk_in_service,
      //     preliminary_check: val.preliminary_check,
      //     prepayment: val.prepayment,
      //     noted_id: val.note,
      //     created_by: `${val.first_name}  ${val.last_name}`,
      //     company: {
      //       id: val.companyId,
      //       name: val.name,
      //       email: val.companyEmail,
      //       phone: val.companyPhone,
      //       address: val.address,
      //       state: val.state,
      //       city: val.city,
      //       country: val.city,
      //       postcode: val.postcode,
      //       active: val.active
      //     }
      //   }
      // })

      return Promise.resolve({ code: status.OK, message: 'Companys OK', services: getCompanys })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
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

      // const getNewServiceCompany: Record<string, any> = {
      //   service_id: getServiceCompany.service_id,
      //   service_cd: getServiceCompany.service_cd,
      //   description: getServiceCompany.description,
      //   active: getServiceCompany.active,
      //   walk_in_service: getServiceCompany.walk_in_service,
      //   preliminary_check: getServiceCompany.preliminary_check,
      //   prepayment: getServiceCompany.prepayment,
      //   noted_id: getServiceCompany.note,
      //   created_by: `${getServiceCompany.first_name}  ${getServiceCompany.last_name}`,
      //   company: {
      //     id: getServiceCompany.companyId,
      //     name: getServiceCompany.name,
      //     email: getServiceCompany.companyEmail,
      //     phone: getServiceCompany.companyPhone,
      //     address: getServiceCompany.address,
      //     state: getServiceCompany.state,
      //     city: getServiceCompany.city,
      //     country: getServiceCompany.city,
      //     postcode: getServiceCompany.postcode,
      //     active: getServiceCompany.active
      //   }
      // }

      return Promise.resolve({ code: status.OK, message: 'Company OK', device: getCompany })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
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

      const deleteCompany: number = await super.model().query().deleteById(req.params.id)

      if (!deleteCompany) {
        throw { code: status.FORBIDDEN, message: `Delete company data, for this id ${req.params.id} failed` }
      }

      return Promise.resolve({ code: status.OK, message: `Delete company data, for this id ${req.params.id} success` })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
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
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }
}
