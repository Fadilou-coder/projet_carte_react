import { Box, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react'
import Layout from "../layout/Layout";
import StructureStyle from "./StructureStyle";
import Grid from '@material-ui/core/Grid';
import Swal from "sweetalert2";


import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { Addstructure, Bloquerstructure, ListAllStructure, DebloquerStructure } from "./StructureService";
import { Typography } from "@material-ui/core";



export const Structure = () => {

    const [structure, setStructure] = React.useState([]);
    const [nomStructure, setNomStructure] = React.useState({ nomStructure: '' });
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
        ListAllStructure().then(response => {
            setStructure(response.data);
            setLoading(false);
        });
    }, []
    );
    function AddStructure() {
        Addstructure(nomStructure).then(response => {
            setLoading(true);
            ListAllStructure().then(response => {
                setStructure(response.data);
                setLoading(false);
            })
            setNomStructure({ nomStructure: '' });
        });
    }


    function BloquerSstructure(id, blocked) {
        if (!blocked) {
            Swal.fire({
                title: 'Attention!!!',
                text: "voulez vous vraiment bloquer cette structure!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'oui!',
                cancelButtonText: 'Non!',
            }).then((result) => {
                if (result.isConfirmed) {
                    Bloquerstructure(id).then(() => {
                        setLoading(true);
                        ListAllStructure().then(response => {
                            setStructure(response.data);
                            setLoading(false);
                        })
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Attention!!!',
                text: "voulez vous vraiment débloquer cette structure!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'oui!',
                cancelButtonText: 'Non!',
            }).then((result) => {
                if (result.isConfirmed) {
                    DebloquerStructure(id).then(() => {
                        setLoading(true);
                        ListAllStructure().then(response => {
                            setStructure(response.data);
                            setLoading(false);
                        })
                    })
                }
            })
        }

    }



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
            field: 'nomStructure',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom Stucture',
            flex: 1
        },
        {
            field: 'blocked',
            headerClassName: 'super-app-theme--header',
            headerName: 'Blocked ?',
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
                        onClick={() => BloquerSstructure(params.id, params.row.isBlocked)}>Bloquer</Button>;
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
                        }} onClick={() => BloquerSstructure(params.id, params.row.isBlocked)}>Debloquer</Button>;
            }
        },


    ]
    const classes = StructureStyle();
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
                            LISTE DES STRUCTURES
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
                            rows={structure}
                            columns={columns}
                        />

                    </Box>
                    <Box
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
                            AJOUTER DES STRUCTURES
                        </Typography>


                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>
                            </Grid>
                        </Grid>
                        <TextField
                            id="outlined-basic"
                            label="Nom structure"
                            variant="outlined"
                            style={{ width: "100%", marginBottom: "20px" }}
                            value={nomStructure.nomStructure}
                            onChange={(event) => setNomStructure({
                                ...nomStructure,
                                nomStructure: event.target.value
                            })}
                        />

                        <div style={{}}>
                            <Button
                                disabled={nomStructure.nomStructure === ''}
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
                                onClick={AddStructure}>
                                AJOUTER
                            </Button>

                        </div>

                    </Box>
                </Grid>

            </Grid>

        </Layout>
    )
}

export default Structure;