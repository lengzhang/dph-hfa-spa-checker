import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import MuiTypography from '@material-ui/core/Typography'
import MuiBox from '@material-ui/core/Box'
import MuiContainer from '@material-ui/core/Container'

import Table from '../Table'

import usePDFContent from '../../hooks/usePDFContent'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(),
    },
  })
)

const Checker: React.FC = () => {
  const classes = useStyles()
  const { loading, content, loadFromURL } = usePDFContent()
  console.log('loading', loading)

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0])
      loadFromURL(url)
    }
  }

  return (
    <MuiContainer maxWidth="lg">
      <MuiBox paddingTop={4} paddingBottom={8}>
        <MuiTypography variant="h4">DPH HFA SPA Checker</MuiTypography>
        <input
          type="file"
          onChange={onFileChange}
          multiple={false}
          accept=".pdf"
        />
        {content !== null && <Table content={content} />}
      </MuiBox>
    </MuiContainer>
  )
}

export default Checker
