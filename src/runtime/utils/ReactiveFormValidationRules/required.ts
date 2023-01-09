import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../../types/ReactiveFormTypes'

import { getMessageReplaced } from './getMessageReplaced'

export const required: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return ({ value, state }: IValidationRulePayload) => {
    return (value !== null && value !== '' && value !== undefined) || getMessageReplaced(defaultedParams)
  }
}
