import {makeStyles} from "@material-ui/core";
//import imagePromo from "../../assets/images/Rectangle7img.jpg"
import myColor from '../theme'

const StructureStyle =makeStyles((theme) => ({

    container:{
        height: "96vh",
        background:myColor.palette.primary.white,
        display:"flex"
    },
    subContainer:{
        display:"flex",
        justifyContent:"center",
        padding:myColor.spacing(1),
    },
    textTypo:{
        fontWeight:"bold",
        fontFamily: "Arial"
    },
    textContainer:{
        zIndex:3,
        background:myColor.palette.primary.white,
        marginRight:myColor.spacing(10),
        height:"20vh"
    },
    formContainer:{
        zIndex:2,
        filter:` drop-shadow(0px 4px 4px ${'#05888A'})`,
        background:myColor.palette.primary.white,
        borderRadius:"20px",
        //  height: "500px",
    },
    connexion:{
        textAlign:"center"
    },
    logoAndText:{
        display:"flex",
        alignItems:"center",
        color: myColor.palette.primary.main,
        fontWeight:"bold",
    },
    text:{
        background:myColor.palette.primary.main,
        color:myColor.palette.primary.white,
        textAlign: "center",
        fontWeight:"bold",
        // marginLeft: theme.spacing(4)
    },
    input: {
        marginBottom: theme.spacing(5),
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
        background: myColor.palette.primary.vert,
        color:myColor.palette.primary.white,
        width:"60%",
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    hrDivider:{
        width: "10px",
        height: "2px",
        marginTop: "5px",
        color: myColor.palette.primary.main
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
