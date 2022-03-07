import { makeStyles } from "@material-ui/core";
import themeGeneral from '../../theme'

export const LeftBarStyle = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: "240px"
        }
    },
    drawerPaper: {
        width: "240px",
        backgroundColor: themeGeneral.palette.primary.white,
        color: themeGeneral.palette.primary.white,
    },
    logoDiv: {
        borderBottom: '1px solid #004d40',
        padding: theme.spacing(4),
        "& .MuiAvatar-img": {
            color: 'transparent',
            width: "100%",
            height: "100%",
            display:"flex",
            
            /* object-fit: cover; */
            textAlign: 'center',
            textIndent: '10000px',
            objectFit: 'fill',
        }
    },
    logoStyle: {
        width: theme.spacing(16),
        height: theme.spacing(10)
    },
    active: {
        backgroundColor: themeGeneral.palette.primary.main,
        borderBottom: '1px solid #004d40',
        "& .MuiTypography-displayBlock ": {
            display: 'block',
            fontSize: "20px",
            color: "#ffb300"
        }
    },
    notActive: {
        borderBottom: '1px solid #004d40',
        "& .MuiTypography-displayBlock ": {
            display: 'block',
            fontSize: "20px",
            color: "#ffb300"
        }
    },
    linkIcon: {
        color: '#ffb300'
    }

}))
