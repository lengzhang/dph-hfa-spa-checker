import React from 'react'

import MuiTypography from '@material-ui/core/Typography'
import MuiBox from '@material-ui/core/Box'
import MuiContainer from '@material-ui/core/Container'
import Collapse from '@material-ui/core/Collapse'

import Table from '../Table'
import UploadButton from '../UploadButton'

import usePDFContent from '../../hooks/usePDFContent'

const Checker: React.FC = () => {
  const { fileName, loadingStep, error, content, loadFromURL } = usePDFContent()

  return (
    <MuiContainer maxWidth="lg">
      <MuiBox paddingTop={4} paddingBottom={8}>
        <MuiTypography variant="h4">DPH HFA SPA Checker</MuiTypography>
        <UploadButton
          fileName={fileName}
          loadingStep={loadingStep}
          error={error}
          loadFromURL={loadFromURL}
        />
        <Collapse
          in={loadingStep === 0 && content !== null}
          timeout={2000}
          mountOnEnter
          unmountOnExit
        >
          {content !== null && <Table content={content} />}
        </Collapse>
      </MuiBox>
    </MuiContainer>
  )
}

export default Checker
