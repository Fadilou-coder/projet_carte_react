import { makeStyles } from "@material-ui/core";
import themeGeneral from '../theme'

const ApprenantStyle = makeStyles((theme) => ({

    visiteur: {
        border: "2px solid #000000",
        width: "15vw",
        fontWeight: "bolder",
        color: "#787486",
        '&:focus': {
            borderColor: "#000000",
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%"

        },
    },

    filtre: {
        display: "flex",
        alignContent: "center",
        flexWrap: "wrap",
        gap: "10px",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            display:"block",
            '& div': {
                margin:"3px 0 0 0"
            },
        },

    },
    champtextfiltre: {
        [theme.breakpoints.down('sm')]: {
            display: "none !important",
        },
    },
    gridfiltre: {
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
        [theme.breakpoints.down('md')]: {
            display: "block"
        },
    },

    avatarApprenant: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    },


    tableau: {
        boxShadow: "2000px",
        '& .super-app-theme--header': {
            '& .MuiDataGrid-columnHeaderTitleContainer': {
                padding: 0,
                justifyContent: "center !important"
            },
            // set header font styling
            '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 600,
                fontFamily: "Open Sans",
                textTransform: 'uppercase',
                fontSize: '16px',

            },
        },
        '& .apprenant-table--row': {
        },
        '& .apprenant-table--cell': {
            justifyContent: "center !important",
            fontSize: '16px',

        },
        [theme.breakpoints.down('md')]: {
            width: "100% !important",
            marginBottom: "12px"

        }

    },
    mysearch: {
        borderRadius: "50px !important",
        border: "2px solid #000000",
        [theme.breakpoints.down('sm')]: {
            width: "100% !important"
        },
        
    },
    table: {
        display: "flex",
        // justifyContent: "space-evenly",
        gap: "1.5vw",
        marginTop: "20px",
        [theme.breakpoints.down('md')]: {
            display: "block",

        },
    },
    detailUser: {
        [theme.breakpoints.down('md')]: {
            width: "80% !important",
            margin: "0 auto !important",

        },
        backgroundColor: "white"
    }
    ,

    subContainer: {
        padding: themeGeneral.spacing(1),
        border: "2px solid #E5E5E5",
        backgroundColor: themeGeneral.palette.primary.white,
        borderRadius: "20px",
        width: "100%",
        boxShadow: "5px 5px 5px grey"
    },
    textTypo: {
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
        fontSize: "40px"
    },
    formError: {
        color: 'red'
    },
    inputDate: {
        background: themeGeneral.palette.primary.white,
        border: `1px solid #DBE2EA`,
        borderRadius: "5px",
        width: "80%",
        "& .css-i4bv87-MuiSvgIcon-root ": {
            marginRight: "10px",
        }, [theme.breakpoints.down("sm")]: {
            width: "35vw",
            margin: theme.spacing(1)
        },
    },
    labelText: {
        fontWeight: "normal",
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
        fontSize: "20px",
        marginBottom: "2px"
    },
    textContainer: {
        zIndex: 3,
        background: themeGeneral.palette.primary.white,
        marginRight: themeGeneral.spacing(10),
        height: "20vh"
    },
    formContainer: {
        zIndex: 2,
        filter: ` drop-shadow(0px 4px 4px ${'#05888A'})`,
        background: themeGeneral.palette.primary.white,
        borderRadius: "20px",
        //  height: "500px",
    },
    connexion: {
        textAlign: "center"
    },
    btnAdd: {
        width: "200px",
        backgroundColor: themeGeneral.palette.primary.main,
        fontWeight: "normal",
        fontFamily: "Arial",
        fontSize: "50px",
    },
    logoAndText: {
        display: "flex",
        alignItems: "center",
        color: themeGeneral.palette.primary.main,
        fontWeight: "bold",
    },
    text: {
        background: themeGeneral.palette.primary.main,
        color: themeGeneral.palette.primary.white,
        textAlign: "center",
        fontWeight: "bold",
        // marginLeft: theme.spacing(4)
    },
    infoUser: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white"

    },
    input: {
        marginBottom: theme.spacing(5)
    },
    item: {
        marginBottom: theme.spacing(3),
        display: "flex",
        alignContent: 'space-evenly'
    },
    passwordbli: {
        float: 'left',
    },
    gridFormBtn: {
        background: themeGeneral.palette.primary.vert,
        color: themeGeneral.palette.primary.white,
        width: "60%",
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    gridContainer: {
        padding: "5px",
        border: "1px solid #E5E5E5",
        borderRadius: "5px"
    },
    footer: {
        zIndex: 1,
        position: "absolute",
        width: "100%",
        /* width: "99.6%",*/
        top: "58.5%",
        bottom: "56%"
    },
    filterInput: {
        border: "2px solid #44C3CF",
        borderRadius: "10px",
        width: "12vw",
        borderColor: "#44C3CF",
        '&:focus': {
            borderColor: "#44C3CF",
        }
    }
}));

export default ApprenantStyle;
