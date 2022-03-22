import {makeStyles} from "@material-ui/core";
import themeGeneral from '../theme'

const AdminStyle =makeStyles((theme) => ({



    subContainer:{
        padding:themeGeneral.spacing(1),
        border: "2px solid #E5E5E5",
        backgroundColor: themeGeneral.palette.primary.white,
        borderRadius: "20px",
        width:"100%",
        boxShadow: "5px 5px 5px grey"
    },
    textTypo:{
        fontFamily: "Open sans",
        color: themeGeneral.palette.primary.black,
    },
    formError: {
        color: 'red'
    },
    labelText:{
        fontWeight:"normal",
        fontFamily: "Open sans",
        color: themeGeneral.palette.primary.black,
        fontSize: "20px",
        marginBottom: "2px"
    },
    errorMsg:{
        marginTop: "5px",
        color: "red",
        fontFamily: "Open sans",
    },
    textContainer:{
        zIndex:3,
        background:themeGeneral.palette.primary.white,
        marginRight:themeGeneral.spacing(10),
        height:"20vh"
    },
    formContainer:{
        zIndex:2,
        filter:` drop-shadow(0px 4px 4px ${'#05888A'})`,
        background:themeGeneral.palette.primary.white,
        borderRadius:"20px",
        //  height: "500px",
    },
    connexion:{
        textAlign:"center"
    },
    btnAdd:{
        width:"200px",
        backgroundColor: themeGeneral.palette.primary.main,
        fontWeight:"normal",
        fontFamily: "Arial",
        fontSize: "50px",
    },
    logoAndText:{
        display:"flex",
        alignItems:"center",
        color: themeGeneral.palette.primary.main,
        fontWeight:"bold",
    },
    text:{
        background:themeGeneral.palette.primary.main,
        color:themeGeneral.palette.primary.white,
        textAlign: "center",
        fontWeight:"bold",
        // marginLeft: theme.spacing(4)
    },
    input: {
        border: "1px solid #BDBCBC",
        padding: 20,
        borderRadius: "5px",
        '&:hover':
        {
            border: "2px solid #05888A",
        },
        '&:focus':
        {
            outline: "#05888A",
        }
    },
    item: {
        marginBottom: theme.spacing(3),
        display: "flex",
        alignContent: 'space-evenly'
    },
    passwordbli:{
        float:'left',
    },
    gridFormBtn: {
        background: themeGeneral.palette.primary.vert,
        color:themeGeneral.palette.primary.white,
        width:"60%",
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    gridContainer: {
        padding: "5px",
        border: "1px solid #E5E5E5",
        borderRadius: "5px"
    },
    footer:{
        zIndex:1,
        position: "absolute",
        width: "100%",
        /* width: "99.6%",*/
        top:"58.5%",
        bottom:"56%"
    },

    btnPrimary:{
        backgroundColor: "#05888A",
        fontFamily: "Arial",
        fontSize: "20px",
        marginTop: "10px",
    },
    mysearch: {
        [theme.breakpoints.down('xs')] : {
            display:"none",
        },
        border: "2px solid #44C3CF",
        color: "#787486",
        width: "12vw",
        borderRadius: "15px",
        borderColor: "#44C3CF",
        '&:focus':{
            borderColor: "#44C3CF",
        }
    }
    
}));

export default AdminStyle;
