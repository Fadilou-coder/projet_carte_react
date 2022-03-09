import {makeStyles} from "@material-ui/core";
import themeGeneral from "../../theme";
import vectorNavBar from '../../../assets/images/vectorNavBar.jpeg'

export const TopbarStyle = makeStyles(theme => ({
    topbar: {
        [theme.breakpoints.up('sm')] : {
            marginLeft: '200px',
        },
       /* backgroundColor: themeGeneral.palette.primary.black,*/
        backgroundImage:`url(${vectorNavBar})`,
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
        marginLeft: "62%",
        color: themeGeneral.palette.primary.white,
        [theme.breakpoints.up('sm')] : {
            marginLeft: '84%',
        },
    }
}))
