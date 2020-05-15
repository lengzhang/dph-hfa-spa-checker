import React from 'react'
import MuiTypography from '@material-ui/core/Typography'

import Header from '../Header'
import Table from '../Table'

import usePDFContent from '../../hooks/usePDFContent'

const Checker: React.FC = () => {
  const { loading, content, loadFromURL } = usePDFContent()

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0])
      loadFromURL(url)
    }
  }
  return (
    <div>
      <MuiTypography variant="h4">DPH HFA SPA Checker</MuiTypography>
      <input type="file" onChange={onChange} multiple={false} accept=".pdf" />
      <Table content={content} />
    </div>
  )
}

export default Checker
