import React from 'react'

import MuiTable from '@material-ui/core/Table'
import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableContainer from '@material-ui/core/TableContainer'
import MuiPaper from '@material-ui/core/Paper'

import TableHeader from './TableHeader'
import Personnel from './Personnel'
import Section from './Section'

import TotalTableRow from './TotalTableRow'
import RateTableRow from './RateTableRow'

import { TableProps } from './types'

import getSum from '../../utils/getSum'

const Table: React.FC<TableProps> = ({
  content: {
    header,
    personnel,
    operatingExpenses,
    otherCosts,
    indirectCosts,
    total,
  },
}) => {
  return (
    <MuiTableContainer component={MuiPaper}>
      <MuiTable size="small">
        <TableHeader content={header} />
        <MuiTableBody>
          <Personnel content={personnel} />
          <Section
            title="OPERATING EXPENSES"
            list={operatingExpenses.list}
            total={operatingExpenses.total}
          />
          <Section
            title="OTHER COSTS"
            list={otherCosts.list}
            total={otherCosts.total}
          />
          <RateTableRow
            title={`INDIRECT COSTS @${indirectCosts.rate}% of Total Direct Costs *Based on Actual`}
            items={indirectCosts}
            checkItems={getSum([
              personnel.total,
              operatingExpenses.total,
              otherCosts.total,
            ])}
          />
          <TotalTableRow
            title="TOTAL PROGRAM COST"
            list={[
              personnel.total,
              operatingExpenses.total,
              otherCosts.total,
              indirectCosts,
            ]}
            total={total}
          />
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  )
}

export default Table
