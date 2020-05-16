import React from 'react'

import TableCell from '../../TableCell'
import TableRow from '../../TableRow'

import { RateTableRowProps } from './types'

const keys = ['A', 'B', 'C', 'D', 'E']

const RateTableRow: React.FC<RateTableRowProps> = ({
  title,
  items,
  checkItems,
}) => {
  const checkItemsWithRate = keys.reduce((acc, key) => {
    acc[key] = Math.round(checkItems[key] * (items.rate / 100))
    return acc
  }, {})

  return (
    <TableRow hover>
      <TableCell fontBlod component="th" align="left">
        {title}
      </TableCell>
      {keys.map((key, i) => {
        const isCorrect = items[key] <= checkItemsWithRate[key]
        return (
          <TableCell
            key={i}
            fontBlod
            fontColor={isCorrect ? 'green' : 'red'}
            align="right"
          >
            {items[key]}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default RateTableRow
