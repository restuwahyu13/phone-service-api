import { StatusCodes as status } from 'http-status-codes'
import { assert } from 'is-any-type'
import { ModelUser } from '@models/model.user'
import { IServiceUser, IUser } from '@interfaces/interface.user'
import { Request } from '@helpers/helper.generic'
import { comparePassword, IPassword } from '@libs/lib.bcrypt'
import { signToken, IToken } from '@libs/lib.jwt'

export class ServiceUser extends ModelUser implements IServiceUser {
  /**
   * @method POST
   * @description function for create new user account
   */

  public async registerServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkUser: ModelUser = await super
        .model()
        .query()
        .where('email', req.body.email)
        .orWhere('phone', req.body.phone)
        .first()

      if (checkUser) {
        throw { code: status.CONFLICT, message: 'Email or Phone number already taken' }
      }

      const addNewUser: ModelUser = await super.model().query().insert(req.body)

      if (!addNewUser) {
        throw { code: status.FORBIDDEN, message: 'Add new user failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Add new user success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for login into app
   */

  public async loginServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkUser: ModelUser = await super.model().query().where('email', req.body.email).first()

      if (!checkUser) {
        throw { code: status.NOT_FOUND, message: 'User account is not never registered' }
      }

      const checkPassword: IPassword = await comparePassword(req.body.password, checkUser.password)

      if (checkPassword.error) {
        throw { code: status.BAD_REQUEST, message: 'Password is not match' }
      }

      const generateAccessToken: IToken | string = await signToken(
        { id: checkUser.id, email: checkUser.email },
        { expiredAt: 1, type: 'days' }
      )

      if (!generateAccessToken || assert.isPromise(generateAccessToken as any)) {
        throw { code: status.BAD_REQUEST, message: 'Password is not match' }
      }

      return Promise.resolve({ code: status.OK, message: 'Login success', token: generateAccessToken })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }
}
