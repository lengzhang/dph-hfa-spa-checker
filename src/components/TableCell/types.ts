import MuiTableCell, {
  TableCellProps as MuiTableCellProps,
} from '@material-ui/core/TableCell'

export interface TableCellProps extends MuiTableCellProps {
  className?: string
  backgroundColor?: 'grey' | 'green' | 'red'
  fontColor?: 'black' | 'white' | 'green' | 'red'
  fontBlod?: boolean
}

export interface StytleProps
  extends Pick<TableCellProps, 'backgroundColor' | 'fontColor'> {}
