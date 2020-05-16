import { myParseInt, isNumber } from './utilts'
import { GetPersonnel, Personnel } from './types'

const getPersonnel: GetPersonnel = (items, start, end) => {
  const result: Personnel = {
    list: [],
    subtotal: null,
    benefits: null,
    total: null,
  }

  const subtotalIndex = items.findIndex((item, index) => {
    if (index <= start || index > end) return false
    return /^SUBTOTAL FULL TIME SALARIES/.test(item.str)
  })

  let temp: { title: string[]; nums: string[] } = { title: [], nums: [] }

  for (let i = start + 1; i < end; ++i) {
    const item = items[i].str

    if (isNumber.test(item) || item === '-') temp.nums.push(item)
    else temp.title.push(item)

    if (i < subtotalIndex) {
      if (temp.title.length === 2 && temp.nums.length === 5) {
        result.list.push({
          title: `${temp.title.shift()}\n${temp.title.shift()}`,
          A: myParseInt(temp.nums.shift()),
          B: myParseInt(temp.nums.shift()),
          C: myParseInt(temp.nums.shift()),
          D: myParseInt(temp.nums.shift()),
          E: myParseInt(temp.nums.shift()),
        })
      }
    } else {
      if (temp.title.length === 1 && temp.nums.length === 5) {
        const title = temp.title.shift()
        const key = /^SUBTOTAL FULL TIME SALARIES/i.test(title)
          ? 'subtotal'
          : /^EMPLOYEE BENEFITS/i.test(title)
          ? 'benefits'
          : /^TOTAL FULL TIME SALARIES AND EMPLOYEE BENEFITS$/i.test(title)
          ? 'total'
          : null

        if (key === 'benefits') {
          const match = title.replace(/ +/g, '').match(/@(\d\d)%/)
          result.benefits = {
            rate: match ? myParseInt(match[1]) : 0,
            A: myParseInt(temp.nums.shift()),
            B: myParseInt(temp.nums.shift()),
            C: myParseInt(temp.nums.shift()),
            D: myParseInt(temp.nums.shift()),
            E: myParseInt(temp.nums.shift()),
          }
        } else if (key !== null) {
          result[key] = {
            A: myParseInt(temp.nums.shift()),
            B: myParseInt(temp.nums.shift()),
            C: myParseInt(temp.nums.shift()),
            D: myParseInt(temp.nums.shift()),
            E: myParseInt(temp.nums.shift()),
          }
        } else {
          while (temp.title.length > 0) temp.title.shift()
          while (temp.nums.length > 0) temp.nums.shift()
        }
      }
    }
  }
  return result
}

export default getPersonnel
