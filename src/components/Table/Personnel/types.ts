import { Personnel, RateItem, Item } from '../../../hooks/usePDFContent'

export interface PersonnelProps {
  content: null | Personnel
}

export interface SubtotalProps {
  content: null | Personnel
}

export interface BenefitsProps {
  benefits: RateItem
  subtotal: Item
}

export interface TotalProps {
  content: null | Personnel
}
