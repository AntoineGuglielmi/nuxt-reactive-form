import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../types/useFormTypes'

export const required: TValidationRuleWrapper = (params: IValidationRuleParams = {}): TValidationRule => {
  const defaultedParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return (value !== null && value !== '' && value !== undefined) || defaultedParams.message
  }
}

export const maxLength: TValidationRuleWrapper = (params: IValidationRuleParams = {}): TValidationRule => {
  const defaultedParams = {
    message: 'This field is not valid',
    max: -1,
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value.length <= defaultedParams.max || defaultedParams.max === -1 || defaultedParams.message
  }
}

export const minLength: TValidationRuleWrapper = (params: IValidationRuleParams = {}): TValidationRule => {
  const defaultedParams = {
    message: 'This field is not valid',
    min: -1,
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value.length >= defaultedParams.min || defaultedParams.min === -1 || defaultedParams.message
  }
}

export const onlyLetters: TValidationRuleWrapper = (params: IValidationRuleParams = {}): TValidationRule => {
  const defaultedParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    const regexp = /^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/
    return (regexp.test(value)) || defaultedParams.message
  }
}

export const onlyNumbers: TValidationRuleWrapper = (params: IValidationRuleParams = {}): TValidationRule => {
  const defaultedParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    const regexp = /^[0-9]*$/
    return (regexp.test(value)) || defaultedParams.message
  }
}
