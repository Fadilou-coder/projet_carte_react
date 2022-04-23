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
                    console.log(params);
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
                            LISTE DES Appareils
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
                            AJOUTER DES APPAREIL
                        </Typography>


                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>
                            </Grid>
                        </Grid>
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
                        />

                        <div style={{}}>
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
                            </Button>

                        </div>

                    </Box>
                </Grid>

            </Grid>

        </Layout>
    )
}

export default Device;