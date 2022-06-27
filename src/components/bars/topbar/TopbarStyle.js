import {makeStyles} from "@material-ui/core";
import themeGeneral from "../../theme";

export const TopbarStyle = makeStyles(theme => ({
    topbar: {
        [theme.breakpoints.up('sm')] : {
            marginLeft: '200px',
        },
        backgroundColor:"#000000",
        boxShadow:"none !important",
        color:'black',
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        top: 0,
        bottom: "auto",
        height:"70px",
        background:"none"
    },
    topbarAdmin: {
        boxShadow:"none !important",
        color:'black',
        backgroundColor:"#000000",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        top: 0,
        bottom: "auto",
        height:"70px",
        background:"none"
    },
    topbarLogo:{
        height: "50px",
        width: "88px"
    },
    topbarContent: {
        color: themeGeneral.palette.primary.white,
        [theme.breakpoints.up('sm')]:{
            display: "none"
        },
    },
    avatar: {
        // marginLeft: "62%",
        color: themeGeneral.palette.primary.white,
        [theme.breakpoints.up('sm')] : {
            // marginLeft: '84%',
        },
    },
    mysearch: {
        width : "1000vw",
        [theme.breakpoints.down('xs')] : {
            display:"none",
        },

    },



}))
