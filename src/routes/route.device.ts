import { Router } from 'express'
import { ControllerDevice, Schema } from '@controllers/controller.device'
import { validator } from '@libs/lib.validator'
import { auth } from '@/middlewares/middleware.auth'
import { permission } from '@/middlewares/middleware.permission'

export class RouteDevice extends ControllerDevice {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post(
      '/',
      [auth(), permission(['admin', 'company']), ...Schema.createSchemaDevice, validator()],
      this.createControllerDevice
    )
    this.router.get(
      '/',
      [auth(), permission(['admin', 'company', 'user']), ...Schema.resultsSchemaDevice, validator()],
      this.resultsControllerDevice
    )
    this.router.get(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.resultSchemaDevice, validator()],
      this.resultControllerDevice
    )
    this.router.delete(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.deleteSchemaDevice, validator()],
      this.deleteControllerDevice
    )
    this.router.put(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.updateSchemaDevice, validator()],
      this.updateControllerDevice
    )

    return this.router
  }
}

export default new RouteDevice().main()
