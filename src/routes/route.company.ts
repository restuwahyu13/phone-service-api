import { Router } from 'express'
import { ControllerCompany, Schema } from '@controllers/controller.company'
import { validator } from '@libs/lib.validator'
import { auth } from '@middlewares/middleware.auth'
import { permission } from '@/middlewares/middleware.permission'

class RouteCompany extends ControllerCompany {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post(
      '/',
      [auth(), permission(['admin', 'company']), ...Schema.createSchemaCompany, validator()],
      this.createControllerCompany
    )
    this.router.get(
      '/',
      [auth(), permission(['admin', 'company']), ...Schema.resultsSchemaCompany, validator()],
      this.resultsControllerCompany
    )
    this.router.get(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.resultSchemaCompany, validator()],
      this.resultControllerCompany
    )
    this.router.delete(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.deleteSchemaCompany, validator()],
      this.deleteControllerCompany
    )
    this.router.put(
      '/:id',
      [auth(), permission(['admin', 'company']), ...Schema.updateSchemaCompany, validator()],
      this.updateControllerCompany
    )

    return this.router
  }
}

export default new RouteCompany().main()
