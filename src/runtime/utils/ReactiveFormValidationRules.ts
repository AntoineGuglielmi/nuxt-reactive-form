import { TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '../types/ReactiveFormTypes'

const getMessageReplaced = (defaultedParams: IValidationRuleParams): string => {
  return Object.keys(defaultedParams).reduce((finalMessage: string, key: string): string => {
    return finalMessage.replace(`{${key}}`, defaultedParams[key])
  }, defaultedParams.message)
}

const required: TValidationRuleWrapper = (params?: IValidationRuleParams): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return (value !== null && value !== '' && value !== undefined) || getMessageReplaced(defaultedParams)
  }
}

const maxLength: TValidationRuleWrapper = (params: IValidationRuleParams = { max: -1 }): TValidationRule => {
  const defaultedParams: IValidationRuleParams = {
    message: 'This field is not valid',
    ...params
  }
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value.length <= defaultedParams.max || defaultedParams.max === -1 || getMessageReplaced(defaultedParams)
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
    return value.length >= defaultedParams.min || defaultedParams.min === -1 || getMessageReplaced(defaultedParams)
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
    return (regexp.test(value)) || getMessageReplaced(defaultedParams)
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
    return (regexp.test(value)) || getMessageReplaced(defaultedParams)
  }
}

const pattern: TValidationRuleWrapper = (params: IValidationRuleParams = { pattern: '/^.*$/' }): TValidationRule => {
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

export const ReactiveFormValidationRules = {
  required,
  maxLength,
  minLength,
  onlyLetters,
  onlyNumbers,
  pattern
}
