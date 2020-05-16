import React from 'react'

import MuiTableHead from '@material-ui/core/TableHead'

import TableCell from '../TableCell'
import TableRow from '../TableRow'

import { TableHeaderProps } from './types'

const headerItems = [
  ['', 'Column A', 'Column B', 'Column C', 'Column D', 'Column E'],
  [
    'APPROVED BUDGET CATEGORIES',
    'Prior Amount Spent',
    'Amount Spent This Month',
    'Amount Spent To Date',
    'Approved Budget Amount',
    'Current Balance',
  ],
]

const Table: React.FC<TableHeaderProps> = ({ content }) => {
  return (
    <MuiTableHead>
      {headerItems.map((row, i) => (
        <TableRow key={i}>
          {row.map((title, j) => (
            <TableCell key={j} align="center" valign="middle">
              {title}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableHead>
  )
}

export default Table
