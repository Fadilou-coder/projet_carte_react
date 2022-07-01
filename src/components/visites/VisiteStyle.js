
import {makeStyles} from "@material-ui/core";
import themeGeneral from '../theme';

const VisiteStyle = makeStyles(theme => ({

    visiteur: {
        border: "2px solid #000000",
        borderRadius: "10px",
        width: "15vw",
        borderColor: "#000000",
        '&:focus': {
            borderColor: "#44C3CF",
        },
        [theme.breakpoints.down('sm')]: {
            width: "48%"
        },
    },
    champfiltre: {
        display: "flex",
        justifyContent: "space-around",
        width: "60%",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            flexWrap: "wrap"
        },

    },
    champtextfiltre: {
        [theme.breakpoints.down('sm')]: {
            display: "none !important",
        },
    },

    ajoutScan: {
        // width: "35%",
        display: "flex",
        justifyContent: "end",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginTop: "20px",
            justifyContent: "space-between",

        },
    },
    filtre: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            // backgroundColor: 'green',
            display: "block",

        },
    },
    visitePage: {
        width: "100%"
    },
    tableau: {
        boxShadow: "2000px"
    },
    textTypo: {
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
    },
    labelText: {
        fontWeight: "normal",
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
        fontSize: "20px",
        marginBottom: "2px"
    },
    listIsload: {
        width: "40vw",
        height: "50vh",
        display: "block",
        margin: "0% auto"
    },
    formError: {
        color: 'red'
    },
    mysearch: {
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginTop: "20px"
        },
        border: "2px solid #000000",
        color: "#787486",
        width: "12vw",
        borderRadius: "10px",
        borderColor: "#000000",
        
        
    },
    dialog:{
        [theme.breakpoints.down('sm')]: {
            left: "0"
        },
    },
    mytextsearch: {
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        
    },
    table: {
        width: "80%",
        justifyContent: "center",
    },
    tabRow: {
        "& .MuiTableCell-alignRight": {
            width: "5%",
            fontSize: "20px",
            textAlign: "inherit"
        },
        "& .MuiTableCell-alignCenter": {
            textAlign: "center",
            width: "55%",
            fontSize: "20px"
        },
        "& .MuiTableCell-alignLeft": {
            textAlign: "left",
            width: "10%",
            fontSize: "20px"
        }
    },
    comment:{
        width: "20em"
    }
}));

export default VisiteStyle;
