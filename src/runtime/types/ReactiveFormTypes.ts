import {
  ComputedRef,
  Ref
} from 'vue'

export interface IValidationRuleParams {
  [key: string]: any
}

export type IValidationRulePayload = Record<string, any>

export type TValidationRule = (payload: IValidationRulePayload) => boolean|string

export type TValidationRuleWrapper = (params?: IValidationRuleParams) => TValidationRule

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

export type TErrorMessagesPack = Ref<Array<string|boolean>>

export interface IErrorMessages {
  [key: string]: TErrorMessagesPack
}

export type TUseForm = {
  state: IState
  errorMessages: IErrorMessages
  resetForm: () => void
  validateState: (stateKey: string) => void
  validateForm: () => void
  formIsValid: (validate?: boolean) => boolean
  getError: (key: string) => boolean|Array<string|boolean>
  formHasChanged: ComputedRef<boolean>
}
