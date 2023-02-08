import { fileURLToPath } from 'url'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports
} from '@nuxt/kit'

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
    // if (options.addPlugin) {
    //   addPlugin(resolve(runtimeDir, 'plugin'))
    // }

    const rules = [
      'required',
      'maxLength',
      'minLength',
      'onlyLetters',
      'onlyNumbers'
    ]

    const types = [
      'IStateInit',
      'IState',
      'IErrorMessages',
      'TUseForm',
      'IStateReset',
      'IStateInitPackage',
      'TValidationRule',
      'TValidationRuleWrapper',
      'IValidationRuleParams',
      'IValidationRulePayload'
    ]

    addImports([
      {
        from: resolve(runtimeDir, 'composables/useReactiveForm'),
        name: 'useReactiveForm',
        as: 'useReactiveForm'
      },
      {
        from: resolve(runtimeDir, 'utils/ReactiveFormValidationRules/index'),
        name: '*',
        as: 'ReactiveFormValidationRules'
      }
      // ...rules.map((rule: string) => {
      //   return {
      //     name: rule,
      //     as: rule,
      //     from: resolve(runtimeDir, 'utils/useFormValidationRules')
      //   }
      // })
    ])
  }
})
