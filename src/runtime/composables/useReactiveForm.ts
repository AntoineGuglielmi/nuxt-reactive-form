import { ref, Ref } from 'vue'

import {
  IStateInit,
  IState,
  TUseForm,
  IErrorMessages,
  IStateInitPackage,
  TErrorMessagesPack
} from '../types/ReactiveFormTypes'

const setState = (stateValue: IStateInitPackage): Ref => {
  if (typeof stateValue === 'object') {
    return ref(stateValue.value)
  }
  return ref(stateValue)
}

export const useReactiveForm = (stateInit: IStateInit): TUseForm => {
  const state: IState = {}
  const stateBackup: IState = {}
  const errorMessages: IErrorMessages = {}

  for (const stateKey of Object.keys(stateInit)) {
    state[stateKey] = setState(stateInit[stateKey])
    stateBackup[stateKey] = setState(stateInit[stateKey])
    errorMessages[stateKey] = ref([])
  }

  const resetForm = (): void => {
    for (const stateKey of Object.keys(state)) {
      state[stateKey].value = stateInit[stateKey].reset ?? stateBackup[stateKey].value
    }
  }

  const generateErrorMessages = (stateKey: string): void => {
    errorMessages[stateKey].value = []
    const { validation: validationRules = [] } = stateInit[stateKey]
    for (const rule of validationRules) {
      errorMessages[stateKey].value.push(rule({ value: state[stateKey].value, state }))
    }
    errorMessages[stateKey].value = errorMessages[stateKey].value.filter(item => item !== true)
  }

  const validateState = (stateKey = ''): void => {
    generateErrorMessages(stateKey)
  }

  const validateForm = (): void => {
    for (const stateKey of Object.keys(stateInit)) {
      generateErrorMessages(stateKey)
    }
  }

  const formIsValid = (validate = false): boolean => {
    if (validate) {
      validateForm()
    }
    const errorMessagesArray = Object.values(errorMessages)
    return !errorMessagesArray.some((value: TErrorMessagesPack) => {
      return value.value.length > 0
    })
  }

  const getError = (key: string): boolean|Array<string|boolean> => {
    return errorMessages[key].value.length > 0 && errorMessages[key].value
  }

  return {
    state,
    errorMessages,
    validateState,
    resetForm,
    validateForm,
    formIsValid,
    getError
  }
}
