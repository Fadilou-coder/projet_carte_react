import { DocumentScannerOutlined, FilterAltOutlined, PersonOutline } from '@mui/icons-material';
import { Box, Grid, OutlinedInput, InputAdornment, MenuItem, Select, Stack, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import React, {useState} from 'react';
import Layout from "../layout/Layout";
import VisiteStyle from "./VisiteStyle";
import { AddCircleOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Typography } from "@material-ui/core";
import {
    ListAllVisite,
    ListVisitesApp,
    ListVisitesVisteur,
    SaveVisitesVisieur,
    SortieApp,
    SortieVisiteur
} from './VisiteService';

import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
// import { useDemoData } from "@mui/x-data-grid-generator";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Skeletons from "../skeleton/Skeleton";





export const Visites = () => {

    // Definition boolean pour le chargement des données
    const [isLoaded, setIsloaded] = useState(false);

    //=======================================================
    // ========== Trier par Apprenant ou Visiteur  ==========
    // ======================================================
    const [visiteur, setVisiteur] = React.useState("");
    const [visites, setVisites] = React.useState([]);

    const [values, setValues] = React.useState({
        Cni: '',
        prenom: '',
        nom: '',
        numTelephone: '',

    });
    //=======================================================
    // ===== Pour savoir sur quelle date on verifie =========
    // ===== Les presences des admins et visiteurs ==========
    // ======================================================
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        ListAllVisite(date.toLocaleDateString("fr-CA")).then(res => {
            setIsloaded(true)
            setVisites(res.data.reverse());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    function buttonSortir(donnees){
        if (donnees.apprenant != null){
            SortieApp(donnees).then(() => {
                chargerVisites(date, visiteur)
            })
        }else {
            SortieVisiteur(donnees).then(() => {
                chargerVisites(date, visiteur)
            })
        }
    }


    const columns = [
        {
            field: 'prenom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Prenom',
            flex: 1,
            valueGetter: (params) => {

                if (params.row.visiteur) {
                    return params.row.visiteur.prenom;
                } else if (params.row.apprenant) {
                    return params.row.apprenant.prenom;
                }

                setIsloaded(true);
            }
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                    return params.row.visiteur.nom;
                } else if (params.row.apprenant) {
                    return params.row.apprenant.nom;
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
                    return params.row.visiteur.cni;
                } else if (params.row.apprenant) {
                    return params.row.apprenant.cni;
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
                    return params.row.dateEntree.substr(11, 5);
                }
            }
        },
        {
            field: 'dateSortie',
            headerClassName: 'super-app-theme--header',
            headerName: 'Sortie',
            flex: 1,
            renderCell: (cellvalue) =>{
                if (cellvalue.row.dateSortie==null){
                    return <Button
                        sx ={{backgroundColor:"green", color:"white" }}
                        onClick= {() => buttonSortir(cellvalue.row)}
                    >

                        Sortir
                    </Button>
                }
            },
            valueGetter: (params) => {
                if (params.row.dateSortie) {
                    return params.row.dateSortie.substr(11, 5);
                }
            }
        }
    ];


    // =====================================================
    // ======= Fonction qui permet la generation du Pdf ====
    // =====================================================
    const exportPDF = () => {

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Liste du " + date.toDateString();
        const headers = [["Prenom", "Nom", "Cni", "Entree", "Sortie"]];
        const dat = visites.map(elt => [
            elt.visiteur ? elt.visiteur.prenom : elt.apprenant.prenom,
            elt.visiteur ? elt.visiteur.nom : elt.apprenant.nom,
            elt.visiteur ? elt.visiteur.cni : elt.apprenant.cni,
            elt.dateEntree ? elt.dateEntree.substr(11, 5) : null,
            elt.dateSortie ? elt.dateSortie.substr(11, 5) : null,
        ]
        );

        let content = {
            startY: 50,
            head: headers,
            body:
                !isLoaded?(
                        <Skeletons nbItem={10} list={classes.listIsload}/>
                    ) : (dat)
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content)
        doc.save("report.pdf");
    };


    const classes = VisiteStyle();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function chargerVisites(ndate, value) {
        setVisiteur(value);
        setDate(ndate);
        if (value === "") {
            ListAllVisite(ndate.toLocaleDateString("fr-CA")).then(res => {
                setVisites(res.data.reverse());
            })
        } else if (value === "apprenant") {
            ListVisitesApp(ndate.toLocaleDateString("fr-CA")).then(res => {
                setVisites(res.data.reverse())
            })
        } else if (value === "visiteur") {
            ListVisitesVisteur(ndate.toLocaleDateString("fr-CA")).then(res => {
                setVisites(res.data.reverse())
              })
          }
      };

      const AjouterVisites = () => {
        SaveVisitesVisieur({ 'visiteur' : values}).then(res => {
            handleClose();
            if (visiteur === "") {
                ListAllVisite(date.toLocaleDateString("fr-CA")).then(res => {
                  setVisites(res.data);
                })
            }else if (visiteur === "apprenant") {
                ListVisitesApp(date.toLocaleDateString("fr-CA")).then(res => {
                  setVisites(res.data)
                })
            }else if (visiteur === "visiteur") {
                ListVisitesVisteur(date.toLocaleDateString("fr-CA")).then(res => {
                  setVisites(res.data)
                })
            }
            setValues({
                Cni: '',
                prenom: '',
                nom: '',
                numTelephone: '',

            })
        });
      }



    return (
        <Layout>
            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                LISTE DES VISITEURS
            </Typography>
            <Box sx={{}} className={classes.visitePage} >

                <Box style={{ width: "100%" }}>

                    {/*
                        Dans cettte partie, on a la partie du triage et de l'impressiono
                    */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"

                    }} spacing={2}
                    >

                        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
                            <div
                                style={{
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
                                        value={date}
                                            onChange={(newValue) => {
                                                console.log(newValue);
                                                chargerVisites(newValue, visiteur)
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
                                    onChange={(event) => chargerVisites(date, event.target.value)}
                                    className={classes.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonOutline sx={{ color: "#44C3CF" }} ></PersonOutline>
                                        </InputAdornment>}

                                >
                                    <MenuItem value={""}>
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
                                sx={{
                                    backgroundColor: "#05888A",
                                    fontFamily: "Arial",
                                    fontSize: "20px",
                                    marginRight: "10px",
                                    '&:hover': {
                                        backgroundColor: "#F48322",
                                        pointer: "cursor"
                                    }
                                }}
                            >
                                AJOUTER
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={<DocumentScannerOutlined />}
                                onClick={(params, event) => {
                                    exportPDF();
                                }}
                                sx={{
                                    backgroundColor: "#138A8A",
                                    fontSize: "20px",
                                    fontWeight: "bolder",
                                    '&:hover': {
                                        backgroundColor: '#F48322',
                                    }
                                }}
                            >
                                Impression
                            </Button>

                        </div>

                    </Box>


                    {/*
                        Nous avons ici le tableau des visite effectuées durant une journée
                     */}
                    <Box sx={{
                        boxShadow: 1, borderRadius: "10px", paddingBottom: "20px",
                        '& .super-app-theme--header': {
                            backgroundColor: '#44C3CF'
                        },
                    }} className={classes.tableau}>

                        <div style={{ width: "100%" }}>
                            <h2 style={{ color: "#44C3CF" }}> Liste du {date.toDateString()}</h2>

                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" }}
                                onLoad
                                autoHeight
                                pageSize={10}
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
                    <hr style={{ borderTop: " 4px solid #138A8A", width: "20%", float: "left", marginLeft: "15px" }} />
                    <DialogContent>
                        <Grid>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>CNI</label>
                                <OutlinedInput
                                    id="cni"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Ex:1 123 1234 12345"
                                    onChange={(event)=>{
                                        setValues({...values,cni: event.target.value})
                                    }}
                                    value={values.cni}
                                />
                            </FormControl>
                        </Grid>
                        <Grid  mt={2}>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>Prenom</label>
                                <OutlinedInput
                                    id="prenom"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Ex:Omar"
                                    onChange={(event)=>{
                                        setValues({...values,prenom: event.target.value})
                                    }}
                                    value={values.prenom}
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
                                    onChange={(event)=>{
                                        setValues({...values,nom: event.target.value})
                                    }}
                                    value={values.nom}
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
                                    placeholder="Ex:777777777"
                                    onChange={(event)=>{
                                        setValues({...values,numTelephone: event.target.value})
                                    }}
                                    value={values.numTelephone}
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
                    <Button onClick={AjouterVisites}
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
    );
};

export default Visites;
