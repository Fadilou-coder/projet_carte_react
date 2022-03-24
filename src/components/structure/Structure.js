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
    React.useEffect(() => {
        ListAllStructure().then(response => { setStructure(response.data) })
    }, []
    );
    function AddStructure() {
        Addstructure(nomStructure).then(response => {
            ListAllStructure().then(response => { setStructure(response.data) })
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
                        ListAllStructure().then(response => { setStructure(response.data) })
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
                        ListAllStructure().then(response => { setStructure(response.data) })
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
                    return <Button variant="contained" style={{ backgroundColor: '#E9967A' }} onClick={() => BloquerSstructure(params.id, params.row.isBlocked)}>Bloquer</Button>;
                else
                    return <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={() => BloquerSstructure(params.id, params.row.isBlocked)}>Debloquer</Button>;
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
                            backgroundColor: '#44C3CF',
                        },
                    }}
                        className={classes.contentDiv}
                    >


                        <Typography
                            variant='h5'
                            style={{
                                marginBottom: "20px",
                                borderLeft: "6px solid gray",
                                color: "gray",
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
                                borderLeft: "6px solid gray",
                                color: "gray",
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
                                style={{ margin: 'auto', display: "flex", backgroundColor: '#44C3CF' }}
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