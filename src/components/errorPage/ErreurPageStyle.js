import {makeStyles} from "@material-ui/core";

const ErreurPageStyle = makeStyles((theme)=> ({
    quizBg: {
        margin: 0,
        padding: 0,
        backgroundColor: "var(--white-color)",
        display: "flex",
        justifyContent: "center"
    },
    container :{
        backgroundColor: "var(--white-color)",
        padding: "30px",
        flex: "0 1 80%",
        display: "flex",
        flexDirection:" column",
        alignItems:" stretch"
    },
    error: {
        textAlign: 'center',
        marginTop: '15%',
        fontSize: "100px",
        fontWeight: "lighter",
        fontFamily: "none"
    },
    notfound: {
        textAlign: 'center',
        fontWeight: "lighter"
    },
    button: {
        textAlign: "center",
        display: 'block',
        margin: '150px auto'
    }
}))

export default ErreurPageStyle
