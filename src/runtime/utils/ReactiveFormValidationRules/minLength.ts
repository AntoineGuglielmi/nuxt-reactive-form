import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const minLength: TValidationRuleWrapper = (params: IValidationRuleParams = { min: -1 }): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    min: -1,
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value.length >= defaultedParams.min || defaultedParams.min === -1 || getMessageReplaced(defaultedParams)
  }
}
