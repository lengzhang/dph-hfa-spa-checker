import { TableRowProps as MuiTableRowProps } from '@material-ui/core/TableRow'
import { ElementType } from 'react'

export interface TableRowProps extends MuiTableRowProps {
  className?: string
  component?: ElementType
  backgroundColor?: 'grey' | 'green' | 'red'
}

export interface StytleProps extends Pick<TableRowProps, 'backgroundColor'> {}
