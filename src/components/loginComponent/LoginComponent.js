import React from "react";
import LoginComponentStyle from "./LoginComponentStyle";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import Backdrop from '@mui/material/Backdrop';
import logoSonatel from "../../assets/images/logoSonatel.png"
import footerSvg from "../../assets/images/footerLogin.svg"
import CircularProgress from '@mui/material/CircularProgress';

const LoginComponent = () => {
    const classes = LoginComponentStyle();

    return(
        <React.Fragment>
            <Grid container className={classes.container}>

                <Grid xs={12} className={classes.imagePromo}></Grid>
                <Grid container className={classes.subContainer}>
                    <Grid xs={3} className={classes.textContainer}>
                        <Grid xs={12} className={classes.logoAndText}>
                            <Typography>
                                <img src={logoSonatel} alt="logoSonatel"/>
                            </Typography>
                            <Typography  variant="h3" className={classes.textTypo}>
                                SONATEL<br />ACADEMY
                            </Typography>
                        </Grid>
                        <Grid xs={12} className={classes.text}>
                            <Typography variant="h4" >
                                La première école de codage gratuite au senegal
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={5} className={classes.formContainer}>
                        <Typography variant="h2" className={classes.connexion}>Connexion</Typography>
                        <Container className={classes.formSubContainer}>
                            <Grid item>
                                <TextField className={classes.input}
                                           id="standard-basic"
                                           label="Username"
                                           type="username"
                                           size="small"
                                           style={{ width: "100%" }}
                                           value="username"
                                />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.input}
                                           id="standard-basic"
                                           label="Password"
                                           type="password"
                                           size="small"
                                           style={{ width: "100%" }}
                                           value= "password"
                                />
                            </Grid>
                            <Grid item className={classes.item}>
                                <Button variant="text" color="primary" className={classes.passwordbli}>Mot de passe oublié ?</Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" className={classes.gridFormBtn}>Se connecter </Button>
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </Grid>

                            <Grid item>
                                <Typography variant="subtitle2">Vous n'avez pas encore d'identifiant</Typography>
                            </Grid>

                            <Grid item >
                                <Typography variant="subtitle2">Demander votre invation a votre :</Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="subtitle2">formateur ou formatrice si vous êtes apprenant</Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="subtitle2">Responsable si vous êtes formateur ou formatrice</Typography>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.footer}>
                    <img src={footerSvg} alt="footerLogin" width="100%"/>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}

export default LoginComponent;
