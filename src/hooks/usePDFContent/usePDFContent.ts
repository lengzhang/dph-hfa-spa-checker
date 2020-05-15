import { useState, useReducer } from 'react'

import pdfjsLib from 'pdfjs-dist'
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/browse/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker`

import getHeader from './getHeader'
import getPersonnel from './getPersonnel'
import getOperatingExpenses from './getOperatingExpenses'
import getOtherCosts from './getOtherCosts'

import { myParseInt, isNumber } from './utilts'

import { Content, State, Reducer } from './types'

const initialState: State = { loading: false, error: null, content: null }

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'set-loading':
      return { ...state, loading: action.value }

    case 'set-error':
      return { ...state, error: action.value }

    case 'set-content':
      return { ...state, content: action.value }

    default:
      return state
  }
}

const usePDFContent = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loadFromURL = (url: string) => {
    dispatch({ type: 'set-loading', value: true })
    const loadingTask = pdfjsLib.getDocument({ url })
    try {
      loadingTask.promise.then(async function (pdf) {
        // you can now use *pdf* here
        const page = await pdf.getPage(1)
        const textContent = await page.getTextContent()
        const items = textContent.items
          .filter((item) => {
            const str = item.str.trim()
            return str.length > 0 && str !== '$'
          })
          .sort((a, b) => b.transform[5] - a.transform[5])

        const [
          personnelIndex,
          operatingExpensesIndex,
          otherCostsIndex,
          indirectCostsIndex,
        ] = items.reduce(
          (acc, item, i) => {
            if (/^PERSONNEL/i.test(item.str) && acc[0] === -1) acc[0] = i
            else if (/^OPERATING EXPENSES/i.test(item.str)) acc[1] = i
            else if (/^OTHER COSTS/i.test(item.str)) acc[2] = i
            else if (/^INDIRECT COSTS/i.test(item.str)) acc[3] = i
            return acc
          },
          [-1, -1, -1, -1]
        )

        const header = getHeader(items, 0, personnelIndex)
        const personnel = getPersonnel(
          items,
          personnelIndex,
          operatingExpensesIndex
        )
        const [operatingExpenses] = getOperatingExpenses(
          items,
          operatingExpensesIndex,
          otherCostsIndex
        )
        const [otherCosts, otherCostsEndIndex] = getOtherCosts(
          items,
          otherCostsIndex,
          indirectCostsIndex
        )
        let step = 0
        const result: Content = {
          header,
          personnel,
          operatingExpenses,
          otherCosts,
          indirectCosts: null,
          total: null,
        }

        let temp: { title: string[]; nums: string[] } = { title: [], nums: [] }
        for (let i = otherCostsEndIndex + 1; i < items.length; ++i) {
          const item = items[i].str

          if (isNumber.test(item) || item === '-') temp.nums.push(item)
          else temp.title.push(item)

          if (temp.title.length === 1 && temp.nums.length === 5) {
            const title = temp.title.shift()
            if (/^INDIRECT COSTS/.test(title)) {
              const match = title.replace(/ +/g, '').match(/@(\d\d)%/)
              result.indirectCosts = {
                rate: match ? myParseInt(match[1]) : 0,
                A: myParseInt(temp.nums.shift()),
                B: myParseInt(temp.nums.shift()),
                C: myParseInt(temp.nums.shift()),
                D: myParseInt(temp.nums.shift()),
                E: myParseInt(temp.nums.shift()),
              }
            } else if (/^TOTAL PROGRAM COST/.test(title)) {
              result.total = {
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
        dispatch({ type: 'set-content', value: result })
        dispatch({ type: 'set-loading', value: false })
        URL.revokeObjectURL(url)
      })
    } catch (error) {
      dispatch({ type: 'set-error', value: error })
      dispatch({ type: 'set-loading', value: true })
    }
  }

  return { ...state, loadFromURL }
}

export default usePDFContent
