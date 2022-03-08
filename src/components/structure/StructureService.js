import {makeStyles} from "@material-ui/core";
import imagePromo from "../../assets/images/Rectangle7img.jpg"
import themeGeneral from '../theme'

const StructureStyle =makeStyles((theme) => ({

   
   
    subContainer:{
        display:"flex",
        justifyContent:"center",
        padding:themeGeneral.spacing(1),
    },
    textTypo:{
        fontWeight:"bold",
        fontFamily: "Arial",
        color: themeGeneral.palette.primary.black,
        fontSize: "40px",
        marginTop: "50px"
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
        marginBottom: theme.spacing(5)
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
    footer:{
        zIndex:1,
        position: "absolute",
        width: "100%",
        /* width: "99.6%",*/
        top:"58.5%",
        bottom:"56%"
    }
}));

export default StructureStyle;
