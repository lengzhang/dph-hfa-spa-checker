import pdfjsLib from 'pdfjs-dist'

export interface Item {
  A: number
  B: number
  C: number
  D: number
  E: number
}
export interface TitleItem extends Item {
  title: string
}
export interface RateItem extends Item {
  rate: number
}

/*---------- Header ----------*/
export type Header = Record<string, { key: string; value: string }>

export interface GetHeader {
  (items: pdfjsLib.TextContentItem[], start: number, end: number): Header
}

/*---------- Personnel ----------*/
export interface Personnel {
  list: TitleItem[]
  subtotal: null | Item
  total: null | Item
  benefits: null | RateItem
}
export interface GetPersonnel {
  (items: pdfjsLib.TextContentItem[], start: number, end: number): Personnel
}

/*---------- Section ----------*/
export interface Section {
  list: TitleItem[]
  total: null | Item
}
export interface GetSection {
  (
    totalRegex: string,
    items: pdfjsLib.TextContentItem[],
    start: number,
    end: number
  ): [Section, number]
}

export interface Content {
  header: Header
  personnel: Personnel
  operatingExpenses: Section
  otherCosts: Section
  indirectCosts: RateItem
  total: Item
}

/*---------- Reducer ----------*/
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
  | {
      type: 'change-content'
      name: string
      value: string
    }

export interface Reducer {
  (state: State, action: Action): State
}
