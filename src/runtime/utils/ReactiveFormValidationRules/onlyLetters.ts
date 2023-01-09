import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const onlyLetters: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return ({ value, state }: IValidationRulePayload) => {
    const regexp = /^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/
    return (regexp.test(value)) || getMessageReplaced(defaultedParams)
  }
}
