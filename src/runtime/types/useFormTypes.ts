import { Ref } from 'vue'

export interface IValidationRuleParams {
  [key: string]: any
}

export interface IValidationRulePayload {
  value: any
}

export type TValidationRule = (payload: IValidationRulePayload) => boolean|string

export type TValidationRuleWrapper = (params: IValidationRuleParams) => TValidationRule

export type IStateInitPackage = {
  value: any|Ref,
  reset?: any|Ref,
  validation?: TValidationRule[]
}|any|Ref

export interface IStateInit {
  [key: string]: IStateInitPackage
}

export interface IState {
  [key: string]: Ref
}

export interface IStateReset {
  [key: string]: any|Ref
}

export interface IErrorMessages {
  [key: string]: Ref<(string|boolean)[]>
}

export type TUseForm = {
  state: IState
  errorMessages: IErrorMessages
  resetForm: () => void
  formIsValid: () => boolean
  getError: (key: string) => boolean|(string|boolean)[]
}
