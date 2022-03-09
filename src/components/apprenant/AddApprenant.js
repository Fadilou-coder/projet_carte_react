import React from "react";
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



function AddApprenant() {
    
    const [referentiel, setStructure] = React.useState('');
    
      const handleChange = (event) => {
    setStructure(event.target.value);
    };

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

    const [value, setValue] = React.useState(null);

    const [image, setImage] = React.useState("");

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


    return(
        <React.Fragment>
             <Box>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography  variant="h4" className={classes.textTypo}>
                                        Ajouter un apprenant               
                        </Typography>
                        <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float:"left" }} />
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
                                            />
                                        </FormControl>
                                        </Grid>
                                </Grid>


                                <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Date de naissance</label>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack>
                                                    <DatePicker
                                                        disableFuture
                                                        openTo="year"
                                                        views={['day', 'month', 'year']}
                                                        value={value}
                                                        onChange={(newValue) => {
                                                            setValue(newValue);
                                                        }}
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
                                                        value={referentiel}
                                                        label="Referentiel"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="DEV WEB">Développeur Web </MenuItem>
                                                        <MenuItem value="DATA">Data Artisan</MenuItem>
                                                        <MenuItem value="REF DIG">Referent Digital</MenuItem>
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
                                                                setImage({...image,avatar: e.target.files[0]})
                                                                let files = e.target.files;
                                                                if(files.length ===1 && validateImage(e)){
                                                                    upload(e);
                                                                } else {
                                                                    e.target.value = "";
                                                                    alert("please add image only");
                                                                }
                                                            }}
                                                            // ref={wrapperRef}
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

                                    <Button variant="contained" style={{backgroundColor: "#05888A", fontFamily: "Arial", fontSize: "20px", marginTop: "10px"}}>Enregistrer et Imprimer carte</Button>
                                </Grid>
                            </Grid>                            
                </Grid>
            </Box>
        </React.Fragment>
    )

}

export default AddApprenant;
