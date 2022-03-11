import { DocumentScannerOutlined, FilterAltOutlined, PersonOutline } from '@mui/icons-material';
import { Box, Grid, OutlinedInput, InputAdornment, MenuItem, Select, Stack, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react'
import Layout from "../layout/Layout";
import VisiteStyle from "./VisiteStyle";
import { AddCircleOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Typography } from "@material-ui/core";
import { ListAllVisite, ListVisitesApp, ListVisitesVisteur } from './VisiteService'

import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
// import { useDemoData } from "@mui/x-data-grid-generator";

export const Visites = () => {
    const [visiteur, setVisiteur] = React.useState("apprenant");
    const [visites, setVisites] = React.useState([]);




    // Date du jour 
    const [value, setValue] = React.useState(new Date());

    React.useEffect(()=>{
        ListAllVisite().then(res => {
            setVisites(res.data);
        });
    
   }, [])

    // Custom Pagination
    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        return (
            <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                // @ts-expect-error
                renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        );
    }


    const columns = [
        {
            field: 'prenom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Prenom',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                  return params.row.visiteur.prenom
                } else if(params.row.apprenant) {
                    return params.row.apprenant.prenom
                }
            }
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                  return params.row.visiteur.nom
                } else if(params.row.apprenant) {
                    return params.row.apprenant.nom
                }
            }
        },
        {
            field: 'cni',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cni',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                  return params.row.visiteur.cni
                } else if(params.row.apprenant) {
                    return params.row.apprenant.cni
                }
            }
        },
        {
            field: 'dateEntree',
            headerClassName: 'super-app-theme--header',
            headerName: 'Entree',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.dateEntree) {
                  return params.row.dateEntree.substr(11, 5)
                } 
            }
        },
        {
            field: 'dateSortie',
            headerClassName: 'super-app-theme--header',
            headerName: 'Sortie',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.dateSortie) {
                  return params.row.dateSortie.substr(11, 5)
                } 
            }
        },

    ]
    const classes = VisiteStyle();

    

      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


      const chargerVisites = (value) => {
          setVisiteur(value)
          if (value === "") {
              ListAllVisite().then(res => {
                setVisites(res.data);
              })
          }else if (value === "apprenant") {
              ListVisitesApp().then(res => {
                setVisites(res.data)
              })
          }else if (value === "visiteur") {
              ListVisitesVisteur().then(res => {
                setVisites(res.data)
              })
          }
            alert(value);
      }
    
    



    return (
        <Layout>
            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                LISTE DES VISITEURS
            </Typography>
            <Box sx={{}} className={classes.visitePage} >

                <Box style={{ width: "100%" }}>
                    {/* Gestion de l'entete de la liste des Reservations */}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"

                    }} spacing={2}
                    >

                        <Stack
                            direction="row" spacing={5} justifyContent="center" alignItems="center"

                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                color: "gray"
                            }}
                            >
                                <FilterAltOutlined></FilterAltOutlined>
                                Filtre
                            </div>

                            <div>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyy"
                                        className={classes.visiteur}
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                        svg: { color: "#44C3CF" },
                                                        input: { color: "#787486", fontWeight: "bold" },
                                                        label: { color: "#44C3CF" },
                                                        border: "2px solid #44C3CF",
                                                        width: "15vw",
                                                        borderRadius: "15px"
                                                    }}
                                                />
                                            );
                                        }}
                                    // renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <Select
                                    value={visiteur}
                                    style={{ width: "15vw", fontWeight: "bolder", color: "#787486", borderRadius: "15px" }}
                                    onChange={(event) => chargerVisites(event.target.value)}
                                    className={classes.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonOutline sx={{ color: "#44C3CF" }} ></PersonOutline>
                                        </InputAdornment>}

                                >
                                    <MenuItem value="">
                                        <em>Tous</em>
                                    </MenuItem>
                                    <MenuItem value={"apprenant"}>Apprenant</MenuItem>
                                    <MenuItem value={"visiteur"}>Visiteur</MenuItem>
                                </Select>
                            </div>
                        </Stack>
                        <div>
                            <Button
                                variant="contained"
                                endIcon={<AddCircleOutlined />}
                                onClick={handleClickOpen}
                                sx={{backgroundColor: "#05888A", 
                                                    fontFamily: "Arial", 
                                                    fontSize: "20px", 
                                                    marginRight: "10px",
                                                    marginTop: "10px", 
                                                        '&:hover':{
                                                            backgroundColor:"#F48322", 
                                                            pointer:"cursor"
                                                        }
                                                    }}
                            >
                                AJOUTER
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={<DocumentScannerOutlined />}
                                sx={{backgroundColor: "#05888A", 
                                                    fontFamily: "Arial", fontSize: "20px", 
                                                    marginTop: "10px", 
                                                        '&:hover':{
                                                            backgroundColor:"#F48322", 
                                                            pointer:"cursor"
                                                        }
                                                    }}
                            >
                                Impression
                            </Button>
                        </div>

                    </Box>

                    <Box sx={{
                        boxShadow: 1, borderRadius: "10px", paddingBottom: "20px",
                        '& .super-app-theme--header': {
                            backgroundColor: '#44C3CF'
                        },
                    }} className={classes.tableau}>

                        <div style={{ width: "100%" }}>
                            <h2 style={{ color: "#44C3CF" }}> Liste du {value.toDateString()}</h2>

                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" }}

                                autoHeight
                                pageSize={6}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Pagination: CustomPagination,
                                    // Toolbar: CustomToolbar,
                                }}
                                rows={visites}
                                columns={columns}
                                
                                disableVirtualization
                            />
                        </div>

                    </Box>

                </Box>
            </Box>

            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>AJOUTER VISITEUR</DialogTitle>
                    <hr style={{ borderTop: " 4px solid #138A8A", width: "20%", float:"left", marginLeft:"15px" }} />
                    <DialogContent>
                        <Grid>
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
                        <Grid mt={2}>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>Nom</label>
                                <OutlinedInput 
                                id="nom"
                                type="text"
                                variant="outlined" 
                                placeholder="Ex:DIOP" 
                                />
                            </FormControl>
                        </Grid>
                        <Grid mt={2}>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>Telephone</label>
                                <OutlinedInput 
                                id="telephone"
                                type="text"
                                variant="outlined" 
                                placeholder="Ex:77 777 77 77" 
                                />
                            </FormControl>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}
                        sx={{backgroundColor: "#BE0101", 
                        fontFamily: "Arial", fontSize: "20px", 
                        marginTop: "10px",
                        color: "#FFFFFF",
                        '&:hover':{
                            backgroundColor:"#F32018", 
                            pointer:"cursor"
                        }
                    }}
                    >ANNULER</Button>
                    <Button onClick={handleClose}
                        sx={{backgroundColor: "#05888A", 
                        fontFamily: "Arial", fontSize: "20px", 
                        marginTop: "10px",
                        color: "#FFFFFF",
                        '&:hover':{
                            backgroundColor:"#F48322", 
                            pointer:"cursor"
                        }
                    }}
                    >AJOUTER</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Layout>
    )
}

export default Visites;
