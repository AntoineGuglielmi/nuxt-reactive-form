import { IValidationRuleParams } from '../../types/ReactiveFormTypes'

export const getMessageReplaced = (defaultedParams: IValidationRuleParams): string => {
  return Object.keys(defaultedParams).reduce((finalMessage: string, key: string): string => {
    return finalMessage.replace(`{${key}}`, defaultedParams[key])
  }, defaultedParams.message)
}
