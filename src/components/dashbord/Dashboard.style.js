import { makeStyles } from "@material-ui/core";

const DashboardStyle = makeStyles(themeGeneral => ({

    filtre: {
        display: "flex",
        gap: "20px"
    },

    selection: {
        width: "20vw",
        [themeGeneral.breakpoints.down('sm')]: {
            width: "100%"
        },

    },


    nbApprenant: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        [themeGeneral.breakpoints.down('xs')]: {
            display: "block",

        }
    },
    nbValue: {
        display: "flex",
        gap: "20px",
        width: "20%",
        border: "4px solid black",
        borderRadius: "10px",
        padding: "40px 10px 40px 40px",
        [themeGeneral.breakpoints.down('xs')]: {
            width: "100%",
            justifyContent: "center",
            padding: "20px 0",
            marginBottom: "10px"
        }

    },
    nbVal: {
        color: "#FF6600",
        fontWeight: "medium"
    },
    valueIcon: {
        width: "25%",

    },
    chartStyle : {
        display:"flex",
        gap:"20px",
        marginBottom:"20px"
        }


}));


export default DashboardStyle;

