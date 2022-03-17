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
import {Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ListAllStructure } from "../structure/StructureService";
import { SaveAdmin } from "./AdminService";


function AddAdmin() {
    
    const [structure, setStructure] = React.useState([]);
    const [struct, setStruct] = React.useState([]);
    
    const text = "ABCDEFGHIJKLM0123456789";
    var myPassword = "";
    for(var i=0;i<8;i++){
        var word = Math.round(Math.random()*text.length);
        myPassword +=text.substring(word,word+1);
    }

    const [admin, setAdmin] = React.useState({
        prenom: '',
        nom: '',
        phone: '',
        email: '',
        addresse: '',
        password: myPassword,
        cni: '',
        structure: {id: 0},
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
        phone: Yup.string()
            .matches(regexNum, "Le numéro phone est incorrect")
            .min(9, "trop petit!")
            .max(9, "trop long!")
            .required("Ce champ est obligatoire"),
        password: Yup.string()
            .required("Ce champ est obligatoire"),
        email: Yup.string()
            .email("email invalide")
            .required("Ce champ est obligatoire"),
       addresse: Yup.string()
            .required("Ce champ est obligatoire"),
        cni: Yup.string()
            .matches(regexNum, "Le numéro cni est incorrect")
            .min(13, "trop long!")
            .max(13, "trop long!")
            .required("Ce champ est obligatoire"),
        structure: Yup.string()
            .required("Ce champ est obligatoire"),
    });



    function chargerStructure (value){
        setStruct(value);
        if (value === "") {
            ListAllStructure().then(res => {
                setStruct(res.data);
            })
        }
    }

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
        ListAllStructure().then(val => {
            setStructure(val.data)
   });
}, []
);

    
    const handleSubmit = (event) => {
         console.table(admin);
        event.preventDefault();

        SaveAdmin(admin).then(res => {
            console.log(res);
            console.log(res.data);
        })
                
            setAdmin({
                prenom: ' ',
                nom: '',
                phone: '',
                email: '',
                addresse: '',
                password: myPassword,
                cni: '',
                structure: {id: 0},
            })
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
                            initialValues={admin}
                            validationSchema={validationSchema}
                            // onSubmit={(event) =>handleSubmit(event)}
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
                                            id="ok"
                                            name="prenom"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex:Omar" 
                                            onChange={(event)=>{
                                                setAdmin({...admin,prenom: event.target.value})
                                            }}
                                            value={admin.prenom}
                                            />
                                        </FormControl>
                                            <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                Ce champ est obligatoire
                                            </p>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={4} item  className={styles.gridStyle}>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Nom <span style={{ color: 'red' }}>*</span> </label>
                                            <Field className={classes.input}
                                            id="input"
                                            name="nom"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex: Ndiaye" 
                                            onChange={(event)=>{
                                                setAdmin({...admin,nom: event.target.value})
                                            }}
                                            value={admin.nom}
                                            />
                                        </FormControl>
                                        <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                Ce champ est obligatoire
                                        </p>
                                        </Grid>
                                    </Grid>


                                <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                        <label className={classes.labelText}>phone <span style={{ color: 'red' }}>*</span> </label>
                                            <Field className={classes.input} 
                                            id="input"
                                            name="phone"
                                            type="text"
                                            variant="outlined" 
                                            placeholder="Ex: 77 777 77 77" 
                                            onChange={(event)=>{
                                                setAdmin({...admin,phone: event.target.value})
                                            }}
                                            value={admin.phone}
                                            />
                                        </FormControl>
                                        <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                Ce champ est obligatoire
                                            </p>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                            <FormControl fullWidth>
                                                <label className={classes.labelText}>Email <span style={{ color: 'red' }}>*</span> </label>
                                                <Field className={classes.input} 
                                                id="input"
                                                name="email"
                                                type="email"
                                                variant="outlined" 
                                                placeholder="Ex: exemple@gmail.com" 
                                                onChange={(event)=>{
                                                    setAdmin({...admin,email: event.target.value})
                                                }}
                                                value={admin.email}
                                                />
                                            </FormControl>
                                            <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                Ce champ est obligatoire
                                            </p>
                                        </Grid>


                                    <Grid xs={12} sm={12} md={12} container style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                        <Grid xs={12} sm={12} md={4}  item>
                                            <FormControl fullWidth>
                                            <label className={classes.labelText}>addresse <span style={{ color: 'red' }}>*</span> </label>
                                                <Field className={classes.input} 
                                                id="input"
                                                name="addresse"
                                                type="text"
                                                variant="outlined" 
                                                placeholder="Ex: Pikine rue 10" 
                                                onChange={(event)=>{
                                                    setAdmin({...admin,addresse: event.target.value})
                                                }}
                                                value={admin.addresse}
                                                />
                                            </FormControl>
                                            <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                Ce champ est obligatoire
                                            </p>
                                            </Grid>
                                            <Grid xs={12} sm={12} md={4} item className={styles.gridStyle}>
                                                <FormControl fullWidth>
                                                    <label className={classes.labelText}>N° CNI <span style={{ color: 'red' }}>*</span> </label>
                                                    <Field className={classes.input} 
                                                    id="input"
                                                    name="cni"
                                                    type="text"
                                                    variant="outlined" 
                                                    placeholder="Ex: 2020202120221" 
                                                    onChange={(event)=>{
                                                        setAdmin({...admin,cni: event.target.value})
                                                    }}
                                                    value={admin.cni}
                                                    />
                                                </FormControl>
                                                {/* <ErrorMessage 
                                                name="cni"
                                                component="small"
                                                style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}
                                                /> */}
                                                 <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                    Ce champ est obligatoire
                                                 </p>
                                            </Grid>
                                        </Grid>


                                        <Grid xs={12} sm={12} md={12}  style={{ display:"flex", justifyContent:"center", marginTop: "20px"}}>
                                    <Grid xs={12} sm={12} md={4}  item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Structure <span style={{ color: 'red' }}>*</span> </label>
                                            

                                            <Select 
                                                labelId="demo-simple-select-label"
                                                id="input"
                                                name="structure"
                                                label="Structure"
                                                value={struct}
                                                onChange={(event) => chargerStructure(event.target.value)}
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
                                                onChange={(event)=>{
                                                    setAdmin({...admin,structure :  event.target.value})
                                                }}
                                                value={admin.structure}
                                                >
                                                <MenuItem selected>Select</MenuItem>    
                                                {structure.map(item => (  
                                                    <MenuItem value={item}>{item.nomStructure}</MenuItem>    
                                                ))}  
                                               

                                            </Select>
                                        </FormControl>
                                        <p component="small" style={{marginTop: "5px", color: "red", fontFamily: "Open sans", fontSize:"20px"}}>
                                                Ce champ est obligatoire
                                        </p>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4}  item className={styles.gridStyle}>
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" variant="contained" 
                                        id="button"
                                            sx={{
                                                backgroundColor: "#05888A", 
                                                fontFamily: "Arial", fontSize: "20px", 
                                                marginTop: "10px", 
                                                    '&:hover':{
                                                        backgroundColor:"#F48322", 
                                                        pointer:"cursor"
                                                    }
                                                }}
                                                onClick={handleSubmit}
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
