import pdfjsLib from 'pdfjs-dist'
import { myParseInt, isNumber } from './utilts'

export interface OtherCostsListItem {
  title: string
  A: number
  B: number
  C: number
  D: number
  E: number
}
export interface OtherCostsTotal {
  A: number
  B: number
  C: number
  D: number
  E: number
}
export interface OtherCosts {
  list: OtherCostsListItem[]
  total: null | OtherCostsTotal
}
interface GetOtherCosts {
  (items: pdfjsLib.TextContentItem[], start: number, end: number): [
    OtherCosts,
    number
  ]
}

const getOtherCosts: GetOtherCosts = (items, start, end) => {
  const result: OtherCosts = { list: [], total: null }

  const totalIndex = items.findIndex((item, index) => {
    if (index <= start || index > end) return false
    return /^TOTAL OTHER COSTS/.test(item.str)
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
      } else if (/^TOTAL OTHER COSTS/.test(title)) {
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

export default getOtherCosts
