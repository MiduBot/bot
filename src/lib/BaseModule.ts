import BaseHandler from './BaseHandler'
import MiduClient from './MiduClient'
export interface BaseModuleData {
  category?: string
}
class BaseModule {
  id!: string
  filepath!: string
  category!: string
  client!: MiduClient
  handler!: BaseHandler
  categoryID: string
  constructor (id: string, {
    category = 'default'
  }: BaseModuleData) {
    this.id = id
    this.categoryID = category
  }

  reload () {
    this.handler.reload(this.id)
  }

  remove () {
    this.handler.remove(this.id)
  }

  toString () { return this.id }
}

export default BaseModule
