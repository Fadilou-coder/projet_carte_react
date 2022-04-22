import { Box, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react'
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
import { Typography } from "@material-ui/core";
import ReferentielStyle from './ReferentielStyle';
import { ListAllReferentiel, AddReferentiel } from './ReferentielService';



export const Referentiel = () => {

    const [loading, setLoading] = React.useState(true);
    const [referentiel, setReferentiel] = React.useState({ libelle: '' });

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
            flex: 1
        },
        {
            field: 'libelle',
            headerClassName: 'super-app-theme--header',
            headerName: 'Référentiel',
            flex: 1
        },
        {
            field: 'bloquer',
            headerClassName: 'super-app-theme--header',
            headerName: 'Bloqué ?',
            editable: true,
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                if (!params.row.isBlocked)
                    return <Button variant="contained" sx={{
                        backgroundColor: '#FF6600',
                        color: "#000000",
                        fontWeight: "bolder",
                        '&:hover': {
                            backgroundColor: '#000000',
                            color: "#FFFFFF"
                        }
                    }}
                    >Bloquer</Button>;
                else
                    return <Button variant="contained"
                        sx={{
                            backgroundColor: '#000000',
                            color: "white",
                            fontWeight: "bolder",
                            '&:hover': {
                                backgroundColor: '#FF6600',
                                color: "#FFFFFF"
                            }
                        }}>Debloquer</Button>;
            }
        },


    ]
    const classes = ReferentielStyle();
    const [formErrors, setFormErrors] = useState({});
    const [setErrorPage] = useState(false);

    const validateRef = (val) => {
        const errors = {};
        if (!val.libelle) {
            errors.libelle = "Le libelle est requis"
        } 
        return errors;
    }

    React.useEffect(() => {
        ListAllReferentiel().then(response => {
            console.log(response.data);
            setReferentiel(response.data);
            setLoading(false);
        });
    }, []
    );


    const handleSubmit = (event) => {
        
        setFormErrors(validateRef(referentiel))
            event.preventDefault();
         
            AddReferentiel(referentiel).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'Succes!',
                    'Enregistrer avec succes.',
                    'success'
                ).then((res) => {
                    setReferentiel({
                        libelle: '',
                    }) 
                })
            } 
            setLoading(true);
            }).catch(
                (error) => {
                    setErrorPage(true);
                    console.log(error);
                }
            ) 
    };
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

                            sx={{ boxShadow: "30px", width: "100%", }}

                            autoHeight
                            pageSize={6}
                            rowsPerPageOptions={[5, 10, 20]}
                            components={{
                                Pagination: CustomPagination,
                            }}
                            loading={loading}
                            rows={referentiel}
                            columns={columns}
                        />

                    </Box>
                    <Box className={classes.contentDiv}>
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


                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>
                            </Grid>
                        </Grid>
                        <TextField
                            id="libelle"
                            name="libelle"
                            type="text"
                            value={referentiel.libelle}
                            variant="outlined"
                            placeholder="libelle"
                            onChange={(event) => {
                                setFormErrors({...formErrors, libelle: null})
                                setReferentiel({ ...referentiel, libelle: event.target.value })
                            }}
                                           
                            style={{ width: "100%", marginBottom: "20px" }}
                        />
                        <p style={{color: 'red'}}>{formErrors.libelle}</p>
                        <div style={{}}>
                            <Button
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
                                onClick={handleSubmit}
                                >
                                AJOUTER
                            </Button>

                        </div>

                    </Box>
                </Grid>

            </Grid>

        </Layout>
    )
}

export default Referentiel;