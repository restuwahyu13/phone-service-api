import { Router } from 'express'
import { ControllerCompany, Schema } from '@controllers/controller.company'
import { validator } from '@libs/lib.validator'

class RouteCompany extends ControllerCompany {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/', [...Schema.createSchemaCompany, validator()], this.createControllerCompany)
    this.router.get('/', [...Schema.resultsSchemaCompany, validator()], this.resultsControllerCompany)
    // this.router.get('/:id', [...Schema.resultSchemaCompany, validator()], this.resultControllerCompany)
    this.router.delete('/:id', [...Schema.deleteSchemaCompany, validator()], this.deleteControllerCompany)
    this.router.put('/:id', [...Schema.updateSchemaCompany, validator()], this.updateControllerCompany)

    return this.router
  }
}

export default new RouteCompany().main()
