/* eslint-disable array-callback-return */
import { DocumentScannerOutlined, FilterAltOutlined, PersonOutline } from '@mui/icons-material'
import { Box, Grid, OutlinedInput, InputAdornment, MenuItem, Select, Button, Pagination, PaginationItem } from '@mui/material'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import React, { useState } from 'react'
import Layout from "../layout/Layout"
import VisiteStyle from "./VisiteStyle"
import { AddCircleOutlined } from '@mui/icons-material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, IconButton, Typography } from "@material-ui/core"
import { ListAllVisite, ListCommentsApp, ListVisitesApp, ListVisitesVisteur, SaveCommentApp, SaveVisitesVisieur, SortieApp, SortieVisiteur } from './VisiteService'
import logosonatel from "../../assets/images/logoSA.png"
import imgData from "../../assets/images/filigrane_logo.png"
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import dateTime from 'date-time';
import {
    DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector,
} from '@mui/x-data-grid'
import jsPDF from "jspdf"
import "jspdf-autotable"
import Swal from "sweetalert2";
import { SearchOutlined } from '@mui/icons-material';
var QRCode = require('qrcode.react')

export const Visites = () => {

    const [visiteur, setVisiteur] = React.useState("");
    const [visites, setVisites] = React.useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = React.useState(true);

    // const [showDialog, setShowDialog] = useState(false);


    const [values, setValues] = React.useState({
        typePiece: 'CNI',
        numPiece: '',
        prenom: '',
        nom: '',
        numTelephone: '',

    })

    const [comment, setComment] = React.useState({
        commentaire: '',
        apprenant: {
            id: 0
        },

    })
    const [commentsApp, setCommentsApp] = React.useState([])
    const [date, setDate] = React.useState(new Date())
    const [search, setSearch] = React.useState('');
    const [showDialog, setShowDialog] = useState(false);

    React.useEffect(() => {
        ListAllVisite(date.toLocaleDateString("fr-CA")).then(res => {
            setVisites(res.data.reverse());
            setLoading(false);
        })
    }, [date])

    const commenter = () => {
        SaveCommentApp(comment).then(() => {
            setComment({
                commentaire: '',
                apprenant: {
                    id: 0
                }
            })
        })
    }

    const findComments = (id) => {
        ListCommentsApp(id).then((res) => {
            setCommentsApp(res.data);
        })
    }

    // Custom Datagrid No Rows show

    function CustomNoRowsOverlay() {
        return (

            <Grid sx={{ display: "flex", justifyContent: "center", }}>
                <div>
                    <Box sx={{ mt: 1, fontWeight: "bold", fontSize: "20px" }}>
                        Tableau Vide
                    </Box>
                    <Box sx={{ width: "80px" }} >

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>

                    </Box>
                </div>
            </Grid >

        );
    }




    // Custom Pagination
    function CustomPagination() {
        const apiRef = useGridApiContext()
        const page = useGridSelector(apiRef, gridPageSelector)
        const pageCount = useGridSelector(apiRef, gridPageCountSelector)

        return (
            <Pagination
                color="standard"

                iant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                // @ts-expect-error
                renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        )
    }

    function buttonSortir(donnees) {
        if (donnees.apprenant != null) {
            setLoading(true);
            SortieApp(donnees).then(() => {
                chargerVisites(date, visiteur)
            })
        } else {
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
            headerName: 'Prénom',
            flex: 1,
            minWidth: 150,
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
            minWidth: 150,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                    return params.row.visiteur.nom
                } else if (params.row.apprenant) {
                    return params.row.apprenant.nom
                }
            }
        },
        {
            field: 'numPiece',
            headerClassName: 'super-app-theme--header',
            headerName: 'numPiece',
            flex: 1,
            minWidth: 150,
            valueGetter: (params) => {
                if (params.row.visiteur) {
                    return params.row.visiteur.numPiece
                } else if (params.row.apprenant) {
                    return params.row.apprenant.numPiece
                }
            }
        },
        {
            field: 'dateEntree',
            headerClassName: 'super-app-theme--header',
            headerName: 'Entree',
            flex: 1,
            minWidth: 150,
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
            minWidth: 150,
            renderCell: (cellvalue) => {
                if (cellvalue.row.dateSortie == null) {
                    return <Button
                        sx={{
                            backgroundColor: '#FF6600',
                            color: "#000000",
                            fontWeight: "bolder",
                            '&:hover': {
                                backgroundColor: '#000000',
                                color: "#FFFFFF"
                            }
                        }}
                        onClick={() => buttonSortir(cellvalue.row)}
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


    function addWaterMark(doc) {
        var totalPages = doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.saveGraphicsState();
            doc.setGState(new doc.GState({ opacity: 0.2 }));
            doc.addImage(imgData, 'PNG', 150, 100, 500, 400);
            doc.restoreGraphicsState();
        }

        return doc;
    }
    const exportPDF = () => {

        const unit = "pt"
        const size = "A4" // Use A1, A2, A3 or A4
        const orientation = "landscape" // portrait or landscape

        const marginLeft = 40
        var doc = new jsPDF(orientation, unit, size)

        doc.setFontSize(15)

        const title = "Liste du " + date.toDateString()
        const headers = [["Prenom", "Nom", "numPiece", "Entree", "Sortie"]]

        const dat = visites.map(elt => [
            elt.visiteur ? elt.visiteur.prenom : elt.apprenant.prenom,
            elt.visiteur ? elt.visiteur.nom : elt.apprenant.nom,
            elt.visiteur ? elt.visiteur.numPiece : elt.apprenant.numPiece,
            elt.dateEntree ? elt.dateEntree.substr(11, 5) : null,
            elt.dateSortie ? elt.dateSortie.substr(11, 5) : null,
        ]
        )

        let content = {
            startY: 50,
            head: headers,
            body: dat,
            headStyles: { fillColor: [0, 0, 0] },

        }

        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc = addWaterMark(doc);
        doc.save("Rapport du " + date.toDateString())
    }
    const classes = VisiteStyle()


    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setShowDialog(false)
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
        SaveVisitesVisieur({ 'visiteur': values }).then(res => {
            handleClose()
            downloadQRCode();
            setLoading(true);
            if (visiteur === "") {
                ListAllVisite(date.toLocaleDateString("fr-CA")).then(res => {
                    setVisites(res.data);
                    setLoading(false);
                })
            } else if (visiteur === "apprenant") {
                ListVisitesApp(date.toLocaleDateString("fr-CA")).then(res => {
                    setVisites(res.data);
                    setLoading(false);
                })
            } else if (visiteur === "visiteur") {
                ListVisitesVisteur(date.toLocaleDateString("fr-CA")).then(res => {
                    setVisites(res.data);
                    setLoading(false);
                })
            }
            if (res.status === 200) {
                Swal.fire(
                    'Succes!',
                    'Enregistrer avec succes.',
                    'success'
                ).then((res) => {
                    setValues({
                        numPiece: '',
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
        downloadLink.download = "qrcode_" + values.prenom + "_" + values.nom + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const validateVisite = (val) => {
        let regexnumPiece = new RegExp("(^[1-2])[0-9]{12}$");
        let regexPhone = new RegExp("^(33|7[5-8])[0-9]{7}$");
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

        if (val.numTelephone === '') {
            errors.numTelephone = "le numéro de télephone est requis"
        } else if (!regexPhone.test(val.numTelephone)) {
            errors.numTelephone = "le format numéro télephone n'est pas valide";
        }

        if (val.numPiece === '') {
            errors.numPiece = "le numéro de pièce est requis"
        } else if (!regexnumPiece.test(val.numPiece)) {
            errors.numPiece = "le format numéro de carte d'identité n'est pas valide";
        }
        return errors;
    };

    function loadMoreItems(event) {
        if (event.target.scrollTop === event.target.scrollHeight) {
        }
    }



    return (
        <Layout>
            <Grid style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Grid style={localStorage.getItem('user') === '["ADMIN"]' ? { width: '80%' } : { width: '100%' }}>
                    <Typography variant='h5'
                        style={{
                            marginBottom: "20px",
                            borderLeft: "6px solid #000000",
                            color: "#000000",
                            paddingLeft: "20px",
                            fontWeight: "bolder"
                        }}>
                        LISTE DES VISITEURS
                    </Typography>
                    <Box sx={{}} className={classes.visitePage} >

                        <Box style={{ width: "100%" }}>
                            <Box
                                className={classes.filtre}
                            >

                                <Grid direction="row" spacing={5} alignItems="center" className={classes.champfiltre}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            color: "gray"
                                        }}
                                        className={classes.champtextfiltre}
                                    >
                                        <FilterAltOutlined></FilterAltOutlined>
                                        Filtre
                                    </div>

                                    <div
                                        className={classes.visiteur}
                                    >

                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker

                                                inputFormat="dd/MM/yyy"
                                                value={date}
                                                onChange={(newValue) => {
                                                    chargerVisites(newValue, visiteur)
                                                }}
                                                renderInput={(params) => {
                                                    return (
                                                        <TextField
                                                            size="small"
                                                            {...params}
                                                            sx={{
                                                                svg: { color: "#000000" },
                                                                input: { color: "#000000", fontWeight: "bold" },
                                                                label: { color: "#44C3CF" },
                                                                width: "100%",
                                                            }}
                                                        />
                                                    )
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div
                                        className={classes.visiteur}
                                    >
                                        <Select
                                            size='small'
                                            value={visiteur}
                                            style={{ fontWeight: "bolder", width: "100%", borderRadius: "10px" }}
                                            onChange={(event) => chargerVisites(date, event.target.value)}


                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PersonOutline sx={{ color: "#000000" }}  ></PersonOutline>
                                                </InputAdornment>}

                                        >
                                            <MenuItem value={""}>
                                                <em>Tous</em>
                                            </MenuItem>
                                            <MenuItem value={"apprenant"}>Apprenant</MenuItem>
                                            <MenuItem value={"visiteur"}>Visiteur</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.mysearch}>
                                        <FormControl sx={{ m: 1, width: "100%" }} className={classes.mytextsearch} >
                                            <OutlinedInput
                                                size='small'
                                                id="search"
                                                placeholder="rechercher"
                                                style={{
                                                    fontWeight: "bolder",
                                                    color: "#000000",
                                                    '&:focus': {
                                                        borderColor: "#FF6600",
                                                    },
                                                }}

                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <SearchOutlined sx={{ color: "#000000" }} ></SearchOutlined>
                                                    </InputAdornment>
                                                }
                                                onChange={(event) => {
                                                    setSearch(event.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </Grid>
                                <div
                                    className={classes.ajoutScan}

                                >
                                    {(localStorage.getItem('user') === '["ADMIN"]') ?
                                        <Button
                                            variant="contained"
                                            endIcon={<AddCircleOutlined />}
                                            onClick={handleClickOpen}
                                            sx={{
                                                backgroundColor: "#FF6600",
                                                fontFamily: "Arial",
                                                fontSize: "16px",
                                                color: "#000000",
                                                marginRight: "10px",
                                                fontWeight: "bold",
                                                '&:hover': {
                                                    backgroundColor: "#000000",
                                                    pointer: "cursor",
                                                    color: "white"

                                                }
                                            }}
                                        >
                                            AJOUTER
                                        </Button> : null
                                    }
                                    <Button
                                        variant="contained"
                                        endIcon={<DocumentScannerOutlined />}
                                        onClick={(params, event) => {
                                            exportPDF()
                                        }}
                                        sx={{
                                            backgroundColor: "#FF6600",
                                            fontSize: "16px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            '&:hover': {
                                                backgroundColor: '#000000',
                                                color: "white"
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
                                    backgroundColor: '#696969',
                                    color: "#FFFFFF",
                                    fontWeight: "bold",
                                    textTransform: "uppercase"
                                },
                            }} className={classes.tableau}>

                                <div style={{ width: "100%" }}>
                                    <h2 style={{ color: "#FF6600" }}> Liste du {date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h2>
                                    <DataGrid
                                        sx={{ boxShadow: "30px", width: "100%" }}
                                        autoHeight
                                        pageSize={10}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        components={{
                                            Pagination: CustomPagination,
                                            NoRowsOverlay: CustomNoRowsOverlay,
                                            // Toolbar: CustomToolbar,
                                        }}
                                        loading={loading}
                                        rows={
                                            visites.filter((val) => {
                                                if (search === "") {
                                                    return val;
                                                } else if (val.visiteur?.prenom.toLowerCase().includes(search.toLowerCase()) || val.visiteur?.nom.toLowerCase().includes(search.toLowerCase())
                                                    || val.visiteur?.numPiece.toLowerCase().includes(search.toLowerCase()) || val.apprenant?.prenom.toLowerCase().includes(search.toLowerCase()) || val.apprenant?.nom.toLowerCase().includes(search.toLowerCase())
                                                    || val.apprenant?.numPiece.toLowerCase().includes(search.toLowerCase())) {

                                                    return val;
                                                }
                                            }).map((row) => {
                                                return row;
                                            })
                                        }
                                        columns={columns}
                                        onRowClick={(params, event) => {
                                            setComment({ ...comment, apprenant: params.row.apprenant })
                                            if (params.row.apprenant) {
                                                findComments(params.row.apprenant.id);
                                                setShowDialog(true)
                                            }

                                        }}
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
                        value={'{ "numPiece":"' + values.numPiece + '", \n "prenom":"' + values.prenom + '", \n "nom":"' + values.nom + '", \n "date": "' + dateTime({ date: new Date() }) + '"}'}
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
                        <Dialog open={open} onClose={handleClose} PaperProps={{


                            sx: {
                                borderRadius: "10px",
                                padding: "20px",
                                // width: "25%",
                                maxWidth: {
                                    lg: "30%",
                                    md: "25%",
                                    sm: "100%"
                                }
                            },

                        }}>

                            <DialogTitle variant="h5" className={classes.textTypo} style={{ fontWeight: "bold" }}>AJOUTER VISITEUR</DialogTitle>
                            <div style={{ borderTop: " 4px solid #FF6600", width: "20%", }} />
                            <DialogContent>
                                <p>Complétez le formulaire. Les champs marqué par
                                    <span style={{ color: 'red' }}>*</span>  sont <span style={{ color: 'red' }}> obligatoires </span></p>
                                <Grid>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Type de Pièce<span style={{ color: 'red' }}>*</span> </label>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder="typePiece"
                                            onChange={(event) => {
                                                setFormErrors({ ...formErrors, promo: null })
                                                setValues({ ...values, typePiece: event.target.value })
                                            }}
                                            name="typePiece"
                                            value={values.typePiece}
                                        >
                                            <MenuItem key="1" value="CNI"> CNI </MenuItem>
                                            <MenuItem key="2" value="PassPort"> PassPort </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.typePiece}</p>
                                </Grid>
                                <Grid mt={2}>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>N° de pièce<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="numPiece"
                                            type="text"
                                            size='small'
                                            variant="outlined"
                                            placeholder="Ex:numPiece"
                                            onChange={(event) => {
                                                setValues({ ...values, numPiece: event.target.value })
                                            }}
                                            value={values.numPiece}
                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.numPiece}</p>
                                </Grid>
                                <Grid mt={2}>
                                    <FormControl fullWidth>
                                        <label className={classes.labelText}>Prénom<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="prenom"
                                            type="text"
                                            size='small'
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
                                            size='small'
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
                                        <label className={classes.labelText}>Téléphone<span style={{ color: 'red' }}> *</span> </label>
                                        <OutlinedInput
                                            id="telephone"
                                            type="text"
                                            size='small'
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
                                    size="small"
                                    sx={{
                                        backgroundColor: "#FF6600",
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
                                        backgroundColor: "#000000",
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



                    {/* Dialogue pour commenntaire */}
                    <div>
                        <Dialog open={showDialog} onClose={handleClose}
                            PaperProps={{
                                style: {
                                    backgroundColor: ' #000000',
                                    boxShadow: 'none',
                                    height: "85%",
                                    left: '40%'
                                },
                            }} className={classes.dialog}>
                            <DialogTitle variant="h4" className={classes.textTypo} style={{ color: "#FFFFFF", paddingLeft: "20px" }}>
                                COMMENTAIRE
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        float: 'right'
                                    }}
                                    style={{ color: '#FFFFFF' }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <hr style={{ borderTop: " 4px solid #F48322", width: "20%", float: "left", marginLeft: "15px" }} />
                            <DialogContent>
                                <Grid container
                                    onScroll={loadMoreItems}
                                    style={{
                                        maxHeight: 950,
                                        overflowY: 'auto',
                                    }}
                                >
                                    {(localStorage.getItem('user') === '["ADMIN"]') ?
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={15}
                                            placeholder="comment"
                                            style={{ width: 300, borderRadius: '5px' }}
                                            onChange={(event) => {
                                                setComment({ ...comment, commentaire: event.target.value })
                                            }}
                                            value={comment.commentaire}
                                        /> :
                                        <div>
                                            {
                                                commentsApp.map((row) => (
                                                    <Typography key={row.id} variant='h6' style={{ color: 'white' }}>
                                                        {row.commentaire}
                                                    </Typography>
                                                ))
                                            }
                                        </div>
                                    }
                                </Grid>
                                {(localStorage.getItem('user') === '["ADMIN"]') ?
                                    <DialogActions>
                                        <Button
                                            sx={{
                                                backgroundColor: "#FF6600",
                                                fontFamily: "Arial",
                                                fontSize: "16px",
                                                color: "#000000",
                                                fontWeight: "bold",
                                                right: "80px",
                                                marginTop: "15px",
                                                '&:hover': {
                                                    backgroundColor: "#FFFFFF",
                                                    pointer: "cursor",
                                                    color: "#000000"
                                                }
                                            }}
                                            onClick={commenter}
                                        >
                                            COMMENTER
                                        </Button>
                                    </DialogActions> : null
                                }
                            </DialogContent>
                        </Dialog>
                    </div>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Visites;
