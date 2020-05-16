import React from 'react'

import MuiTypography from '@material-ui/core/Typography'
import MuiBox from '@material-ui/core/Box'
import MuiPaper from '@material-ui/core/Paper'
import MuiContainer from '@material-ui/core/Container'
import Collapse from '@material-ui/core/Collapse'

import Table from '../Table'
import UploadButton from '../UploadButton'

import usePDFContent from '../../hooks/usePDFContent'

const Checker: React.FC = () => {
  const { fileName, loadingStep, error, content, loadFromURL } = usePDFContent()

  return (
    <MuiContainer
      maxWidth="lg"
      style={{ minHeight: '100vh', paddingTop: '1vh', paddingBottom: '1vh' }}
    >
      <MuiPaper style={{ minHeight: '98vh' }}>
        <MuiBox padding={3}>
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
            {content !== null && (
              <MuiBox padding={1}>
                <Table content={content} />
              </MuiBox>
            )}
          </Collapse>
        </MuiBox>
      </MuiPaper>
    </MuiContainer>
  )
}

export default Checker
