/* eslint-disable array-callback-return */
import { DocumentScannerOutlined, FilterAltOutlined, PersonOutline } from '@mui/icons-material'
import { Box, Grid, OutlinedInput, InputAdornment, MenuItem, Select, Stack, Button, Pagination, PaginationItem } from '@mui/material'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import React, {useState} from 'react'
import Layout from "../layout/Layout"
import VisiteStyle from "./VisiteStyle"
import { AddCircleOutlined } from '@mui/icons-material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, Typography } from "@material-ui/core"
import { ListAllVisite, ListVisitesApp, ListVisitesVisteur, SaveVisitesVisieur, SortieApp, SortieVisiteur } from './VisiteService'
import logosonatel from "../../assets/images/logoSA.png"
import dateTime from 'date-time';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid'
import jsPDF from "jspdf"
import "jspdf-autotable"
import Swal from "sweetalert2";
import {encode as base64_encode} from 'base-64';
import { SearchOutlined } from '@mui/icons-material';

var QRCode = require('qrcode.react')

export const Visites = () => {

    const [visiteur, setVisiteur] = React.useState("");
    const [visites, setVisites] = React.useState([]);
    const [formErrors, setFormErrors] = useState( {});
    const [loading, setLoading] = React.useState(true);



    const [values, setValues] = React.useState({
        cni: '',
        prenom: '',
        nom: '',
        numTelephone: '',

    })
    const [date, setDate] = React.useState(new Date())
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        ListAllVisite(date.toLocaleDateString("fr-CA")).then(res => {
            setVisites(res.data.reverse());
            setLoading(false);
        })
    }, [date])

    // Custom Pagination
    function CustomPagination() {
        const apiRef = useGridApiContext()
        const page = useGridSelector(apiRef, gridPageSelector)
        const pageCount = useGridSelector(apiRef, gridPageCountSelector)

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
        )
    }

    function buttonSortir(donnees){
        if (donnees.apprenant != null){
            setLoading(true);
            SortieApp(donnees).then(() => {
                chargerVisites(date, visiteur)
            })
        }else {
            setLoading(true);
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
                    return params.row.visiteur.prenom
                } else if (params.row.apprenant) {
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
                } else if (params.row.apprenant) {
                    return params.row.apprenant.nom
                }
            }
        },
        {
            field: 'cni',
            headerClassName: 'super-app-theme--header',
            headerName: 'cni',
            flex: 1,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                    return params.row.visiteur.cni
                } else if (params.row.apprenant) {
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
        },

    ]
    const exportPDF = () => {

        const unit = "pt"
        const size = "A4" // Use A1, A2, A3 or A4
        const orientation = "landscape" // portrait or landscape

        const marginLeft = 40
        const doc = new jsPDF(orientation, unit, size)

        doc.setFontSize(15)

        const title = "Liste du " + date.toDateString()
        const headers = [["Prenom", "Nom", "cni", "Entree", "Sortie"]]

        const dat = visites.map(elt => [
            elt.visiteur ? elt.visiteur.prenom : elt.apprenant.prenom,
            elt.visiteur ? elt.visiteur.nom : elt.apprenant.nom,
            elt.visiteur ? elt.visiteur.cni : elt.apprenant.cni,
            elt.dateEntree ? elt.dateEntree.substr(11, 5) : null,
            elt.dateSortie ? elt.dateSortie.substr(11, 5) : null,
        ]
        )

        let content = {
            startY: 50,
            head: headers,
            body:dat

        }

        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc.save("report.pdf")
    }
    const classes = VisiteStyle()
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    function chargerVisites(ndate, value) {
        setVisiteur(value)
        setDate(ndate)
        setLoading(true);
        if (value === "") {
            ListAllVisite(ndate.toLocaleDateString("fr-CA")).then(res => {
                setVisites(res.data);
                setLoading(false);
            })
        } else if (value === "apprenant") {
            ListVisitesApp(ndate.toLocaleDateString("fr-CA")).then(res => {
                setVisites(res.data);
                setLoading(false);
            })
        } else if (value === "visiteur") {
            ListVisitesVisteur(ndate.toLocaleDateString("fr-CA")).then(res => {
                setVisites(res.data);
                setLoading(false);
            })
        }
    };


    // fONCTION POURGENERE PDF
    const AjouterVisites = () => {
        setFormErrors(validateVisite(values));
        SaveVisitesVisieur({ 'visiteur' : values}).then(res => {
            handleClose()
            downloadQRCode();
            setLoading(true);
            if (visiteur === "") {
                ListAllVisite(date.toLocaleDateString("fr-CA")).then(res => {
                  setVisites(res.data);
                  setLoading(false);
                })
            }else if (visiteur === "apprenant") {
                ListVisitesApp(date.toLocaleDateString("fr-CA")).then(res => {
                  setVisites(res.data);
                  setLoading(false);
                })
            }else if (visiteur === "visiteur") {
                ListVisitesVisteur(date.toLocaleDateString("fr-CA")).then(res => {
                  setVisites(res.data);
                  setLoading(false);
                })
            }
            if(res.status===200) {
                Swal.fire(
                    'Succes!',
                    'Enregistrer avec succes.',
                    'success'
                ).then((res) => {
                    setValues({
                        cni: '',
                        prenom: '',
                        nom: '',
                        numTelephone: '',

                    })
                })
            }
        }).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode_"+ values.prenom + "_" + values.nom + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const validateVisite = (val) => {
        let regexcni = new RegExp("(^[1-2])[0-9]{12}$");
        let regexPhone = new RegExp("^(33|7[5-8])[0-9]{7}$");
        const errors = {};
        if(val.prenom === ''){
            errors.prenom = "prenom est requis"
        } else if(val.prenom.length < 3){
            errors.prenom = "le prenom doit comporter plus de 3 caractères";
        }
        else if(val.nom.length > 20){
            errors.nom = "le nom ne peut pas dépassé plus de 20 caractères";
        }
        if(val.nom === ''){
            errors.nom = "nom est requis"
        } else if(val.nom.length < 2){
            errors.nom = "le nom doit comporter plus de 2 caractères";
        }
        else if(val.nom.length > 10){
            errors.nom = "le nom ne peut pas dépassé plus de 10 caractères";
        }

        if(val.numTelephone === ''){
            errors.numTelephone = "le numéro de télephone est requis"
        } else if(!regexPhone.test(val.numTelephone)){
            errors.numTelephone = "le format numéro télephone n'est pas valide";
        }

        if(val.cni === ''){
            errors.cni = "le numéro de carte d'identité est requis"
        } else if(!regexcni.test(val.cni)){
            errors.cni = "le format numéro de carte d'identité n'est pas valide";
        }
        return errors;
    };



    return (
        <Layout>
            <Grid style={{widt:"100%", display: 'flex', justifyContent:"center", alignItems:"center"}}>
            <Grid style={localStorage.getItem('user') === '["ADMIN"]' ? {width: '80%'} : {width: '100%'}}>
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
                                                        width: "12vw",
                                                        borderRadius: "10px"
                                                    }}
                                                />
                                            )
                                        }}
                                    // renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <Select
                                    value={visiteur}
                                    style={{ fontWeight: "bolder", color: "#787486", borderRadius: "10px" }}
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
                            <div>
                                <FormControl sx={{ m: 1 }} className={classes.mysearch}>
                                    <OutlinedInput
                                        id="search"
                                        placeholder="rechercher"
                                        style={{ fontWeight: "bolder", color: "#787486"}}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchOutlined></SearchOutlined>
                                            </InputAdornment>
                                        }
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                        }}
                                    />
                                </FormControl>
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
                                    exportPDF()
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

                                autoHeight
                                pageSize={10}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Pagination: CustomPagination,
                                    // Toolbar: CustomToolbar,
                                }}
                                loading={loading}
                                rows={
                                    visites.filter((val) => {
                                        if(search === ""){
                                            return val;
                                        } else if (val.visiteur?.prenom.toLowerCase().includes(search.toLowerCase()) || val.visiteur?.nom.toLowerCase().includes(search.toLowerCase())
                                            || val.visiteur?.cni.toLowerCase().includes(search.toLowerCase()) || val.apprenant?.prenom.toLowerCase().includes(search.toLowerCase()) || val.apprenant?.nom.toLowerCase().includes(search.toLowerCase())
                                            || val.apprenant?.cni.toLowerCase().includes(search.toLowerCase())){

                                            return val;
                                        }
                                    }).map((row) => {
                                          return row;
                                    })
                                }
                                columns={columns}
                                disableVirtualization
                            >
                            </DataGrid>
                        </div>

                    </Box>

                </Box>
            </Box>


            <QRCode
                hidden
                id="qr-gen"
                value={base64_encode('{"cni":"' + values.cni + '", "date": "' + dateTime({date: new Date()}) + '"}')}
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


            <div>
                <Dialog open={open} onClose={handleClose}>

                    <DialogTitle variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>AJOUTER VISITEUR</DialogTitle>
                    <hr style={{ borderTop: " 4px solid #138A8A", width: "20%", float: "left", marginLeft: "15px" }} />
                    <DialogContent>
                        <p>Complétez le formulaire. Les champs marqué par <span style={{ color: 'red' }}>*</span>  sont <span style={{ color: 'red' }}> obligatoires </span></p>
                        <Grid>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>CNI<span style={{ color: 'red' }}>*</span> </label>
                                <OutlinedInput
                                    id="cni"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Ex:cni"
                                    onChange={(event) => {
                                        setValues({ ...values, cni: event.target.value })
                                    }}
                                    value={values.cni}
                                />
                            </FormControl>
                            <p className={classes.formError}>{formErrors.cni}</p>
                        </Grid>
                        <Grid mt={2}>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>Prenom<span style={{ color: 'red' }}>*</span> </label>
                                <OutlinedInput
                                    id="prenom"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Ex:prenom"
                                    onChange={(event) => {
                                        setValues({ ...values, prenom: event.target.value })
                                    }}
                                    value={values.prenom}
                                />
                            </FormControl>
                            <p className={classes.formError}>{formErrors.prenom}</p>
                        </Grid>
                        <Grid mt={2}>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>Nom<span style={{ color: 'red' }}>*</span> </label>
                                <OutlinedInput
                                    id="nom"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Ex:nom"
                                    onChange={(event) => {
                                        setValues({ ...values, nom: event.target.value })
                                    }}
                                    value={values.nom}
                                />
                            </FormControl>
                            <p className={classes.formError}>{formErrors.nom}</p>
                        </Grid>
                        <Grid mt={2}>
                            <FormControl fullWidth>
                                <label className={classes.labelText}>Telephone<span style={{ color: 'red' }}>*</span> </label>
                                <OutlinedInput
                                    id="telephone"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Ex:telephone"
                                    onChange={(event) => {
                                        setValues({ ...values, numTelephone: event.target.value })
                                    }}
                                    value={values.numTelephone}
                                />
                            </FormControl>
                            <p className={classes.formError}>{formErrors.numTelephone}</p>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                            sx={{
                                backgroundColor: "#BE0101",
                                fontFamily: "Arial", fontSize: "20px",
                                marginTop: "10px",
                                color: "#FFFFFF",
                                '&:hover': {
                                    backgroundColor: "#F32018",
                                    pointer: "cursor"
                                }
                            }}
                        >ANNULER</Button>
                        <Button onClick={AjouterVisites}
                            sx={{
                                backgroundColor: "#05888A",
                                fontFamily: "Arial", fontSize: "20px",
                                marginTop: "10px",
                                color: "#FFFFFF",
                                '&:hover': {
                                    backgroundColor: "#F48322",
                                    pointer: "cursor"
                                }
                            }}
                        >AJOUTER
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            </Grid>
            </Grid>
        </Layout>
    )
}

export default Visites;
