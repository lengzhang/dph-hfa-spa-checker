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
  const fontColors = {
    A: 'black',
    B:
      items['B'] <= Math.round(checkItems['B'] * (items.rate / 100))
        ? 'green'
        : 'red',
    C: items['C'] === items['A'] + items['B'] ? 'green' : 'red',
    D: 'black',
    E: items['E'] === items['D'] - items['C'] ? 'green' : 'red',
  }

  return (
    <TableRow hover>
      <TableCell fontBlod component="th" align="left">
        {title}
      </TableCell>
      {keys.map((key, i) => (
        <TableCell key={i} fontBlod fontColor={fontColors[key]} align="right">
          {items[key]}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default RateTableRow
