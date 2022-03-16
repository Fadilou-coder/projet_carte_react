import React, {useRef} from "react";
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import { FormControl, Typography } from "@material-ui/core";
import { OutlinedInput, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {makeStyles} from "@material-ui/core";
import ApprenantStyle from "./ApprenantStyle";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import imgAvatar from '../../assets/images/avatar.jpg';
import Layout from "../layout/Layout";
import {listAllReferentiels, saveApprenant} from "./ApprenantService";
import Swal from "sweetalert2";
import {DesktopDatePicker} from "@mui/lab";

function AddApprenant() {

    const [referentiel, setReferentiel] = React.useState([]);

      /*const handleChange = (event) => {
    setStructure(event.target.value);
    };*/

    const classes = ApprenantStyle();
    const useStyles = makeStyles((theme) => ({
    gridStyle:{

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
        cni: '',
        referentiel: '',
        dateNaissance: '',
        lieuNaissance: '',
        numTuteur:'',
        avatar : ''

    });

    React.useState(() => {
        listAllReferentiels().then((res)=>{
            setReferentiel(res.data)
        })
    })

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
    e.target.files[0].type ==="image/png" ||
    e.target.files[0].type ==="image/jpg" ||
    e.target.files[0].type ==="image/jpeg" ||
    e.target.files[0].type ==="image/gif" ;
    const upload = e => {
        if(e.target.files[0].size <= 2000000){
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e){
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }else {
            e.target.value = "";
            alert("please upload less than 2MB")
        }
    };

    const PostApprenant = () => {
        let formData = new FormData();
        const data = ["prenom", "nom", "email", "phone", "adresse", "cni","referentiel", "lieuNaissance", "numTuteur", "avatar" ];
        console.log(value);
        data.forEach((app) => {
            if(value[app] !== '') {
                formData.append(app, value[app]);
            }
            })
            formData.append("dateNaissance",formatDate(value.dateNaissance));
            saveApprenant(formData).then((res) => {
                if(res.status === 200) {
                    Swal.fire(
                        'Succes!',
                        'Enregistrer avec succes.',
                        'success'
                    )
                }
            }).catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    return(
        <React.Fragment>
            <Layout>
             <Box>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography  variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>
                                        AJOUTER UN APPRENANT
                        </Typography>
                        <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float:"left", marginLeft:"15px" }} />
                        </Grid>
                            <Grid  container className={classes.subContainer}>
                                <Grid xs={12} md={12} sm={12} container style={{ display:"flex", justifyContent:"center"}}>
                                    <Grid xs={12} sm={12} md={4}  className={styles.marginAlll} spacing={5} item>
                                        <FormControl fullWidth>
                                        <label className={classes.labelText}>Prenom</label>
                                            <OutlinedInput
                                            id="prenom"
                                            type="text"
                                            variant="outlined"
                                            placeholder="Ex:Omar"
                                            onChange={(event)=>{
                                                setValue({...value,prenom: event.target.value})
                                            }}
                                            name="prenom"
                                            value={value.prenom}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={4} item  className={styles.gridStyle}>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Nom</label>
                                            <OutlinedInput
                                            id="nom"
                                            type="text"
                                            variant="outlined"
                                            placeholder="Ex: Ndiaye"
                                            onChange={(event)=>{
                                                setValue({...value,nom: event.target.value})
                                            }}
                                            name="nom"
                                            value={value.nom}
                                            />
                                        </FormControl>
                                        </Grid>
                                </Grid>


                                <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Date de naissance</label>
                                           {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack>
                                                    <DatePicker
                                                        disableFuture
                                                        openTo="year"
                                                        views={['day', 'month', 'year']}
                                                        value={value.dateNaissance}
                                                        onChange={(event)=>{
                                                            setValue({...value,dateNaissance: event})
                                                        }}
                                                        defaultValue={null}
                                                        renderInput={(params) => <TextField className={classes.inputDate} value={value.dateNaissance} {...params}/>}
                                                        />
                                                </Stack>
                                            </LocalizationProvider>*/}
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack>
                                                    <DatePicker
                                                        inputFormat="MM/dd/yyyy"
                                                        name="dateNaissance"
                                                        id="dateNaissance"
                                                        value={value.dateNaissance}
                                                        onChange={(event)=>{
                                                            setValue({...value,dateNaissance: event})
                                                        }}
                                                        defaultValue={null}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                        </FormControl>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>Lieu de naissance</label>
                                                <OutlinedInput
                                                id="lieunaiss"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: Parcelles assainies u3"
                                                onChange={(event)=>{
                                                    setValue({...value,lieuNaissance: event.target.value})
                                                }}
                                                name="lieuNaissance"
                                                value={value.lieuNaissance}
                                                />
                                            </FormControl>
                                        </Grid>


                                    <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                        <Grid xs={12} sm={12} md={4}  item>
                                            <FormControl fullWidth>
                                            <label className={classes.labelText}>Adresse</label>
                                                <OutlinedInput
                                                id="adresse"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: Pikine rue 10"
                                                onChange={(event)=>{
                                                    setValue({...value,adresse: event.target.value})
                                                }}
                                                name="adresse"
                                                value={value.adresse}
                                                />
                                            </FormControl>
                                            </Grid>
                                            <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                                <FormControl fullWidth>
                                                    <label className={classes.labelText}>N° CNI</label>
                                                    <OutlinedInput
                                                    id="cni"
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ex: 2020202120221"
                                                    onChange={(event)=>{
                                                        setValue({...value,cni: event.target.value})
                                                    }}
                                                    name="cni"
                                                    value={value.cni}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>


                                        <Grid xs={12} md={12} sm={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                            <Grid xs={12} sm={12} md={4}  spacing={5} item>
                                                <FormControl fullWidth>
                                                    <label className={classes.labelText}>Referentiel</label>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Referentiel"
                                                                onChange={(event)=>{
                                                                    setValue({...value, referentiel: event.target.value})
                                                                }}
                                                                name="referentiel"
                                                            >
                                                                {
                                                                    referentiel.map((row) =>
                                                                <MenuItem  key={row.id}
                                                                           value={row.libelle}
                                                                >{row.libelle}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={12} sm={12} md={4} item  className={styles.gridStyle}>
                                                <FormControl fullWidth>
                                                    <label className={classes.labelText}>Email</label>
                                                    <OutlinedInput
                                                    id="email"
                                                    type="email"
                                                    variant="outlined"
                                                    placeholder="Ex: exemple@gmail.com"
                                                    onChange={(event)=>{
                                                        setValue({...value,email: event.target.value})
                                                    }}
                                                    name="email"
                                                    value={value.email}
                                                    />
                                                </FormControl>
                                                </Grid>
                                        </Grid>


                                        <Grid xs={12} md={12} sm={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                            <Grid xs={12} sm={12} md={4}  spacing={5} item>
                                                <FormControl fullWidth>
                                                    <label className={classes.labelText}>Telephone</label>
                                                    <OutlinedInput
                                                    id="telephone"
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ex: 77 777 77 77"
                                                    onChange={(event)=>{
                                                        setValue({...value,phone: event.target.value})
                                                    }}
                                                    name="phone"
                                                    value={value.phone}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={12} sm={12} md={4} item  className={styles.gridStyle}>
                                                <FormControl fullWidth>
                                                <label className={classes.labelText}>Telephone tuteur</label>
                                                    <OutlinedInput
                                                    id="teltuteur"
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ex: 78 787 78 78"
                                                    onChange={(event)=>{
                                                        setValue({...value,numTuteur: event.target.value})
                                                    }}
                                                    name="numTuteur"
                                                    value={value.numTuteur}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>


                                        <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                            <Grid xs={12} sm={12} md={4}  item style={{  justifyContent:"center", marginTop: "25px", marginLeft:"15px"}}>
                                                <Button
                                                        variant="contained"
                                                        component="label"
                                                        style={{backgroundColor: "#FFC145", fontFamily: "Arial", fontSize: "20px"}}
                                                        >
                                                        Importer image
                                                        <input
                                                            id="file"
                                                            type="file"
                                                            onChange={e => {
                                                                setValue({...value,avatar: e.target.files[0]})
                                                                let files = e.target.files;
                                                                if(files.length ===1 && validateImage(e)){
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
                                                            <CameraAltIcon/>
                                                    </Button>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={4} item className={styles.gridStyle} style={{ display:"flex", justifyContent:"center",  marginTop: "15px"}}>
                                                    <Avatar
                                                        alt=""
                                                        src={image || imgAvatar}
                                                        sx={{ width: 100, height: 100 }}
                                                        />
                                                </Grid>
                                            </Grid>

                                    <Button variant="contained" sx={{backgroundColor: "#05888A",
                                                    fontFamily: "Arial", fontSize: "20px",
                                                    marginTop: "10px",
                                                        '&:hover':{
                                                            backgroundColor:"#F48322",
                                                            pointer:"cursor"
                                                        }
                                                    }}
                                            onClick={ ()=> PostApprenant()}
                                            >Enregistrer et Imprimer carte</Button>
                                </Grid>
                            </Grid>
                </Grid>
            </Box>
            </Layout>
        </React.Fragment>
    )

}

export default AddApprenant;
