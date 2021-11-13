import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'
import { IDevice, IControllerDevice } from '@interfaces/interface.device'
import { ServiceDevice } from '@services/service.device'
import { Request, Response } from '@helpers/helper.generic'

export class ControllerDevice extends ServiceDevice implements IControllerDevice {
  async createControllerDevice(req: Request<IDevice>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceDevice(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultsControllerDevice(req: Request<IDevice>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultsServiceDevice(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultControllerDevice(req: Request<IDevice>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultServiceDevice(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async deleteControllerDevice(req: Request<IDevice>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.deleteServiceDevice(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async updateControllerDevice(req: Request<IDevice>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.updateServiceDevice(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }
}

/**
 * @description schema validator initialize for all property controller here
 */

export class Schema {
  static createSchemaDevice = checkSchema({
    company_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'company_id is required'
      },
      isNumeric: {
        errorMessage: 'company_id must be number'
      }
    },
    device_cd: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'device_cd is required'
      },
      isString: {
        errorMessage: 'device_cd must be string'
      }
    },
    description: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'description is required'
      },
      isString: {
        errorMessage: 'description must be string'
      }
    },
    active: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'active is required'
      },
      isBoolean: {
        errorMessage: 'active must be boolean'
      }
    },
    complexity: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'complexity is required'
      },
      isString: {
        errorMessage: 'complexity must be string'
      },
      custom: {
        options: (val) => ['low', 'medium', 'high'].includes(val),
        errorMessage: 'complexity support like low, medium or high'
      }
    },
    created_by_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'created_by_id is required'
      },
      isNumeric: {
        errorMessage: 'created_by_id must be number'
      }
    },
    created_by_screen_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'created_by_screen_id is required'
      },
      isString: {
        errorMessage: 'created_by_screen_id must be string'
      }
    },
    created_date_time: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'created_date_time is required'
      },
      isDate: {
        errorMessage: 'created_date_time must be date'
      }
    },
    last_modified_by_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_modified_by_id is required'
      },
      isNumeric: {
        errorMessage: 'last_modified_by_id must be number'
      }
    },
    last_modified_by_screen_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_modified_by_screen_id is required'
      },
      isString: {
        errorMessage: 'last_modified_by_screen_id must be string'
      }
    },
    last_modified_date_time: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_modified_date_time is required'
      },
      isDate: {
        errorMessage: 'last_modified_date_time must be date'
      }
    },
    noted_id: {
      in: ['body'],
      optional: true,
      isNumeric: {
        errorMessage: 'noted_id must be number'
      }
    }
  })

  static resultsSchemaDevice = checkSchema({
    limit: {
      in: ['query'],
      optional: true,
      isNumeric: {
        errorMessage: 'limit must be number'
      }
    },
    offset: {
      in: ['query'],
      optional: true,
      isNumeric: {
        errorMessage: 'offset must be number'
      }
    },
    sort: {
      in: ['query'],
      optional: true,
      isString: {
        errorMessage: 'sort must be string'
      },
      custom: {
        options: (val) => ['asc', 'desc'].includes(val),
        errorMessage: 'sort support like asc or desc'
      }
    }
  })

  static resultSchemaDevice = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    }
  })

  static deleteSchemaDevice = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    }
  })

  static updateSchemaDevice = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    },
    company_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'company_id is required'
      },
      isNumeric: {
        errorMessage: 'company_id must be number'
      }
    },
    device_cd: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'device_cd is required'
      },
      isString: {
        errorMessage: 'device_cd must be string'
      }
    },
    description: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'description is required'
      },
      isString: {
        errorMessage: 'description must be string'
      }
    },
    active: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'active is required'
      },
      isBoolean: {
        errorMessage: 'active must be boolean'
      }
    },
    complexity: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'complexity is required'
      },
      isString: {
        errorMessage: 'complexity must be string'
      },
      custom: {
        options: (val) => ['low', 'medium', 'high'].includes(val),
        errorMessage: 'complexity support like low, medium or high'
      }
    },
    created_by_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'created_by_id is required'
      },
      isNumeric: {
        errorMessage: 'created_by_id must be number'
      }
    },
    created_by_screen_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'created_by_screen_id is required'
      },
      isString: {
        errorMessage: 'created_by_screen_id must be string'
      }
    },
    created_date_time: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'created_date_time is required'
      },
      isDate: {
        errorMessage: 'created_date_time must be date'
      }
    },
    last_modified_by_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_modified_by_id is required'
      },
      isNumeric: {
        errorMessage: 'last_modified_by_id must be number'
      }
    },
    last_modified_by_screen_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_modified_by_screen_id is required'
      },
      isString: {
        errorMessage: 'last_modified_by_screen_id must be string'
      }
    },
    last_modified_date_time: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_modified_date_time is required'
      },
      isDate: {
        errorMessage: 'last_modified_date_time must be date'
      }
    },
    noted_id: {
      in: ['body'],
      optional: true,
      isNumeric: {
        errorMessage: 'noted_id must be number'
      }
    }
  })
}
