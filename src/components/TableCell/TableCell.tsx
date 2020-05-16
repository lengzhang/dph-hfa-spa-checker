import React from 'react'
import cx from 'classnames'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { green, red, grey } from '@material-ui/core/colors'

import MuiTableCell from '@material-ui/core/TableCell'

import { TableCellProps, StytleProps } from './types'

const useStyles = makeStyles<Theme, StytleProps>((theme) =>
  createStyles({
    root: {},
    fontBlod: {
      fontWeight: 600,
    },
    backgroundColor: ({ backgroundColor }) => ({
      backgroundColor:
        backgroundColor === 'grey'
          ? grey[200]
          : backgroundColor === 'green'
          ? green[200]
          : backgroundColor === 'red'
          ? red[200]
          : undefined,
    }),
    fontColor: ({ fontColor }) => ({
      color:
        fontColor === 'black'
          ? 'black'
          : fontColor === 'white'
          ? 'white'
          : fontColor === 'green'
          ? green[600]
          : fontColor === 'red'
          ? red[600]
          : undefined,
    }),
  })
)

const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  backgroundColor,
  fontBlod = false,
  fontColor,
  ...otherProps
}) => {
  const classes = useStyles({ backgroundColor, fontColor })

  const classname = cx(className, {
    [classes.backgroundColor]: backgroundColor,
    [classes.fontBlod]: fontBlod,
    [classes.fontColor]: fontColor,
  })

  return (
    <MuiTableCell className={classname} {...otherProps}>
      {children}
    </MuiTableCell>
  )
}

export default TableCell
