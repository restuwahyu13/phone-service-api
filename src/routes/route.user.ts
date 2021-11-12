import { Router } from 'express'
import { ControllerUser, Schema } from '@controllers/controller.user'
import { validator } from '@libs/lib.validator'

export class RouteUser extends ControllerUser {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/auth/register', [...Schema.registerSchemaUser, validator()], this.registerControllerUser)
    this.router.get('/auth/login', [...Schema.loginSchemaUser, validator()], this.loginControllerUser)

    return this.router
  }
}
