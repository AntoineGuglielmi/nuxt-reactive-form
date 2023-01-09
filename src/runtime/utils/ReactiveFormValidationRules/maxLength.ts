import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const maxLength: TValidationRuleWrapper = (params: IValidationRuleParams = { max: -1 }): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return ({ value, state }: IValidationRulePayload) => {
    return value.length <= defaultedParams.max || defaultedParams.max === -1 || getMessageReplaced(defaultedParams)
  }
}
