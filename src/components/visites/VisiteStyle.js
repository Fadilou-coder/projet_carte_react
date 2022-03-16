
import {makeStyles} from "@material-ui/core";
 import themeGeneral from '../theme';

const VisiteStyle = makeStyles(({

    visiteur: {
        border: "2px solid #44C3CF"
    },
    visitePage: {
        width: "100%"
    },
    tableau: {
        boxShadow: "2000px"
    },
    textTypo:{
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
    },
    labelText:{
        fontWeight:"normal",
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
        fontSize: "20px",
        marginBottom: "2px"
    },
    listIsload:{
        width: "20vw",
        height:"40vh",
        display:"block",
        margin:"0% auto"
    }

}));

export default VisiteStyle;
