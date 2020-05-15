import { Header } from './getHeader'
import { Personnel } from './getPersonnel'
import { OperatingExpenses } from './getOperatingExpenses'
import { OtherCosts } from './getOtherCosts'

export interface Content {
  header: Header
  personnel: Personnel
  operatingExpenses: OperatingExpenses
  otherCosts: OtherCosts
  indirectCosts: {
    rate: number
    A: number
    B: number
    C: number
    D: number
    E: number
  }
  total: {
    A: number
    B: number
    C: number
    D: number
    E: number
  }
}

export interface State {
  loading: boolean
  error: null | Error
  content: null | Content
}

export type Action =
  | {
      type: 'set-loading'
      value: boolean
    }
  | {
      type: 'set-error'
      value: null | Error
    }
  | {
      type: 'set-content'
      value: Content | null
    }

export interface Reducer {
  (state: State, action: Action): State
}
