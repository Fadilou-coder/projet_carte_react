import { Box, Grid, OutlinedInput, InputAdornment, Button, Pagination, PaginationItem } from '@mui/material'
import React, { useState } from 'react'
import Layout from "../layout/Layout"
import { AddCircleOutlined } from '@mui/icons-material'
import { FormControl, Typography } from "@material-ui/core"
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid'
import "jspdf-autotable"
import { SearchOutlined } from '@mui/icons-material';
import PromoStyle from './PromoStyle'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { ListAllPromo, AddPromo, UpdatePromo } from './PromoService'
import Swal from "sweetalert2";

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


export const Promos = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [promos, setPromos] = React.useState([]);
    const [promo, setPromo] = React.useState(
        {
            libelle: '',
            dateDebut: '',
            dateFin: '',
        }
    );
    // const [showDialog, setShowDialog] = useState(false);
    const [open, setOpen] = React.useState(false)
    const [setSearch] = React.useState('');

    React.useEffect(() => {
            ListAllPromo().then(response => {
                setPromos(response.data);
                setIsLoading(false);
            });
        }, []);


    const handleSubmit = (event) => {
        setFormErrors(validatePromo(promo))
        event.preventDefault();
        AddPromo(promo).then(res => {
            handleClose()
            if (res.status === 200) {
                Swal.fire(
                    'Succes!',
                    'Enregistrer avec succes.',
                    'success'
                ).then((res) => {
                    setPromos({
                        libelle: '',
                        dateDebut: '',
                        dateFin: '',
                    })
                })
            }
            setIsLoading(true);
        }).catch(
            (error) => {
                setErrorPage(true);
                console.log(error);
            }
        )
    };

    const updatePromos = (promo, id) => {
        setIsLoading(true)
        UpdatePromo(promo, id).then(() => {
            ListAllPromo().then(res => {
                setPromos(res.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Modifier avec success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        })
        setIsLoading(false)
    }

    /* const updatePromos = (e)=>{
         if(promo){
             promo.forEach(p => {
                 if(p.id === e.id){
                     var data = {...p, [e.field]: e.value}
                     UpdatePromo(data, data.id).then(res => {
                         if (res.status === 200) {
                             setPromos(res.data);
                             Swal.fire({
                                 position: 'center',
                                 icon: 'success',
                                 title: 'Modifier avec success',
                                 showConfirmButton: false,
                                 timer: 1500
                             })
                         }
                     })
                 }
             });
         }
         setIsLoading(true);
         ListAllPromo().then(response => {
             setPromos(response.data);
             setIsLoading(false);
         });
     }*/

    // Custom Dialog
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        // setShowDialog(false)
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

    const columns = [
      /*  {
            field: 'id',
            headerClassName: 'super-app-theme--header',
            headerName: 'ID',
            flex: 1,
        },*/
        {
            field: 'libelle',
            headerClassName: 'super-app-theme--header',
            headerName: 'Promo',
            flex: 1,
            editable: true,
            renderEditCell: (params) => (
                <FormControl fullWidth>
                    <OutlinedInput
                        id="ok"
                        name="libelle"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setPromo({ ...promo, libelle: event.target.value })
                        }}
                        value={promo.libelle === "" ? params.value : promo.libelle}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                updatePromos(promo, params.id)
                            }
                        }}
                    />
                </FormControl>
            )
        },
        {
            field: 'dateDebut',
            headerClassName: 'super-app-theme--header',
            headerName: 'Date début',
            flex: 1,
            editable: true,
            renderEditCell: (params) => (
                <FormControl fullWidth>
                    <OutlinedInput
                        id="ok"
                        name="dateDebut"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setPromo({ ...promo, dateDebut: event.target.value })
                        }}
                        value={promo.dateDebut === "" ? params.value : promo.dateDebut}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                updatePromos(promo, params.id)
                            }
                        }}
                    />
                </FormControl>
            )
        },
        {
            field: 'dateFin',
            headerClassName: 'super-app-theme--header',
            headerName: 'Date Fin',
            flex: 1,
            editable: true,
            renderEditCell: (params) => (
                <FormControl fullWidth>
                    <OutlinedInput
                        id="ok"
                        name="dateFin"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setPromo({ ...promo, dateFin: event.target.value })
                        }}
                        value={promo.dateFin === "" ? params.value : promo.dateFin}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                updatePromos(promo, params.id)
                            }
                        }}
                    />
                </FormControl>
            )
         }
    ]

    const classes = PromoStyle();
    const [formErrors, setFormErrors] = useState({});
    const [setErrorPage] = useState(false);

    const validatePromo = (val) => {
        const errors = {};
        if (!val.libelle) {
            errors.libelle = "Le libelle est requis"
        }

        if (!val.dateDebut) {
            errors.dateDebut = "Date début est requis"
        }

        if (!val.dateFin) {
            errors.dateFin = "Date fin est requis"
        }
        else if (val.dateFin <= val.dateDebut) {
            errors.dateFin = "Date fin est incorrect"
        }
        return errors;
    };

    return (
        <Layout>
            <Grid style={{ widt: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Grid style={localStorage.getItem('user') === '["ADMIN"]' ? { width: '80%' } : { width: '100%' }}>
                    <Typography variant='h5'
                                style={{
                                    marginBottom: "20px",
                                    borderLeft: "6px solid #000000",
                                    color: "#000000",
                                    paddingLeft: "20px",
                                    fontWeight: "bolder"
                                }}>
                        LISTE DES PROMOTIONS
                    </Typography>
                    <Box style={{ width: "100%" }}>
                        <Box
                            className={classes.SearchAndAdd}
                        >

                            <Grid direction="row" spacing={5} alignItems="center">
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
                            <div>
                                {
                                    (localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                                        <Button
                                            variant="contained"
                                            endIcon={<AddCircleOutlined />}
                                            onClick={handleClickOpen}
                                            className={classes.addBtn}
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
                            </div>
                        </Box>
                        <Box className={classes.tableau}>
                            <div style={{ width: "100%" }}>
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
                                    loading={isLoading}
                                    rows={promos}
                                    columns={columns}
                                    disableVirtualization
                                    onCellEditCommit={updatePromos}
                                />
                            </div>

                        </Box>

                    </Box>


                    <div>
                        <Dialog open={open} onClose={handleClose}>

                            <DialogTitle variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>AJOUTER PROMOTION</DialogTitle>
                            <hr className={classes.lineHr} />
                            <DialogContent>
                                <p>Complétez le formulaire. Les champs marqué par <span style={{ color: 'red' }}>*</span>  sont <span style={{ color: 'red' }}> obligatoires </span></p>
                                <Grid>
                                    <FormControl fullWidth>
                                        <label>Libelle<span style={{ color: 'red' }}>*</span> </label>
                                        <OutlinedInput
                                            id="libelle"
                                            name="libelle"
                                            type="text"
                                            value={promo.libelle}
                                            variant="outlined"
                                            placeholder="libelle"
                                            onChange={(event) => {
                                                setFormErrors({ ...formErrors, libelle: null })
                                                setPromo({ ...promo, libelle: event.target.value})
                                            }}

                                        />
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.libelle}</p>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth>
                                        <label>Date début<span className={classes.formError}>*</span> </label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    name="dateDebut"
                                                    id="dateDebut"
                                                    value={promo.dateDebut}
                                                    onChange={(event) => {
                                                        setFormErrors({ ...formErrors, dateDebut: null })
                                                        setPromo({ ...promo, dateDebut: event })
                                                    }}
                                                    defaultValue={null}
                                                    renderInput={(params) => <TextField {...params} error={formErrors.dateDebut} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.dateDebut}</p>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth>
                                        <label>Date fin<span className={classes.formError}>*</span> </label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    name="dateFin"
                                                    id="dateFin"
                                                    value={promo.dateFin}
                                                    onChange={(event) => {
                                                        setFormErrors({ ...formErrors, dateFin: null })
                                                        setPromo({ ...promo, dateFin: event })
                                                    }}
                                                    defaultValue={null}
                                                    renderInput={(params) => <TextField {...params} error={formErrors.dateFin} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </FormControl>
                                    <p className={classes.formError}>{formErrors.dateFin}</p>
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
                                <Button onClick={handleSubmit}
                                        sx={{
                                            backgroundColor: "#FF6600",
                                            fontFamily: "Arial", fontSize: "20px",
                                            marginTop: "10px",
                                            color: "#FFFFFF",
                                            '&:hover': {
                                                backgroundColor: "#000000",
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

export default Promos;
