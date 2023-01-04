import { Ref } from 'vue'

export interface IStateInit {
  [key: string]: any|Ref
}

export interface IState {
  [key: string]: Ref
}

export type TUseForm = {
  state: IState
  resetForm: (stateReset?: IStateInit) => void
}
