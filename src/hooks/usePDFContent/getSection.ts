import { myParseInt, isNumber } from './utilts'
import { GetSection, Section } from './types'

const getSection: GetSection = (totalRegex, items, start, end) => {
  const result: Section = { list: [], total: null }
  const regex = new RegExp(`^${totalRegex}`)

  const totalIndex = items.findIndex((item, index) => {
    if (index <= start || index > end) return false
    return regex.test(item.str)
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
      } else if (regex.test(title)) {
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

export default getSection
