import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import AdminStyle from "./AdminStyle";
import { FormControl, Typography } from "@material-ui/core";
import { Button, OutlinedInput } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Layout from "../layout/Layout";
import { SaveAdmin } from "./AdminService";
import Swal from 'sweetalert2'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function AddAdmin() {

    const text = "ABCDEFGHIJKLM0123456789";
    var myPassword = "";
    for (var i = 0; i < 8; i++) {
        var word = Math.round(Math.random() * text.length);
        myPassword += text.substring(word, word + 1);
    }

    const isBlank = require('is-blank')

    const [admin, setAdmin] = React.useState({
        prenom: '',
        nom: '',
        phone: '',
        email: '',
        addresse: '',
        password: myPassword,
        numPiece: '',
        typePiece: 'CNI',
    });

    const [formErrors, setFormErrors] = useState({});

    const classes = AdminStyle();
    const useStyles = makeStyles((theme) => ({
        gridStyle: {

            marginLeft: "50px",
            [theme.breakpoints.down("sm")]: {
                marginLeft: "0px"
            }
        }
    }));

    const styles = useStyles();

    const handleSubmit = (event) => {
        setFormErrors(validateAdmin(admin));
        event.preventDefault();
        if(Object.keys(validateAdmin(admin)).length === 0)
            SaveAdmin(admin).then((res) => {
                if (res.status === 200) {
                    Swal.fire(
                        'Succes!',
                        'Admin Enregistrer avec succes.',
                        'success'
                    ).then(() => {
                        setAdmin({
                            prenom: ' ',
                            nom: '',
                            phone: '',
                            email: '',
                            addresse: '',
                            password: myPassword,
                            numPiece: '',
                            typePiece: 'CNI',
                        })
                    })
                }
                
            }).catch(
                (error) => {
                    console.log(error.response.data.errors);
                    const err = {}
                    for (let index = 0; index < error.response.data.errors.length; index++) {
                      if(error.response.data.errors[index].includes('email'))
                        err.email = error.response.data.errors[index]
                      if(error.response.data.errors[index].includes('téléphone'))
                        err.phone = error.response.data.errors[index]
                        
                    }
                    setFormErrors(err);
                }
            )
    };

    const form = useRef();

    const validateAdmin = (val) => {
        let regexMail = new RegExp("^[a-z0-9.-]+@[a-z0-9.-]{2,}\\.[a-z]{2,4}$");
        const errors = {};
        if (isBlank(val.prenom)) {
            errors.prenom = "prenom est requis"
        } else if (val.prenom.length < 3) {
            errors.prenom = "le prenom doit comporter plus de 3 caractères";
        }
        if (isBlank(val.nom)) {
            errors.nom = "nom est requis"
        } else if (val.nom.length < 2) {
            errors.nom = "le nom doit comporter au moins 2 caractères";
        }
        if (isBlank(val.email)) {
            errors.email = "le mail est requis"
        } else if (!regexMail.test(val.email)) {
            errors.email = "le format Email n'est pas valide";
        }
        if (isBlank(val.phone)) {
            errors.phone = "le numéro de télephone est requis"
        }
        if (isBlank(val.addresse)) {
            errors.addresse = "l'adresse est requis"
        }
        if (isBlank(val.numPiece)) {
            errors.numPiece = "le numéro de piece est requis"
        }
        return errors;
    };

    return (
        <React.Fragment>
            <Layout>
                <Box>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>
                                AJOUTER UN ADMIN
                            </Typography>
                            <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float: "left", marginLeft: "15px" }} />

                        </Grid>
                        <form ref={form}>
                            <Grid container className={classes.subContainer}>
                                <p>Complétez le formulaire. Les champs marqué par <span style={{ color: 'red' }}>*</span>  sont <span style={{ color: 'red' }}> obligatoires </span></p>
                                <Grid xs={12} md={12} sm={12} container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid xs={12} sm={12} md={4} spacing={5} item>
                                        <FormControl fullWidth>
                                            <label htmlFor="prenom" className={classes.labelText}>Prénom <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="ok"
                                                name="prenom"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: prenom"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, prenom: event.target.value })
                                                }}
                                                value={admin.prenom}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.prenom}</p>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Nom <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="input"
                                                name="nom"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: nom"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, nom: event.target.value })
                                                }}
                                                value={admin.nom}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.nom}</p>
                                    </Grid>
                                </Grid>


                                <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                    <Grid xs={12} sm={12} md={4} item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>phone <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="input"
                                                name="phone"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: phone"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, phone: event.target.value })
                                                }}
                                                value={admin.phone}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.phone}</p>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Email <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="input"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                placeholder="Ex:email"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, email: event.target.value })
                                                }}
                                                value={admin.email}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.email}</p>
                                    </Grid>


                                    <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                        <Grid xs={12} sm={12} md={4} item>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>Type de Pièce<span style={{ color: 'red' }}>*</span> </label>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    placeholder="typePiece"
                                                    onChange={(event) => {
                                                        setFormErrors({ ...formErrors, promo: null })
                                                        setAdmin({ ...admin, typePiece: event.target.value })
                                                    }}
                                                    name="typePiece"
                                                    value={admin.typePiece}
                                                >
                                                    <MenuItem key="1" value="CNI"> CNI </MenuItem>
                                                    <MenuItem key="2" value="PassPort"> PassPort </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <p className={classes.formError}>{formErrors.typePiece}</p>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>N° Pièce <span style={{ color: 'red' }}>*</span> </label>
                                                <OutlinedInput
                                                    id="input"
                                                    name="numPiece"
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ex: numPiece"
                                                    onChange={(event) => {
                                                        setAdmin({ ...admin, numPiece: event.target.value })
                                                    }}
                                                    value={admin.numPiece}
                                                />
                                            </FormControl>
                                            <p className={classes.formError}>{formErrors.numPiece}</p>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                        <Grid xs={12} sm={12} md={4} item>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}> Adresse <span style={{ color: 'red' }}>*</span> </label>
                                                <OutlinedInput
                                                    id="input"
                                                    name="adresse"
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ex: addresse"
                                                    onChange={(event) => {
                                                        setAdmin({ ...admin, addresse: event.target.value })
                                                    }}
                                                    value={admin.addresse}
                                                />
                                            </FormControl>
                                            <p className={classes.formError}>{formErrors.addresse}</p>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}> </Grid>
                                    </Grid>
                                    <Button type="submit" variant="contained"
                                        id="button"
                                        sx={{
                                            backgroundColor: "#05888A",
                                            fontFamily: "Arial", fontSize: "20px",
                                            marginTop: "10px",
                                            '&:hover': {
                                                backgroundColor: "#F48322",
                                                pointer: "cursor"
                                            }
                                        }}
                                        onClick={handleSubmit}
                                    >AJOUTER</Button>
                                </Grid>

                            </Grid>

                        </form>
                    </Grid>
                </Box>
            </Layout >
        </React.Fragment >
    )

}

export default AddAdmin;
