import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const onlyNumbers: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return ({ value, state }: IValidationRulePayload) => {
    const regexp = /^[0-9]*$/
    return (regexp.test(value)) || getMessageReplaced(defaultedParams)
  }
}
