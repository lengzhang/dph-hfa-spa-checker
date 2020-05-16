import React from 'react'

import TableCell from '../../TableCell'
import TableRow from '../../TableRow'

import BenefitsTableRow from '../RateTableRow'
import TotalTableRow from '../TotalTableRow'

import { PersonnelProps } from './types'
import { Item } from '../../../hooks/usePDFContent'

const headerItems = [
  'PERSONNEL (Indicate if position is vacant)',
  '(C)-(B)',
  '',
  '(A)+(B)',
  '',
  '(D)-(C)',
]

const keys = ['A', 'B', 'C', 'D', 'E']

const Personnel: React.FC<PersonnelProps> = ({
  content: { list, subtotal, benefits, total },
}) => {
  const totalList = [...list, benefits].map((cur) => cur as Item)

  return (
    <>
      <TableRow backgroundColor="grey">
        {headerItems.map((title, i) => (
          <TableCell
            key={i}
            fontBlod
            component={i === 0 ? 'th' : 'td'}
            align={i === 0 ? 'left' : 'center'}
          >
            {title}
          </TableCell>
        ))}
      </TableRow>
      {list.map((item, i) => {
        return (
          <TableRow key={i} hover>
            <TableCell component="th" align="left">
              {item.title.split('\n').map((str, i) => (
                <div key={i}>{str}</div>
              ))}
            </TableCell>
            {keys.map((key, j) => {
              return (
                <TableCell key={j} align="right">
                  {item[key]}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
      <TotalTableRow
        title="SUBTOTAL FULL TIME SALARIES"
        list={list}
        total={subtotal}
      />
      <BenefitsTableRow
        title={`EMPLOYEE BENEFITS @${benefits.rate}% *Based on Actual`}
        items={benefits}
        checkItems={subtotal}
      />
      <TotalTableRow
        title="TOTAL FULL TIME SALARIES AND EMPLOYEE BENEFITS"
        list={totalList}
        total={total}
      />
    </>
  )
}

export default Personnel
