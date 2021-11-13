import { Router } from 'express'
import { ControllerRepair, Schema } from '@controllers/controller.repair'
import { validator } from '@libs/lib.validator'

export class RouteRepair extends ControllerRepair {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/', [...Schema.createSchemaRepair, validator()], this.createControllerRepair)
    this.router.get('/', [...Schema.resultsSchemaRepair, validator()], this.resultsControllerRepair)
    this.router.get('/:id', [...Schema.resultSchemaRepair, validator()], this.resultControllerRepair)
    this.router.delete('/:id', [...Schema.deleteSchemaRepair, validator()], this.deleteControllerRepair)
    this.router.put('/:id', [...Schema.updateSchemaRepair, validator()], this.updateControllerRepair)

    return this.router
  }
}

export default new RouteRepair().main()
