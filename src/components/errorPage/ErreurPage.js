import React from 'react'
import ErreurPageStyle from "./ErreurPageStyle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";

const ErreurPage = () => {
    const classes = ErreurPageStyle()
    let history = useHistory();
    return (
        <div className="quizBg">
            <div className="container">
                <h2 className={classes.error}>O O P S !</h2>
                <Typography variant="body1" className={classes.notfound}>404 - LA PAGE EST INTROUVABLE</Typography>
                <Button
                     size="medium"
                     variant="contained"
                     color="info"
                     style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent:"center",
                        margin: "auto",
                        marginTop: "12px"
                    }}
                    onClick={()=>{
                        history.push("/visites");
                    }}

                >
                    RETOURNER A LA PAGE D'ACCUEIL
                </Button>
                {/*<img style={centerImg} src={batman} alt="error page"/>*/}
            </div>
        </div>
    )
}

export default ErreurPage
