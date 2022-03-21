
import {makeStyles} from "@material-ui/core";
 import themeGeneral from '../theme';

const VisiteStyle = makeStyles(theme => ({

    visiteur: {
        border: "2px solid #44C3CF",
        borderRadius: "10px",
        width: "12vw",
        borderColor: "#44C3CF",
        '&:focus':{
            borderColor: "#44C3CF",
        }
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
    },
    formError: {
        color: 'red'
    },
    mysearch: {
        [theme.breakpoints.down('xs')] : {
            display:"none",
        },
        border: "2px solid #44C3CF",
        color: "#787486",
        width: "12vw",
        borderRadius: "10px",
        borderColor: "#44C3CF",
        '&:focus':{
            borderColor: "#44C3CF",
        }
    }

}));

export default VisiteStyle;
