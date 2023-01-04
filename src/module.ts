import { fileURLToPath } from 'url'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports
} from '@nuxt/kit';

export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {
    addPlugin: true
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    if (options.addPlugin) {
      addPlugin(resolve(runtimeDir, 'plugin'))
    }
    addImports({
      from: resolve(runtimeDir, 'composables/useForm'),
      name: 'useForm',
      as: 'useForm'
    })
  }
})
