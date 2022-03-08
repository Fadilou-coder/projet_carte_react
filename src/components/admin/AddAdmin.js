import React from "react";
import { Grid } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AdminStyle from "./AdminStyle";
import { FormControl, Typography } from "@material-ui/core";
import { OutlinedInput, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {makeStyles} from "@material-ui/core";


function AddAdmin() {
    
    const [structure, setStructure] = React.useState('');
   
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
      }));
    
      const handleChange = (event) => {
    setStructure(event.target.value);
    };

    const classes = AdminStyle();
    const useStyles = makeStyles((theme) => ({
    gridStyle:{
        
        marginLeft: "50px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0px"
        }
    }
    }));
    const styles = useStyles();
   

    return(
        <React.Fragment>
             <Box>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography  variant="h4" className={classes.textTypo}>
                                        Ajouter un admin               
                        </Typography>
                        <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float:"left" }} />
                        </Grid>
                            <Grid  container className={classes.subContainer}>
                                <Grid xs={12} md={12} sm={12} container style={{ display:"flex", justifyContent:"center"}}>
                                    <Grid xs={12} sm={12} md={4}  spacing={5} item>
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
                                        <label className={classes.labelText}>Telephone</label>
                                            <OutlinedInput 
                                            id="telephone"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex: 77 777 77 77" 
                                            />
                                        </FormControl>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
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


                                        <Grid xs={12} sm={12} md={12}  style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Structure</label>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={structure}
                                                label="Structure"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="SEN SECURIT">SEN SECURITE</MenuItem>
                                                <MenuItem value="ASP">ASP</MenuItem>
                                                <MenuItem value="SECURITY">SECURITY</MenuItem>
                                            </Select>
                                        </FormControl>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4}  item className={styles.gridStyle}>
                                        </Grid>
                                    </Grid>
                                    <Button variant="contained" style={{backgroundColor: "#05888A", fontFamily: "Arial", fontSize: "20px", marginTop: "10px"}}>AJOUTER</Button>
                                </Grid>
                            </Grid>                            
                </Grid>
            </Box>
        </React.Fragment>
    )

}

export default AddAdmin;
