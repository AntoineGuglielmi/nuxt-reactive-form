import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const matches: TValidationRuleWrapper = (params: IValidationRuleParams = {}): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value, state } = payload
    const mustMatch = state[params.matches].value
    return (mustMatch === value) || getMessageReplaced(defaultedParams)
  }
}
