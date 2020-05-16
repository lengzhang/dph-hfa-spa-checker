import React from 'react'
import cx from 'classnames'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { green, red, grey } from '@material-ui/core/colors'

import MuiTableRow from '@material-ui/core/TableRow'

import { TableRowProps, StytleProps } from './types'

const useStyles = makeStyles<Theme, StytleProps>((theme) =>
  createStyles({
    root: {},
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
  })
)

const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  backgroundColor,
  ...otherProps
}) => {
  const classes = useStyles({ backgroundColor })

  const classname = cx(className, {
    [classes.backgroundColor]: backgroundColor,
  })

  return (
    <MuiTableRow className={classname} {...otherProps}>
      {children}
    </MuiTableRow>
  )
}

export default TableRow
