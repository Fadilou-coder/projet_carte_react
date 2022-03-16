import React from "react";
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import AdminStyle from "./AdminStyle";
import { FormControl, Typography } from "@material-ui/core";
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {makeStyles} from "@material-ui/core";
import Layout from "../layout/Layout";
import {Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ListStructure } from "../structure/StructureService";


function AddAdmin() {
    
    const [structure, setStructure] = React.useState([]);

    const [admin, setAdmin] = React.useState({
        prenom: '',
        nom: '',
        telephone: '',
        email: '',
        adresse: '',
        cni: '',
        structure: '',
    });


    var regexNum = /^\d*[1-9]\d*$/;

    const validationSchema = Yup.object().shape({
        prenom: Yup.string()
            .min(3, "trop petit")
            .max(50, "trop long!")
            .required("Ce champ est obligatoire"),
        nom: Yup.string()
            .min(2, "trop petit")
            .max(50, "trop long!")
            .required("Ce champ est obligatoire"),
        telephone: Yup.string()
            .matches(regexNum, "Le numéro telephone est incorrect")
            .min(9, "trop petit!")
            .max(9, "trop long!")
            .required("Ce champ est obligatoire"),
        email: Yup.string()
            .email("email invalide")
            .required("Ce champ est obligatoire"),
       adresse: Yup.string()
            .required("Ce champ est obligatoire"),
        cni: Yup.string()
            .matches(regexNum, "Le numéro cni est incorrect")
            .min(13, "trop long!")
            .max(13, "trop long!")
            .required("Ce champ est obligatoire"),
        structure: Yup.string()
            .required("Ce champ est obligatoire"),
    });

    const initialValues = {
        prenom: '',
        nom: '',
        telephone: '',
        email: '',
        adresse: '',
        cni: '',
        structure: '',
    };

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

    React.useEffect(()=>{
        ListStructure().then(val => {
            setStructure(val.data)
   });
}, []
);


    const handleSubmit = (values) => {
        
        console.log(values)
    };

    

    return(
        <React.Fragment>
            <Layout>
             <Box>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography  variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>
                                        AJOUTER UN ADMIN              
                        </Typography>
                        <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float:"left", marginLeft:"15px" }} />
                        
                        </Grid>
                        <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values) => handleSubmit(values)}
                                >
                            
    {({ resetForm }) => (
                        <Form>
                            <Grid  container className={classes.subContainer}>
                                <p>Complétez le formulaire. Les champs marqué par <span style={{ color: 'red' }}>*</span>  sont <span style={{ color: 'red' }}> obligatoires </span></p>
                                <Grid xs={12} md={12} sm={12} container style={{ display:"flex", justifyContent:"center"}}>
                                    <Grid xs={12} sm={12} md={4}  spacing={5} item>
                                        <FormControl fullWidth>
                                        <label htmlFor="prenom" className={classes.labelText}>Prenom <span style={{ color: 'red' }}>*</span> </label>
                                            <Field className={classes.input} 
                                            id="prenom"
                                            name="prenom"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex:Omar" 
                                            />
                                        </FormControl>
                                        <ErrorMessage 
                                        name="prenom"
                                        component="small"
                                        style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={4} item  className={styles.gridStyle}>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Nom <span style={{ color: 'red' }}>*</span> </label>
                                            <Field className={classes.input}
                                            id="nom"
                                            name="nom"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex: Ndiaye" 
                                            />
                                        </FormControl>
                                        <ErrorMessage 
                                        name="nom"
                                        component="small"
                                        style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                        />
                                        </Grid>
                                    </Grid>


                                <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                        <label className={classes.labelText}>Telephone <span style={{ color: 'red' }}>*</span> </label>
                                            <Field className={classes.input} 
                                            id="telephone"
                                            name="telephone"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex: 77 777 77 77" 
                                            />
                                        </FormControl>
                                        <ErrorMessage 
                                            name="telephone"
                                            component="small"
                                            style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                        />
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>Email <span style={{ color: 'red' }}>*</span> </label>
                                                <Field className={classes.input} 
                                                id="email"
                                                name="email"
                                                type="email"
                                                variant="outlined" 
                                                placeholder="Ex: exemple@gmail.com" 
                                                />
                                            </FormControl>
                                            <ErrorMessage 
                                            name="email"
                                            component="small"
                                            style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                            />
                                        </Grid>


                                    <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                        <Grid xs={12} sm={12} md={4}  item>
                                            <FormControl fullWidth>
                                            <label className={classes.labelText}>Adresse <span style={{ color: 'red' }}>*</span> </label>
                                                <Field className={classes.input} 
                                                id="adresse"
                                                name="adresse"
                                                type="text"
                                                variant="outlined" 
                                                placeholder="Ex: Pikine rue 10" 
                                                />
                                            </FormControl>
                                            <ErrorMessage 
                                                name="adresse"
                                                component="small"
                                                style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                                />
                                            </Grid>
                                            <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                                <FormControl fullWidth>
                                                    <label className={classes.labelText}>N° CNI <span style={{ color: 'red' }}>*</span> </label>
                                                    <Field className={classes.input} 
                                                    id="cni"
                                                    name="cni"
                                                    type="text"
                                                    variant="outlined" 
                                                    placeholder="Ex: 2020202120221" 
                                                    />
                                                </FormControl>
                                                <ErrorMessage 
                                                name="cni"
                                                component="small"
                                                style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                                />
                                            </Grid>
                                        </Grid>


                                        <Grid xs={12} sm={12} md={12}  style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Structure <span style={{ color: 'red' }}>*</span> </label>
                                            

                                            <Select 
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="structure"
                                                value={structure}
                                                label="Structure"
                                                onChange={handleChange}
                                                sx= {{
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
                                            >
                                                {structure.map(item => (  
                                                    <MenuItem value={item.id}>{item.nomStructure}</MenuItem>    
                                                ))}  
                                               

                                            </Select>
                                        </FormControl>
                                        <ErrorMessage 
                                        name="structure"
                                        component="small"
                                        style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                        />
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4}  item className={styles.gridStyle}>
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" variant="contained" 
                                            sx={{
                                                backgroundColor: "#05888A", 
                                                fontFamily: "Arial", fontSize: "20px", 
                                                marginTop: "10px", 
                                                    '&:hover':{
                                                        backgroundColor:"#F48322", 
                                                        pointer:"cursor"
                                                    }
                                                }}
                                            >AJOUTER</Button>
                                </Grid>
                            </Grid> 
                            </Form> 
                    )}
                    </Formik>                         
                </Grid>
            </Box>
            </Layout>
        </React.Fragment>
    )

}

export default AddAdmin;
