import { StatusCodes as Status } from 'http-status-codes'
import { decrypt, encrypt } from 'jwt-transform'
import { NodeDiskStorage } from 'node-disk-storage'
import jwt from 'jsonwebtoken'
import { BookStoreError } from '@helpers/helper.error'
import { convertTime } from '@helpers/helper.convertTime'

const nds: InstanceType<typeof NodeDiskStorage> = new NodeDiskStorage({ compress: true })
const secretKey: string = process.env.JWT_SECRET_KEY || ''
const typeTime: Record<string, any> = {
  days: 'd',
  minute: 'm',
  second: 's'
}

export interface IToken {
  accessToken: string
  accessTokenExpired: string
}

interface Ioptions {
  expiredAt: number
  type: string
}

export const signToken = async (data: Record<string, any>, options: Ioptions): Promise<IToken | string> => {
  try {
    const accessToken: string = jwt.sign({ ...data }, secretKey, {
      expiresIn: `${options.expiredAt}${typeTime[options.type]}`,
      audience: 'phone-service-api'
    })

    const encryptedToken: string = await encrypt(accessToken, 20)
    const setAccessToken: boolean | undefined = nds.set('accessToken', encryptedToken)

    if (!setAccessToken) {
      throw { code: Status.BAD_REQUEST, message: 'Store accessToken into disk failed' }
    }

    const token: IToken = {
      accessToken: encryptedToken,
      accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`
    }

    return token
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Generate accessToken and refreshToken failed' || e.message))
  }
}

export const verifyToken = async (accessToken: string): Promise<jwt.JwtPayload | string> => {
  try {
    const getAccessToken: string | undefined = nds.get('accessToken') || accessToken

    if (!getAccessToken) {
      throw { code: Status.BAD_REQUEST, message: 'Get accessToken from disk failed' }
    }

    const decryptAccessToken: string = await decrypt(getAccessToken, 20)
    const decodedToken: string | jwt.JwtPayload = jwt.verify(decryptAccessToken, secretKey, { audience: 'phone-service-api' })

    return decodedToken
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Verified accessToken expired or invalid'))
  }
}
