import { Item, TitleItem } from '../../../hooks/usePDFContent'

export interface SectionProps {
  title: string
  list: TitleItem[]
  total: Item
}
