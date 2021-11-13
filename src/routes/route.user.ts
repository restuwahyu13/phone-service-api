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
    this.router.post('/register', [...Schema.registerSchemaUser, validator()], this.registerControllerUser)
    this.router.post('/login', [...Schema.loginSchemaUser, validator()], this.loginControllerUser)

    return this.router
  }
}

export default new RouteUser().main()
