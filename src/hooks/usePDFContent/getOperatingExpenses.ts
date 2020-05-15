import pdfjsLib from 'pdfjs-dist'
import { myParseInt, isNumber } from './utilts'

export interface OperatingExpensesListItem {
  title: string
  A: number
  B: number
  C: number
  D: number
  E: number
}
export interface OperatingExpensesTotal {
  A: number
  B: number
  C: number
  D: number
  E: number
}
export interface OperatingExpenses {
  list: OperatingExpensesListItem[]
  total: null | OperatingExpensesTotal
}
interface GetOperatingExpenses {
  (items: pdfjsLib.TextContentItem[], start: number, end: number): [
    OperatingExpenses,
    number
  ]
}

const getOperatingExpenses: GetOperatingExpenses = (items, start, end) => {
  const result: OperatingExpenses = { list: [], total: null }

  const totalIndex = items.findIndex((item, index) => {
    if (index <= start || index > end) return false
    return /^TOTAL OPERATING EXPENSES/.test(item.str)
  })

  const temp: { title: string[]; nums: string[] } = { title: [], nums: [] }

  let i = start + 1
  for (i; i < end; ++i) {
    const item = items[i].str

    if (isNumber.test(item) || item === '-') temp.nums.push(item)
    else temp.title.push(item)

    if (temp.title.length === 1 && temp.nums.length === 5) {
      const title = temp.title.shift()

      if (i < totalIndex) {
        result.list.push({
          title,
          A: myParseInt(temp.nums.shift()),
          B: myParseInt(temp.nums.shift()),
          C: myParseInt(temp.nums.shift()),
          D: myParseInt(temp.nums.shift()),
          E: myParseInt(temp.nums.shift()),
        })
      } else if (/^TOTAL OPERATING EXPENSES/.test(title)) {
        result.total = {
          A: myParseInt(temp.nums.shift()),
          B: myParseInt(temp.nums.shift()),
          C: myParseInt(temp.nums.shift()),
          D: myParseInt(temp.nums.shift()),
          E: myParseInt(temp.nums.shift()),
        }
        break
      } else {
        while (temp.title.length > 0) temp.title.shift()
        while (temp.nums.length > 0) temp.nums.shift()
      }
    }
  }
  return [result, i]
}

export default getOperatingExpenses
