import {Box, Button, OutlinedInput, Pagination, PaginationItem} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import Layout from "../layout/Layout";
import Grid from '@material-ui/core/Grid';
import Swal from "sweetalert2";


import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import {FormControl, Typography} from "@material-ui/core";
import ReferentielStyle from './ReferentielStyle';
import { ListAllReferentiel, AddReferentiel, UpdateReferentiel } from './ReferentielService';


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


export const Referentiel = () => {

    const [loading, setLoading] = React.useState(true);
    const [referentiels, setReferentiels] = React.useState([]);
    const [referentiel, setReferentiel] = React.useState(
        { libelle: "" }
    );

    const isBlank = require('is-blank')

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
            field: 'id',
            headerClassName: 'super-app-theme--header',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'libelle',
            headerClassName: 'super-app-theme--header',
            headerName: 'Référentiel',
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
                            setReferentiel({ ...referentiel, libelle: event.target.value })
                        }}
                        value={referentiel.libelle === "" ? params.value : referentiel.libelle}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                updateReferentiels(referentiel, params.id)
                            }
                        }}
                    />
                </FormControl>
            )
        }
    ]
    const classes = ReferentielStyle();
    const [formErrors, setFormErrors] = useState({});
    const [setErrorPage] = useState(false);

    const validateRef = (val) => {
        const errors = {};
        if (isBlank(val.libelle)) {
            errors.libelle = "Le libelle est requis"
        }
        return errors;
    }

    React.useEffect(() => {
        ListAllReferentiel().then(response => {
            setReferentiels(response.data);
            setLoading(false);
        });
    }, []
    );


    const handleSubmit = (event) => {
      var valide = true;
      setFormErrors(validateRef(referentiel))
      if (validateRef(referentiel).libelle) {
        valide = false;
      }
      if (valide) {
        if (Object.keys(validateRef(referentiel)).length === 0)
        AddReferentiel(referentiel).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'Succes!',
                    'Enregistrer avec succes.',
                    'success'
                ).then(() => {
                    setReferentiel({
                        libelle: '',
                    })
                })
              setLoading(true);
              ListAllReferentiel().then(res => {
                setReferentiels(res.data);
                setLoading(false);
              })
            }

            })
        }
    };

    const updateReferentiels = (promo, id) => {
        setLoading(true)
        UpdateReferentiel(promo, id).then(() => {
            ListAllReferentiel().then(res => {
                setReferentiels(res.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Modifier avec success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        })
        setLoading(false)
    }

    return (
        <Layout>
            <Grid className={classes.structurePage}>

                <Grid className={classes.structureDiv}>
                    <Box sx={{
                        '& .super-app-theme--header': {
                            backgroundColor: '#696969',
                            color: "#FFFFFF",
                            textTransform: "uppercase",
                            fontWeight: "bolder"
                        },
                    }}
                        className={classes.contentDiv}
                    >


                        <Typography
                            variant='h5'
                            style={{
                                marginBottom: "20px",
                                borderLeft: "6px solid #000000",
                                color: "#000000",
                                paddingLeft: "20px",
                                fontWeight: "bolder"
                            }}>
                            LISTE DES REFERENTIELS
                        </Typography>
                                <DataGrid
                                    style={localStorage.getItem('user') === '["SUPER_ADMIN"]' ? { width: '100%' } : { width: '200%' }}
                                    onCellEditCommit={updateReferentiels}
                                    sx={{ boxShadow: "30px" }}
                                    autoHeight
                                    pageSize={6}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    components={{
                                        Pagination: CustomPagination,
                                        NoRowsOverlay: CustomNoRowsOverlay,

                                    }}
                                    loading={loading}
                                    rows={referentiels}
                                    columns={columns}
                                />
                    </Box>
                    <Box className={classes.contentDiv}>
                        {
                            (localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                                <Typography
                                    variant='h5'
                                    style={{
                                        marginBottom: "20px",
                                        borderLeft: "6px solid #000000",
                                        color: "#000000",
                                        paddingLeft: "20px",
                                        fontWeight: "bolder"
                                    }}>
                                    AJOUTER REFERENTIEL
                                </Typography>
                                : null
                        }
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>
                            </Grid>
                        </Grid>
                        {(localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                                <TextField
                                    id="libelle"
                                    name="libelle"
                                    type="text"
                                    value={referentiel.libelle}
                                    variant="outlined"
                                    placeholder="libelle"
                                    onChange={(event) => {
                                        setFormErrors({ ...formErrors, libelle: null })
                                        setReferentiel({ ...referentiel, libelle: event.target.value })
                                    }}

                                    style={{ width: "100%", marginBottom: "20px" }}
                                /> : null
                        }
                        <p style={{ color: 'red' }}>{formErrors.libelle}</p>
                        <div style={{}}>
                            {(localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                                    <Button onClick={handleSubmit}
                                            disabled={referentiel.libelle === ''}
                                            variant="contained"
                                            sx={{
                                                margin: 'auto', display: "flex",
                                                backgroundColor: '#FF6600',
                                                color: "#000000",
                                                fontWeight: "bolder",
                                                '&:hover': {
                                                    backgroundColor: '#000000',
                                                    color: "#FFFFFF"
                                                }
                                            }}
                                    >
                                        AJOUTER
                                    </Button> : null
                            }

                        </div>

                    </Box>
                </Grid>

            </Grid>

        </Layout>
    )
}

export default Referentiel;
