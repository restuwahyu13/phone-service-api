import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'
import { IRepair, IControllerRepair } from '@interfaces/interface.repair'
import { ServiceRepair } from '@services/service.repair'
import { Request, Response } from '@helpers/helper.generic'

export class ControllerRepair extends ServiceRepair implements IControllerRepair {
  async createControllerRepair(req: Request<IRepair>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceRepair(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultsControllerRepair(req: Request<IRepair>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultsServiceRepair(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultControllerRepair(req: Request<IRepair>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultServiceRepair(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async deleteControllerRepair(req: Request<IRepair>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.deleteServiceRepair(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async updateControllerRepair(req: Request<IRepair>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.updateServiceRepair(req)
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
  static createSchemaRepair = checkSchema({
    company_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'company_id is required'
      },
      isNumeric: {
        errorMessage: 'company_id must be number'
      }
    },
    service_cd: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'service_cd is required'
      },
      isString: {
        errorMessage: 'service_cd must be string'
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
    walk_in_service: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'walk_in_service is required'
      },
      isBoolean: {
        errorMessage: 'walk_in_service must be boolean'
      }
    },
    preliminary_check: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'preliminary_check is required'
      },
      isBoolean: {
        errorMessage: 'preliminary_check must be boolean'
      }
    },
    prepayment: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'prepayment is required'
      },
      isBoolean: {
        errorMessage: 'prepayment must be boolean'
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
      isISO8601: {
        errorMessage: 'created_date_time must be timestamp'
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
      isISO8601: {
        errorMessage: 'last_modified_date_time must be timestamp'
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

  static resultsSchemaRepair = checkSchema({
    limit: {
      in: ['query'],
      notEmpty: {
        errorMessage: 'limit is required'
      },
      isNumeric: {
        errorMessage: 'limit must be number'
      }
    },
    offset: {
      in: ['query'],
      notEmpty: {
        errorMessage: 'offset is required'
      },
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

  static resultSchemaRepair = checkSchema({
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

  static deleteSchemaRepair = checkSchema({
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

  static updateSchemaRepair = checkSchema({
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
    service_cd: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'service_cd is required'
      },
      isString: {
        errorMessage: 'service_cd must be string'
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
    walk_in_service: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'walk_in_service is required'
      },
      isBoolean: {
        errorMessage: 'walk_in_service must be boolean'
      }
    },
    preliminary_check: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'preliminary_check is required'
      },
      isBoolean: {
        errorMessage: 'preliminary_check must be boolean'
      }
    },
    prepayment: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'prepayment is required'
      },
      isBoolean: {
        errorMessage: 'prepayment must be boolean'
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
      isISO8601: {
        errorMessage: 'created_date_time must be timestamp'
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
      isISO8601: {
        errorMessage: 'last_modified_date_time must be timestamp'
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
