import React from 'react'

import TableCell from '../../TableCell'
import TableRow from '../../TableRow'

import getSum from '../../../utils/getSum'

import { TotalTableRowProps } from './types'

const keys = ['A', 'B', 'C', 'D', 'E']

const TotalTableRow: React.FC<TotalTableRowProps> = ({
  title,
  list,
  total,
}) => {
  const sum = getSum(list)

  return (
    <TableRow hover>
      <TableCell fontBlod>{title}</TableCell>
      {keys.map((key, i) => {
        const value = total[key]
        return (
          <TableCell
            key={i}
            fontBlod
            fontColor={sum[key] === value ? 'green' : 'red'}
            align="right"
          >
            {value}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default TotalTableRow
