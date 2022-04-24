import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import { FormControl, Typography } from "@material-ui/core";
import { OutlinedInput, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core";
import ApprenantStyle from "./ApprenantStyle";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import Layout from "../layout/Layout";
import { listAllReferentiels, saveApprenant, sendCarte, ListPromos } from "./ApprenantService";
import Swal from "sweetalert2";

import logosonatel from "../../assets/images/logoSA.png";


export const AddApprenant = () => {
    var QRCode = require('qrcode.react');

    const [referentiel, setReferentiel] = React.useState([]);
    const [promos, setPromos] = React.useState([]);

    const isBlank = require('is-blank')



    const classes = ApprenantStyle();
    const useStyles = makeStyles((theme) => ({
        gridStyle: {

            marginLeft: "50px",
            [theme.breakpoints.down("sm")]: {
                marginLeft: "0px",
                marginTop: "20px"
            }
        }
    }));
    const styles = useStyles();

    const [value, setValue] = React.useState({
        prenom: '',
        nom: '',
        email: '',
        phone: '',
        adresse: '',
        typePiece: 'CNI',
        numPiece: '',
        referentiel: '',
        dateNaissance: '',
        lieuNaissance: '',
        numTuteur: '',
        avatar: new File([], ''),
        promo: '',


    });

    const [newApp, setnewApp] = React.useState({
        code: ''
    })

    React.useEffect(() => {
        listAllReferentiels().then((res) => {
            setReferentiel(res.data)
        });

        ListPromos().then((res) => {
            setPromos(res.data);
        });

    }, []);

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const [image, setImage] = React.useState("");
    const wrapperRef = useRef(null);

    const validateImage = e =>
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/gif";
    const upload = e => {
        if (e.target.files[0].size <= 2000000) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            e.target.value = "";
            alert("please upload less than 2MB")
        }
    };

    const PostApprenant = () => {
        setFormErrors(validateApprenant(value));
        let formData = new FormData();
        const data = ["prenom", "nom", "email", "phone", "adresse", "typePiece", "numPiece", "referentiel", "lieuNaissance", "promo", "numTuteur", "avatar"];
        var valide = true;
        data.forEach((app) => {
            if (value[app] !== '') {
                formData.append(app, value[app]);
            }
            if (validateApprenant(value)[app]) {
                valide = false;
            }
        })
        formData.append("dateNaissance", formatDate(value.dateNaissance));
        if (validateApprenant(value).dateNaissance) {
            valide = false;
        }
        if (valide) {
            saveApprenant(formData).then((res) => {
                if (res.status === 200) {
                    setnewApp(res.data);
                    const canvas = document.getElementById("qr-gen");

                    canvas.toBlob(function (blob) {
                        const formData = new FormData();
                        formData.append('file', blob, 'qrcode.png');
                        formData.append('prenom', value.prenom);
                        formData.append('nom', value.nom);
                        formData.append('email', value.email);

                        sendCarte(formData);
                    });
                    Swal.fire(
                        'Succes!',
                        'Enregistrer avec succes.',
                        'success'
                    ).then(() => {
                        setValue({
                            prenom: '',
                            nom: '',
                            email: '',
                            phone: '',
                            adresse: '',
                            typePiece: 'CNI',
                            numPiece: '',
                            referentiel: '',
                            dateNaissance: '',
                            lieuNaissance: '',
                            promo: '',
                            numTuteur: '',
                            avatar: new File([], ''),
                        })
                        setImage("")
                    })
                }
            }).catch(
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    const [formErrors, setFormErrors] = useState({});


    const validateApprenant = (val) => {
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
            errors.nom = "le nom doit comporter plus de 2 caractères";
        }
        if (isBlank(val.email)) {
            errors.email = "le mail est requis"
        } else if (!regexMail.test(val.email)) {
            errors.email = "le format Email n'est pas valide";
        }
        if (isBlank(val.phone)) {
            errors.phone = "le numéro de télephone est requis"
        }
        if (isBlank(val.adresse)) {
            errors.adresse = "l'adresse est requis"
        } else if (val.adresse.length < 3) {
            errors.adresse = "l'adresse doit comporter plus de 3 caractères";
        }
        if (isBlank(val.numPiece)) {
            errors.numPiece = "le numéro de carte d'identité est requis"
        }
        if (!val.dateNaissance) {
            errors.dateNaissance = "date de naissance est requis"
        }
        else {
            const dateAtNow = new Date();
            if (dateAtNow.getFullYear() - val.dateNaissance.getFullYear() <= 18) {
                errors.dateNaissance = "l'apprenant doit avoir au moins 18 ans";
            }
        }
        if (isBlank(val.lieuNaissance)) {
            errors.lieuNaissance = "lieu de naissance est requis"
        } else if (val.lieuNaissance.length < 3) {
            errors.lieuNaissance = "lieu de naissance doit comporter plus de 3 caractères";
        }
        if (isBlank(val.numTuteur)) {
            errors.numTuteur = "le numéro de Tuteur est requis"
        }
        if (val.numTuteur === val.phone) {
            errors.numTuteur = "le numéro de Tuteur ne pas coorespondre au numéro de l'apprenant est requis"
            errors.phone = "le numéro de Tuteur ne pas coorespondre au numéro de l'apprenant est requis"
        }
        if (isBlank(val.referentiel)) {
            errors.referentiel = "veuilez sélectionner un referentiel"
        }
        if (isBlank(val.promo)) {
            errors.promo = "veuilez sélectionner une promo"
        }

        return errors;
    };

    return (
        <Layout>
            <Box>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>
                            AJOUTER UN APPRENANT
                        </Typography>
                        <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float: "left", marginLeft: "15px" }} />
                    </Grid>
                    <Grid container className={classes.subContainer}>
                        <Grid xs={12} md={12} sm={12} container style={{ display: "flex", justifyContent: "center" }}>
                            <Grid xs={12} sm={12} md={4} className={styles.marginAlll} spacing={5} item>
                                <FormControl fullWidth>
                                    <label className={classes.labelText}>Prenom<span style={{ color: 'red' }}>*</span> </label>
                                    <OutlinedInput
                                        id="nom"
                                        type="text"
                                        variant="outlined"
                                        placeholder="prenom"
                                        onChange={(event) => {
                                            setFormErrors({...formErrors, prenom: null})
                                            setValue({ ...value, prenom: event.target.value })
                                        }}
                                        name="prenom"
                                        value={value.prenom}
                                        error={formErrors.prenom}
                                    />
                                </FormControl>
                                <p className={classes.formError}>{formErrors.prenom}</p>
                            </Grid>
                            <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                <FormControl fullWidth>
                                    <label className={classes.labelText}>Nom<span style={{ color: 'red' }}>*</span> </label>
                                    <OutlinedInput
                                        id="nom"
                                        type="text"
                                        variant="outlined"
                                        placeholder="nom"
                                        onChange={(event) => {
                                            setFormErrors({...formErrors, nom: null})
                                            setValue({ ...value, nom: event.target.value })
                                        }}
                                        name="nom"
                                        value={value.nom}
                                        error={formErrors.nom}
                                    />
                                </FormControl>
                                <p className={classes.formError}>{formErrors.nom}</p>
                            </Grid>
                        </Grid>


                        <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <Grid xs={12} sm={12} md={4} item>
                                <FormControl fullWidth>
                                    <label className={classes.labelText}>Date de naissance<span style={{ color: 'red' }}>*</span> </label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack>
                                            <DatePicker
                                                inputFormat="dd/MM/yyyy"
                                                name="dateNaissance"
                                                id="dateNaissance"
                                                value={value.dateNaissance}
                                                onChange={(event) => {
                                                    setFormErrors({...formErrors, dateNaissance: null})
                                                    setValue({ ...value, dateNaissance: event })
                                                }}
                                                defaultValue={null}
                                                renderInput={(params) => <TextField {...params} error={formErrors.dateNaissance} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </FormControl>
                                <p className={classes.formError}>{formErrors.dateNaissance}</p>
                            </Grid>
                            <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                <FormControl fullWidth>
                                    <label className={classes.labelText}>Lieu de naissance<span style={{ color: 'red' }}>*</span> </label>
                                    <OutlinedInput
                                        id="lieunaiss"
                                        type="text"
                                        variant="outlined"
                                        placeholder="lieu de Naissance"
                                        onChange={(event) => {
                                            setFormErrors({...formErrors, lieuNaissance: null})
                                            setValue({ ...value, lieuNaissance: event.target.value })
                                        }}
                                        name="lieuNaissance"
                                        value={value.lieuNaissance}
                                        error={formErrors.lieuNaissance}
                                    />
                                </FormControl>
                                <p className={classes.formError}>{formErrors.lieuNaissance}</p>
                            </Grid>


                            <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <Grid xs={12} sm={12} md={4} item>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Adresse<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="adresse"
                                            type="text"
                                            variant="outlined"
                                            placeholder="adresse"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, adresse: null})
                                                setValue({ ...value, adresse: event.target.value })
                                            }}
                                            name="adresse"
                                            value={value.adresse}
                                            error={formErrors.adresse}
                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.adresse}</p>
                                </Grid>
                                <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>Type de Piece<span style={{ color: 'red' }}>*</span> </label>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    placeholder="typePiece"
                                                    onChange={(event) => {
                                                        setFormErrors({ ...formErrors, typePiece: null })
                                                        setValue({ ...value, typePiece: event.target.value })
                                                    }}
                                                    name="typePiece"
                                                    value={value.typePiece}
                                                >
                                                    <MenuItem key="1" value="CNI"> CNI </MenuItem>
                                                    <MenuItem key="2" value="PassPort"> PassPort </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <p className={classes.formError}>{formErrors.typePiece}</p>
                                        </Grid>
                            </Grid>


                            <Grid xs={12} md={12} sm={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <Grid xs={12} sm={12} md={4} spacing={5} item>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Referentiel<span style={{ color: 'red' }}>*</span> </label>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder="referentiel"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, referentiel: null})
                                                setValue({ ...value, referentiel: event.target.value })
                                            }}
                                            value={value.referentiel}
                                            name="referentiel"
                                            error={formErrors.referentiel}
                                        >
                                            {
                                                referentiel.map((row) =>
                                                    <MenuItem key={row.id}
                                                        value={row.libelle}
                                                    >{row.libelle}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.referentiel}</p>
                                </Grid>
                                <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>N° Piece<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="numPiece"
                                            type="text"
                                            variant="outlined"
                                            placeholder="numPiece"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, numPiece: null})
                                                setValue({ ...value, numPiece: event.target.value })
                                            }}
                                            name="numPiece"
                                            value={value.numPiece}
                                            error={formErrors.numPiece}
                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.numPiece}</p>
                                </Grid>
                            </Grid>


                            <Grid xs={12} md={12} sm={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <Grid xs={12} sm={12} md={4} spacing={5} item>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Telephone<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="telephone"
                                            type="text"
                                            variant="outlined"
                                            placeholder="numéro télephone"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, phone: null})
                                                setValue({ ...value, phone: event.target.value })
                                            }}
                                            name="phone"
                                            value={value.phone}
                                            error={formErrors.phone}
                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.phone}</p>
                                </Grid>
                                <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Email<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="email"
                                            type="email"
                                            variant="outlined"
                                            placeholder="email"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, email: null})
                                                setValue({ ...value, email: event.target.value })
                                            }}
                                            name="email"
                                            value={value.email}
                                            error={formErrors.email}
                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.email}</p>
                                </Grid>
                            </Grid>


                            <Grid xs={12} md={12} sm={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <Grid xs={12} sm={12} md={4} spacing={5} item>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Promo<span style={{ color: 'red' }}>*</span> </label>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder="promo"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, promo: null})
                                                setValue({ ...value, promo: event.target.value })
                                            }}
                                            name="promo"
                                            error={formErrors.promo}
                                            value={value.promo}
                                        >
                                            {
                                                promos.map((row) =>
                                                    <MenuItem key={row.id}
                                                        value={row.libelle}
                                                    >{row.libelle}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.promo}</p>
                                </Grid>
                                <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Telephone tuteur<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="teltuteur"
                                            type="text"
                                            variant="outlined"
                                            placeholder="numéro de tuteur"
                                            onChange={(event) => {
                                                setFormErrors({...formErrors, numTuteur: null})
                                                setValue({ ...value, numTuteur: event.target.value })
                                            }}
                                            name="numTuteur"
                                            value={value.numTuteur}
                                            error={formErrors.numTuteur}
                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.numTuteur}</p>
                                </Grid>
                            </Grid>


                            <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <Grid xs={12} sm={12} md={4} item style={{ justifyContent: "center", marginTop: "25px", marginLeft: "15px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{ backgroundColor: "#FFC145", fontFamily: "Arial", fontSize: "20px" }}
                                    >
                                        Importer image
                                        <input
                                            id="file"
                                            type="file"
                                            onChange={e => {
                                                setValue({ ...value, avatar: e.target.files[0] })
                                                let files = e.target.files;
                                                if (files.length === 1 && validateImage(e)) {
                                                    upload(e);
                                                } else {
                                                    e.target.value = "";
                                                    alert("please add image only");
                                                }
                                            }}
                                            ref={wrapperRef}
                                            accept="image/gif, image/jpeg, image/png, image/jpg"
                                            hidden
                                        />
                                        <CameraAltIcon />
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={12} md={4} item className={styles.gridStyle} style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                                    <Avatar
                                        alt=""
                                        src={image}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Grid>
                            </Grid>

                            <Button variant="contained" sx={{
                                backgroundColor: "#05888A",
                                fontFamily: "Arial", fontSize: "20px",
                                marginTop: "10px",
                                '&:hover': {
                                    backgroundColor: "#F48322",
                                    pointer: "cursor"
                                }
                            }}
                                onClick={() => PostApprenant()}
                            >Enregistrer et Imprimer carte</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <div>
                    <QRCode
                        hidden
                        id="qr-gen"
                        value={newApp.code}
                        size={400}
                        level={"H"}
                        includeMargin={true}
                        bgColor={"#ffffff"}
                        fgColor={"#138A8A"}
                        imageSettings={{
                            src: `${logosonatel}`,
                            x: null,
                            y: null,
                            height: 30,
                            width: 30,
                            excavate: false,
                        }}
                    />
                </div>
            </Box>
        </Layout >
    )

}

export default AddApprenant;
