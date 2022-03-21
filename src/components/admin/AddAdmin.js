import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import AdminStyle from "./AdminStyle";
import { FormControl, Typography } from "@material-ui/core";
import { Button, OutlinedInput } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core";
import Layout from "../layout/Layout";
import { ListAllStructure } from "../structure/StructureService";
import { SaveAdmin } from "./AdminService";
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';


function AddAdmin() {

    const [structure, setStructure] = React.useState([]);

    const text = "ABCDEFGHIJKLM0123456789";
    var myPassword = "";
    for (var i = 0; i < 8; i++) {
        var word = Math.round(Math.random() * text.length);
        myPassword += text.substring(word, word + 1);
    }

    const [admin, setAdmin] = React.useState({
        prenom: '',
        nom: '',
        phone: '',
        email: '',
        addresse: '',
        password: myPassword,
        cni: '',
        structure: { id: 0 },
    });

    const [formErrors, setFormErrors] = useState({});
    const [setErrorPage] = useState(false);

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

    React.useEffect(() => {
        ListAllStructure().then(val => {
            setStructure(val.data)
        });
    }, []
    );

    const handleSubmit = (event) => {
        setFormErrors(validateAdmin(admin));
        event.preventDefault();

        SaveAdmin(admin).then(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Admin enrégistré avec succes',
                showConfirmButton: true,
                timer: 1500
            }).catch(
                (error) => {
                    setErrorPage(true);
                    console.log(error);
                }
            )
            sendEmail(event);
        })

        setAdmin({
            prenom: ' ',
            nom: '',
            phone: '',
            email: '',
            addresse: '',
            password: myPassword,
            cni: '',
            structure: { id: 0 },
        })

    };

    const form = useRef();

    const sendEmail = (e) => {

        emailjs.sendForm('service_tuwme63', 'email_dv26pv8', form.current, 'aF00JTLiRllzze4TO')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

    };

    const validateAdmin = (val) => {
        let regexMail = new RegExp("^[a-z0-9.-]+@[a-z0-9.-]{2,}\\.[a-z]{2,4}$");
        let regexCni = new RegExp("(^[1-2])[0-9]{12}$");
        let regexPhone = new RegExp("^(33|7[05-8])[0-9]{7}$");
        const errors = {};
        if (val.prenom === '') {
            errors.prenom = "prenom est requis"
        } else if (val.prenom.length < 3) {
            errors.prenom = "le prenom doit comporter plus de 3 caractères";
        }
        else if (val.nom.length > 20) {
            errors.nom = "le nom ne peut pas dépassé plus de 20 caractères";
        }
        if (val.nom === '') {
            errors.nom = "nom est requis"
        } else if (val.nom.length < 2) {
            errors.nom = "le nom doit comporter plus de 2 caractères";
        }
        else if (val.nom.length > 10) {
            errors.nom = "le nom ne peut pas dépassé plus de 10 caractères";
        }
        if (val.email === '') {
            errors.email = "le mail est requis"
        } else if (!regexMail.test(val.email)) {
            errors.email = "le format Email n'est pas valide";
        }
        if (val.phone === '') {
            errors.phone = "le numéro de télephone est requis"
        } else if (!regexPhone.test(val.phone)) {
            errors.phone = "le format numéro télephone n'est pas valide";
        }
        if (val.addresse === '') {
            errors.addresse = "l'adresse est requis"
        } else if (val.addresse.length < 3) {
            errors.addresse = "l'adresse doit comporter plus de 3 caractères";
        } else if (val.addresse.length > 15) {
            errors.addresse = "l'adresse ne peut pas dépassé plus de 15 caractères";
        }
        if (val.cni === '') {
            errors.cni = "le numéro de carte d'identité est requis"
        } else if (!regexCni.test(val.cni)) {
            errors.cni = "le format numéro de carte d'identité n'est pas valide";
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
                                            <label htmlFor="prenom" className={classes.labelText}>Prenom <span style={{ color: 'red' }}>*</span> </label>
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
                                                <label className={classes.labelText}>addresse <span style={{ color: 'red' }}>*</span> </label>
                                                <OutlinedInput
                                                    id="input"
                                                    name="addresse"
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
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>N° CNI <span style={{ color: 'red' }}>*</span> </label>
                                                <OutlinedInput
                                                    id="input"
                                                    name="cni"
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ex: cni"
                                                    onChange={(event) => {
                                                        setAdmin({ ...admin, cni: event.target.value })
                                                    }}
                                                    value={admin.cni}
                                                />
                                            </FormControl>
                                            <p className={classes.formError}>{formErrors.cni}</p>
                                        </Grid>
                                    </Grid>


                                    <Grid xs={12} sm={12} md={12} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                        <Grid xs={12} sm={12} md={4} item>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>Structure <span style={{ color: 'red' }}>*</span> </label>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="input"
                                                    name="structure"
                                                    label="Structure"
                                                    sx={{
                                                        borderRadius: "5px",
                                                        '&:hover':
                                                        {
                                                            border: "2px solid #05888A",
                                                        },
                                                        '&:focus':
                                                        {
                                                            outline: "#05888A",
                                                        }
                                                    }}
                                                    onChange={(event) => {
                                                        setAdmin({ ...admin, structure: event.target.value })
                                                    }}
                                                    value={admin.structure}
                                                >
                                                    <MenuItem selected>Select</MenuItem>
                                                    {structure.map(item => (
                                                        <MenuItem value={item}>{item.nomStructure}</MenuItem>
                                                    ))}


                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                        </Grid>
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
            </Layout>
        </React.Fragment>
    )

}

export default AddAdmin;
