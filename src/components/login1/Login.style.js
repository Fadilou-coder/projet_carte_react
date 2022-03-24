import {makeStyles} from "@material-ui/core";
import bg from "../../assets/images/bg.jpeg";
// import themeGeneral from '../theme';

const LoginStyle = makeStyles(({

    root: {
        padding: 0,
        margin: 0
    },
    formError: {
        color: 'red'
    },
    loginpage: {
        padding: 0,
        margin: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FF6600",
        // backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        display: "block"
    },
    pageGreen: {
        backgroundColor: "#FF6600",
        width: "100%",
        height: "100%",
        opacity: "81%",
        position: " absolute",
        zIndex: "0 !important",

    },
    loginContent: {
        width: "100%",
        display: "flex !important",
        flexDirection: "column !important",
        justifyContent: "center",
        alignItems: "center",
    },
    titre: {
        color: "white",
        fontSize: "2.8vw"
    },

    contenu: {
        width: "50%",
        opacity: "100% !important",
        backgroundColor: "white",
        borderRadius: "19px",
        padding: " 10vh 5vw 15vh 5vw",

    },
    logo: {
        display: "flex !important",
        justifyContent: "left",
        alignItems: "center",
    },
    subtit: {
        fontWeight: 500,
        fontSize: "large",
        color: "#138A8A",
        textAlign: "center"
    },
    '@media only screen and (max-width: 700px)': {
        loginContent: {
            display: "flex !important",
            height: "100% !important"
        },
        contenu: {
            width: "85%",
            // height: "70%",
            padding: "30px 30px 50px 30px",
            margin: "0",
            display: "flex !important",
            justifyContent: "center",
            flexDirection: "column",
        },
        logo: {
            display: "flex !important",
            justifyContent: "center",
            marginBottom: "10px"
        },
        titre: {
            // width: "100%"
            fontSize: "calc(1em + 1vw);",
            textAlign: "center"
        },
        subtit: {
            fontSize: "small",
        }

    }


}));


export default LoginStyle;
