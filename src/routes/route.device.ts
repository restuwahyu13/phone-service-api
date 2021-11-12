import { Router } from 'express'
import { ControllerDevice, Schema } from '@controllers/controller.device'
import { validator } from '@libs/lib.validator'

export class RouteDevice extends ControllerDevice {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/', [...Schema.createSchemaDevice, validator()], this.createControllerDevice)
    this.router.get('/', [...Schema.resultsSchemaDevice, validator()], this.resultsControllerDevice)
    this.router.get('/:id', [...Schema.resultSchemaDevice, validator()], this.resultControllerDevice)
    this.router.delete('/:id', [...Schema.deleteSchemaDevice, validator()], this.deleteControllerDevice)
    this.router.put('/:id', [...Schema.updateSchemaDevice, validator()], this.updateControllerDevice)

    return this.router
  }
}
