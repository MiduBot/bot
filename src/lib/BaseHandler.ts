import { Collection } from 'discord.js'
import EventEmitter from 'events'
import { readdirSync, statSync } from 'fs'
import path from 'path'
import BaseModule from './BaseModule'
import MiduBot from './MiduClient'
export interface BaseHandlerData {
  path: string
}
class BaseHandler extends EventEmitter {
  client: MiduBot
  modules: Collection<string, BaseModule>
  path: string
  constructor (client: MiduBot, { path }: BaseHandlerData) {
    super()
    this.client = client
    this.path = path
    this.modules = new Collection()
  }

  register (mod: BaseModule, filepath: string) {
    mod.filepath = filepath
    this.modules.set(mod.id, mod)
    console.log(`Registered module ${mod.id}`)
    const dirs = path.dirname(filepath).split(path.sep)
    mod.categoryID = dirs[dirs.length - 1]
  }

  deregister (mod: BaseModule) {
    if (mod.filepath) delete require.cache[require.resolve(mod.filepath)]
    this.modules.delete(mod.id)
  }

  load (filepath: string, isReload: boolean = false) {
    let mod = require(filepath)
    if (!mod?.default) throw new Error(`Module ${filepath} does not export a default export`)
    // eslint-disable-next-line new-cap
    mod = new mod.default()
    this.register(mod, filepath)
    return mod
  }

  reload (id: string | BaseModule) {
    const mod = this.modules.get(id.toString())
    if (!mod) return

    this.deregister(mod)

    const filepath = mod.filepath
    const newMod = this.load(filepath, true)
    return newMod
  }

  remove (id: string | BaseModule) {
    const mod = this.modules.get(id.toString())
    if (!mod) return
    this.deregister(mod)
    return mod
  }

  loadAll () {
    const filepaths = this.#readdirRecursive(this.path)
    for (let filepath of filepaths) {
      filepath = path.resolve(filepath)
      this.load(filepath)
    }
  }

  #readdirRecursive (directory: string): string[] {
    const result: string[] = [];
    (function read (dir: string) {
      const files = readdirSync(dir)
      for (const file of files) {
        const filepath = path.join(dir, file)
        if (statSync(filepath).isDirectory()) read(filepath)
        else result.push(filepath)
      }
    }(directory))
    return result
  }
}
export default BaseHandler
