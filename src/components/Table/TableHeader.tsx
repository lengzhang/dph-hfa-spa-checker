import React from 'react'

import MuiTableHead from '@material-ui/core/TableHead'
import MuiTypography from '@material-ui/core/Typography'

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

const keys = [
  'project-name',
  'agency-name',
  'date-prepared',
  'budget-period',
  'contract-number',
  'claim-period',
]

const Table: React.FC<TableHeaderProps> = ({ content }) => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell colSpan={6}>
          {keys.map((key, i) => {
            return content[key] ? (
              <MuiTypography key={i} variant="subtitle2">
                {`${content[key].key}: ${content[key].value}`}
              </MuiTypography>
            ) : null
          })}
        </TableCell>
      </TableRow>
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
