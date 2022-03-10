import {createTheme} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#05888A",
            green: "#c8ecf1",
            white:"#FFFFFF",
            grey: "#E5E5E5",
            black: "#000000",
            vert:"#51BFD0"
        },
        secondary : {
            main:"#51BFD0",
            orange:"#BC6602",
            labelColor:"#756F86"
        }
    },

    typography: {
        fontFamily: 'Open Sans, Arial',
      }
});

export default theme;
