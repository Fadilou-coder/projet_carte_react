import { Box, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react'
import Layout from "../layout/Layout";
import DeviceStyle from "./DeviceStyle";
import Grid from '@material-ui/core/Grid';
import Swal from "sweetalert2";


import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { AddDevice, BloquerDevice, ListAllDevice } from "./DeviceService";
import { Typography } from "@material-ui/core";



export const Device = () => {

    const [device, setDevice] = React.useState([]);
    const [newDevice, setNewDevice] = React.useState({ macAdress: '' });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        ListAllDevice().then(response => {
            setDevice(response.data);
            setLoading(false);
        });
    }, []
    );
    function AddNewDevice() {
        AddDevice(newDevice).then(() => {
            setLoading(true);
            ListAllDevice().then(response => {
                setDevice(response.data);
                setLoading(false);
            })
            setNewDevice({ macAdress: '' });
        });
    }

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

    function BloquerDeviceById(id) {
            Swal.fire({
                title: 'Attention!!!',
                text: "voulez vous vraiment bloquer cette Device!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'oui!',
                cancelButtonText: 'Non!',
            }).then((result) => {
                if (result.isConfirmed) {
                    BloquerDevice(id).then(() => {
                        setLoading(true);
                        ListAllDevice().then(response => {
                            setDevice(response.data);
                            setLoading(false);
                        })
                    })
                }
            })

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
            field: 'macAdress',
            headerClassName: 'super-app-theme--header',
            headerName: 'ID Appareil',
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
                    return <Button variant="contained" sx={{
                        backgroundColor: '#FF6600',
                        color: "#000000",
                        fontWeight: "bolder",
                        '&:hover': {
                            backgroundColor: '#000000',
                            color: "#FFFFFF"
                        }
                    }}
                        onClick={() => BloquerDeviceById(params.row.macAdress)}>Bloquer</Button>;
            }
        },


    ]
    const classes = DeviceStyle();
    return (
        <Layout>
            <Grid className={classes.DevicePage}>

                <Grid className={classes.DeviceDiv}>
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
                            LISTE DES APPAREILS
                        </Typography>


                        <DataGrid
                            style={localStorage.getItem('user') === '["SUPER_ADMIN"]' ? { width: '100%' } : { width: '200%' }}
                            sx={{ boxShadow: "30px" }}
                            autoHeight
                            pageSize={6}
                            rowsPerPageOptions={[5, 10, 20]}
                            components={{
                                Pagination: CustomPagination,
                                NoRowsOverlay: CustomNoRowsOverlay,

                            }}
                            loading={loading}
                            rows={device}
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
                            AJOUTER DES APPAREILS
                        </Typography>


                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>
                            </Grid>
                        </Grid>
                        {
                            (localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                                <TextField
                                    id="outlined-basic"
                                    label="Id Appareil"
                                    variant="outlined"
                                    style={{ width: "100%", marginBottom: "20px" }}
                                    value={newDevice.macAdress}
                                    onChange={(event) => setNewDevice({
                                        ...newDevice,
                                        macAdress: event.target.value
                                    })}
                                /> : null
                        }
                        <div style={{}}>
                            {
                                (localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                                    <Button
                                        disabled={newDevice.macAdress === ''}
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
                                        onClick={AddNewDevice}>
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

export default Device;
