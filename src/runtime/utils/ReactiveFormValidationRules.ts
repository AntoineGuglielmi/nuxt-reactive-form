import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../types/useFormTypes'

const required: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return (value !== null && value !== '' && value !== undefined) || defaultedParams.message
  }
}

const maxLength: TValidationRuleWrapper = (params: IValidationRuleParams = { max: -1 }): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value.length <= defaultedParams.max || defaultedParams.max === -1 || defaultedParams.message
  }
}

const minLength: TValidationRuleWrapper = (params: IValidationRuleParams = { min: -1 }): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    min: -1,
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value.length >= defaultedParams.min || defaultedParams.min === -1 || defaultedParams.message
  }
}

const onlyLetters: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    const regexp = /^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/
    return (regexp.test(value)) || defaultedParams.message
  }
}

const onlyNumbers: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    const regexp = /^[0-9]*$/
    return (regexp.test(value)) || defaultedParams.message
  }
}

export const ReactiveFormValidationRules = {
  required,
  maxLength,
  minLength,
  onlyLetters,
  onlyNumbers
}
