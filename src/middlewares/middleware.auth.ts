import { IncomingHttpHeaders } from 'http'
import { assert } from 'is-any-type'
import { StatusCodes as Status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '@libs/lib.jwt'

export const auth = (): Handler => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      let headers: IncomingHttpHeaders = req.headers

      if (Object.keys(headers).includes('authorization')) {
        throw { code: Status.UNAUTHORIZED, message: 'Authorization is required' }
      }

      const authorization: boolean | undefined = headers.authorization?.includes('Bearer')

      if (assert.isUndefined(authorization as any)) {
        throw { code: Status.UNAUTHORIZED, message: 'Bearer is required' }
      }

      const accessToken: string | undefined = headers.authorization?.split('Bearer ')[1]
      const decodedToken: JwtPayload = verifyToken(accessToken as any)
      req['payload'] = decodedToken
      next()
    } catch (e: any) {
      res.status(e.code || Status.UNAUTHORIZED).json({ ...e })
    }
  }
}
