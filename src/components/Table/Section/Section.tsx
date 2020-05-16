import React from 'react'

import TableCell from '../../TableCell'
import TableRow from '../../TableRow'

import TotalTableRow from '../TotalTableRow'

import { SectionProps } from './types'

const keys = ['A', 'B', 'C', 'D', 'E']

const Section: React.FC<SectionProps> = ({ title, list, total }) => {
  return (
    <>
      <TableRow backgroundColor="grey">
        <TableCell fontBlod align="left" colSpan={6}>
          {title}
        </TableCell>
      </TableRow>
      {list.map((item, i) => (
        <TableRow key={i} hover>
          <TableCell component="th" align="left">
            {item.title}
          </TableCell>
          {keys.map((key, j) => (
            <TableCell key={j} align="right">
              {item[key]}
            </TableCell>
          ))}
        </TableRow>
      ))}
      <TotalTableRow title={`TOTAL ${title}`} list={list} total={total} />
    </>
  )
}

export default Section
