import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { blue, red, green } from '@material-ui/core/colors'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: { main: green[400] },
      secondary: { main: blue[400] },
    },
  })
)

export default theme
