import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'
import { IUser, IControllerUser } from '@interfaces/interface.user'
import { ServiceUser } from '@services/service.user'
import { Request, Response } from '@helpers/helper.generic'

export class ControllerUser extends ServiceUser implements IControllerUser {
  async registerControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result = await super.registerServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async loginControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.loginServiceUser(req)
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
  static registerSchemaUser = checkSchema({
    first_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'first_name is required'
      },
      isString: {
        errorMessage: 'first_name must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z]/gi.test(val) === false,
        errorMessage: 'first_name not included unique character'
      }
    },
    last_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_name is required'
      },
      isString: {
        errorMessage: 'last_name must be string'
      },
      custom: {
        options: (val: any) => /[^A-Z]/gi.test(val) === false,
        errorMessage: 'last_name not included unique character'
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
        errorMessage: 'email is not valid'
      }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'password is required'
      },
      isLength: {
        options: {
          min: 8
        },
        errorMessage: 'password minimum 8 character'
      }
    },
    role: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'role is required'
      },
      isString: {
        errorMessage: 'role must be string'
      },
      custom: {
        options: (val: any) => ['user', 'admin', 'company'].includes(val),
        errorMessage: 'role is not supported, role must be user, admin or company'
      }
    }
  })

  static loginSchemaUser = checkSchema({
    email: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'email is required'
      },
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email is not valid'
      }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'password is required'
      },
      isLength: {
        options: {
          min: 8
        },
        errorMessage: 'password minimum 8 character'
      }
    }
  })
}
