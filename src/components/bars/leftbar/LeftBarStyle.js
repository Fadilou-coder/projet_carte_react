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
        display: "flex",
        alignItems: "center",
        backgroundColor: themeGeneral.palette.primary.white,
        color: themeGeneral.palette.primary.white
    },
    logoDiv: {
        borderBottom: '1px solid ##000000',
        padding: "45px 5px 30px 5px",
        "& .MuiAvatar-img": {
            color: 'transparent',
            width: "100%",
            height: "100%",
            display: "flex",

            /* object-fit: cover; */
            textAlign: 'center',
            textIndent: '10000px',
            objectFit: 'fill',
        }
    },
    logoStyle: {
        width: "100%",
        height:"auto",
        marginTop:"40px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

        "& .MuiAvatar-root": {
           display:"none",
        }
    },
    active: {
        backgroundColor: "#FF6600",
        borderBottom: '1px solid #000000',
        borderRight: '1px solid #000000',
        borderLeft: '1px solid #000000',


        "& .MuiTypography-displayBlock ": {
            display: 'block',
            fontSize: "20px",
            color: "#000000"
        },    }
    ,
    notActive: {
        borderBottom: '1px solid #138A8A',
        "& .MuiTypography-displayBlock ": {
            display: 'block',
            fontSize: "20px",
            color: "#000000"
        }
    },
    linkIcon: {
        color: '#000000'
    }

}))
