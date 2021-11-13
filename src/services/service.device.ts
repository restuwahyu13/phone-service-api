import { StatusCodes as status } from 'http-status-codes'
import { ModelDevice } from '@models/model.device'
import { IServiceDevice, IDevice } from '@interfaces/interface.device'
import { Request } from '@helpers/helper.generic'

export class ServiceDevice extends ModelDevice implements IServiceDevice {
  /**
   * @method POST
   * @description function for create new device
   */

  public async createServiceDevice(req: Request<IDevice>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelDevice[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkDeviceCode: ModelDevice = await super.model().query().findOne({ device_cd: req.body.device_cd })

      if (checkDeviceCode) {
        throw { code: status.CONFLICT, message: 'Device code already exist' }
      }

      const addNewDevice: ModelDevice = await super.model().query().insert(req.body)

      if (!addNewDevice) {
        throw { code: status.FORBIDDEN, message: 'Add new device failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Add new device success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for results all device
   */

  public async resultsServiceDevice(req: Request<IDevice>): Promise<Record<string, any>> {
    try {
      const limit: any = parseInt(req.query.limit as any) || 10
      const offset: any = parseInt(req.query.offset as any) || 0
      const sort: any = req.query.sort || 'desc'
      const perpage = limit
      const countData: ModelDevice[] = await super.model().query().select('id')
      const totalPage: number = Math.ceil(countData.length / perpage)

      const getDevices: ModelDevice[] = await super
        .model()
        .query()
        .select(
          'device.*',
          'company.*',
          'company.id as companyId',
          'company.email as companyEmail',
          'company.phone as companyPhone',
          'user.*'
        )
        .join('company', 'device.company_id', '=', 'company.id')
        .join('user', 'device.created_by_id', '=', 'user.id')
        .limit(limit)
        .offset(offset)
        .orderBy('device.created_at', sort)

      if (!getDevices) {
        throw { code: status.NOT_FOUND, message: 'Devices data not found' }
      }

      const newGetDevices: Record<string, any>[] = getDevices.map((val: Record<string, any>) => {
        return {
          device_id: val.device_id,
          device_cd: val.device_cd,
          description: val.description,
          active: val.active,
          complexity: val.complexity,
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
        message: 'Devices OK',
        devices: { count: countData.length, limit, page: totalPage, offset, data: newGetDevices }
      })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for result device data by specific id
   */

  public async resultServiceDevice(req: Request<IDevice>): Promise<Record<string, any>> {
    try {
      const getDevice: Record<string, any> = await super
        .model()
        .query()
        .select(
          'device.*',
          'company.*',
          'company.id as companyId',
          'company.email as companyEmail',
          'company.phone as companyPhone',
          'user.*'
        )
        .join('company', 'device.company_id', '=', 'company.id')
        .join('user', 'device.created_by_id', '=', 'user.id')
        .where('device.id', req.params.id)
        .first()

      if (!getDevice) {
        throw { code: status.NOT_FOUND, message: `Device data not found, for this id ${req.params.id}` }
      }

      const getNewDevice: Record<string, any> = {
        device_id: getDevice.device_id,
        device_cd: getDevice.device_cd,
        description: getDevice.description,
        active: getDevice.active,
        complexity: getDevice.complexity,
        noted_id: getDevice.note,
        created_by: `${getDevice.first_name}  ${getDevice.last_name}`,
        company: {
          id: getDevice.companyId,
          name: getDevice.name,
          email: getDevice.companyEmail,
          phone: getDevice.companyPhone,
          address: getDevice.address,
          state: getDevice.state,
          city: getDevice.city,
          country: getDevice.city,
          postcode: getDevice.postcode,
          active: getDevice.active
        }
      }

      return Promise.resolve({ code: status.OK, message: 'Device OK', device: getNewDevice })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method DELETE
   * @description function for delete specific device by id
   */

  public async deleteServiceDevice(req: Request<IDevice>): Promise<Record<string, any>> {
    try {
      const checkDeviceId: ModelDevice = await super.model().query().findById(req.params.id)

      if (!checkDeviceId) {
        throw { code: status.NOT_FOUND, message: `Device data not found, for this id ${req.params.id}` }
      }

      const deleteDevice: number = await super.model().query().deleteById(req.params.id)

      if (!deleteDevice) {
        throw { code: status.FORBIDDEN, message: `Delete device data, for this id ${req.params.id} failed` }
      }

      return Promise.resolve({ code: status.OK, message: `Delete device data, for this id ${req.params.id} success` })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for update specific device by id
   */

  public async updateServiceDevice(req: Request<IDevice>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelDevice[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkDeviceId: ModelDevice = await super.model().query().findById(req.params.id)

      if (!checkDeviceId) {
        throw { code: status.NOT_FOUND, message: `Device data not found, for this id ${req.params.id}` }
      }

      const updateDevice: ModelDevice = await super.model().query().updateAndFetchById(req.params.id, req.body)

      if (!updateDevice) {
        throw { code: status.FORBIDDEN, message: 'Update device data failed' }
      }

      return Promise.resolve({ code: status.OK, message: 'Update device data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }
}
