import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'
import { ICompany, IControllerCompany } from '@interfaces/interface.company'
import { ServiceCompany } from '@services/service.company'
import { Request, Response } from '@helpers/helper.generic'

export class ControllerCompany extends ServiceCompany implements IControllerCompany {
  async createControllerCompany(req: Request<ICompany>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceCompany(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultsControllerCompany(req: Request<ICompany>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultsServiceCompany(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultControllerCompany(req: Request<ICompany>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultServiceCompany(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async deleteControllerCompany(req: Request<ICompany>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.deleteServiceCompany(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async updateControllerCompany(req: Request<ICompany>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.updateServiceCompany(req)
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
  static createSchemaCompany = checkSchema({
    name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'name is required'
      },
      isString: {
        errorMessage: 'name must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'name not included unique character'
      }
    },
    email: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'email is required'
      },
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email format is not valid'
      }
    },
    phone: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'phone number is required'
      },
      isNumeric: {
        errorMessage: 'phone number must be number'
      },
      isMobilePhone: {
        errorMessage: 'phone number is not valid'
      }
    },
    address: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'address is required'
      },
      isString: {
        errorMessage: 'address must be string'
      }
    },
    state: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'state is required'
      },
      isString: {
        errorMessage: 'state must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'state not included unique character'
      }
    },
    city: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'city is required'
      },
      isString: {
        errorMessage: 'city must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'city not included unique character'
      }
    },
    country: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'country is required'
      },
      isString: {
        errorMessage: 'country must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'country not included unique character'
      }
    },
    postcode: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'postcode is required'
      },
      isNumeric: {
        errorMessage: 'postcode must be number'
      },
      isLength: {
        options: {
          min: 5
        },
        errorMessage: 'postcode minimum 5 character'
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
    }
  })

  static resultsSchemaCompany = checkSchema({
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
        options: (val) => ['asc', 'desc'].includes(val) === false,
        errorMessage: 'sort value support like asc or desc'
      }
    }
  })

  static resultSchemaCompany = checkSchema({
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

  static deleteSchemaCompany = checkSchema({
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

  static updateSchemaCompany = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    },
    name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'name is required'
      },
      isString: {
        errorMessage: 'name must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'name not included unique character'
      }
    },
    email: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'email is required'
      },
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email format is not valid'
      }
    },
    phone: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'phone number is required'
      },
      isNumeric: {
        errorMessage: 'phone number must be number'
      },
      isMobilePhone: {
        errorMessage: 'phone number is not valid'
      }
    },
    address: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'address is required'
      },
      isString: {
        errorMessage: 'address must be string'
      }
    },
    state: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'state is required'
      },
      isString: {
        errorMessage: 'state must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'state not included unique character'
      }
    },
    city: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'city is required'
      },
      isString: {
        errorMessage: 'city must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'city not included unique character'
      }
    },
    country: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'country is required'
      },
      isString: {
        errorMessage: 'country must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z\s]/gi.test(val) === false,
        errorMessage: 'country not included unique character'
      }
    },
    postcode: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'postcode is required'
      },
      isNumeric: {
        errorMessage: 'postcode must be number'
      },
      isLength: {
        options: {
          min: 5
        },
        errorMessage: 'postcode minimum 7 character'
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
    }
  })
}
