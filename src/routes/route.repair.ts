import { Router } from 'express'
import { ControllerRepair, Schema } from '@controllers/controller.repair'
import { validator } from '@libs/lib.validator'
import { permission } from '@/middlewares/middleware.permission'
import { auth } from '@/middlewares/middleware.auth'

export class RouteRepair extends ControllerRepair {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post(
      '/',
      [auth(), permission(['admin', 'company']), ...Schema.createSchemaRepair, validator()],
      this.createControllerRepair
    )
    this.router.get(
      '/',
      [auth(), permission(['admin', 'company', 'user']), ...Schema.resultsSchemaRepair, validator()],
      this.resultsControllerRepair
    )
    this.router.get(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.resultSchemaRepair, validator()],
      this.resultControllerRepair
    )
    this.router.delete(
      '/:id',
      [auth(), permission(['admin']), ...Schema.deleteSchemaRepair, validator()],
      this.deleteControllerRepair
    )
    this.router.put(
      '/:id',
      auth(),
      permission(['admin', 'company']),
      [...Schema.updateSchemaRepair, validator()],
      this.updateControllerRepair
    )

    return this.router
  }
}

export default new RouteRepair().main()
