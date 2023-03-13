import { createTheme} from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#393E46",
    },
    secondary: {
      main: "#f1faee",
    },
    // background: {
    //   default: "#ffffff",
    //   paper: "#393E46",
    // }
  },
  typography: {
    fontSize: 14,
    color: "secondary",
  },
  spacing: 8,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "primary",
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "#ffffff",
        }
      } 
    },
  }
});