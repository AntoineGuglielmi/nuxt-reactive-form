import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const pattern: TValidationRuleWrapper = (params: IValidationRuleParams = { pattern: '/^.*$/' }): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    const regexp = new RegExp(defaultedParams.pattern)
    return (regexp.test(value)) || getMessageReplaced(defaultedParams)
  }
}
