import { ref } from 'vue'

import {
  IStateInit,
  IState,
  TUseForm
} from '../types/useFormTypes'

export const useForm = (stateInit: IStateInit): TUseForm => {
  const state: IState = {}
  const stateBackup: IState = {}

  for (const stateKey of Object.keys(stateInit)) {
    state[stateKey] = ref(stateInit[stateKey])
    stateBackup[stateKey] = ref(stateInit[stateKey])
  }

  const resetForm = (stateReset: IStateInit = {}): void => {
    const reset: IState = {}
    for (const stateKey of Object.keys(stateReset)) {
      reset[stateKey] = ref(stateReset[stateKey])
    }
    for (const stateKey of Object.keys(state)) {
      state[stateKey].value = reset[stateKey]
        ? reset[stateKey].value
        : stateBackup[stateKey].value
    }
  }

  return {
    state,
    resetForm
  }
}
