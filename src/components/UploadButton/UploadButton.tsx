import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import MuiTypography from '@material-ui/core/Typography'
import MuiBox from '@material-ui/core/Box'

import MuiCircularProgress from '@material-ui/core/CircularProgress'

import MuiIconButton from '@material-ui/core/IconButton'

import PublishIcon from '@material-ui/icons/Publish'

import { UploadButtonProps } from './types'

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {},
    btnWrapper: {
      position: 'relative',
      '& > span': {
        marginLeft: theme.spacing(),
      },
    },
    progress: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    },
  })
)

const UploadButton: React.FC<UploadButtonProps> = ({
  fileName,
  loadingStep,
  error,
  loadFromURL,
}) => {
  const classes = useStyles()

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const url = URL.createObjectURL(file)
      loadFromURL(url, file.name)
    }
  }

  const onClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // @ts-ignore
    if (event.target.value) event.target.value = null
  }

  return (
    <MuiBox padding={1}>
      <MuiBox position="relative">
        <input
          id="file-upload"
          style={{ display: 'none' }}
          type="file"
          onChange={onChange}
          onClick={onClick}
          multiple={false}
          accept=".pdf"
        />
        <MuiIconButton component="label" htmlFor="file-upload">
          <PublishIcon />
        </MuiIconButton>
        {loadingStep > 0 && (
          <MuiCircularProgress className={classes.progress} size={48} />
        )}
        <MuiTypography
          style={{ marginLeft: 8 }}
          display="inline"
          variant="subtitle2"
        >
          {fileName ? fileName : 'Please select file'}
        </MuiTypography>
      </MuiBox>
      {error && (
        <MuiTypography color="error" variant="subtitle2">
          {error.message}
        </MuiTypography>
      )}
    </MuiBox>
  )
}

export default UploadButton
