/* eslint-disable array-callback-return */
import { Box, Button, OutlinedInput } from '@mui/material';
import React from 'react'
import Layout from "../layout/Layout";
import { AddCircleOutlined } from '@mui/icons-material';
import { InputAdornment, Pagination, PaginationItem } from '@mui/material';
import AdminStyle from "./AdminStyle";
import { useHistory } from "react-router-dom";
import { FormControl, Typography } from '@material-ui/core';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';

import Checkbox from '@mui/material/Checkbox';
import { ListAllAdmin, BloquerAdmin, DebloquerAdmin } from './AdminService';
import Swal from "sweetalert2";
import { SearchOutlined } from '@mui/icons-material';


export const Admin = () => {

    const [admins, setAdmin] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(true);

    React.useEffect(() => {
        ListAllAdmin().then(res => {
            setAdmin(res.data);
            setIsLoaded(false);
        })
    }, []);

    let history = useHistory();

    function RedirectAddAdmin() {
        history.push("/add_admin");
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

    const bloquerAdmin = (id, bloqued) => {
        if (!bloqued) {
            Swal.fire({
                title: 'Attention?',
                text: "Voulez vraiment bloquer cet admin",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui!',
                cancelButtonText: 'Non'
            }).then((result) => {
                if (result.isConfirmed) {
                    BloquerAdmin(id).then(() => {
                        Swal.fire(
                            'Succes!',
                            'Bloquer avec succes.',
                            'success'
                        ).then((res) => {
                            setIsLoaded(true);
                            ListAllAdmin().then(res => {
                                setAdmin(res.data);
                                setIsLoaded(false);
                            })
                        })
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Attention?',
                text: "Voulez vraiment débloquer cet admin",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui!',
                cancelButtonText: 'Non'
            }).then((result) => {
                if (result.isConfirmed) {
                    DebloquerAdmin(id).then(() => {
                        Swal.fire(
                            'Succes!',
                            'Admin débloquer avec succes.',
                            'success'
                        ).then((res) => {
                            setIsLoaded(true);
                            ListAllAdmin().then(res => {
                                setAdmin(res.data);
                                setIsLoaded(false);
                            })
                        })
                    })
                }
            })
        }

    }


    const columns = [
        {
            field: 'prenom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Prenom',
            editable: true,
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            editable: true,
            flex: 1,
            minWidth: 150,

        },
        {
            field: 'email',
            headerClassName: 'super-app-theme--header',
            headerName: 'Email',
            editable: true,
            minWidth: 150,
            flex: 1
        },
        {
            field: 'phone',
            headerClassName: 'super-app-theme--header',
            headerName: 'Téléphone',
            editable: true,
            minWidth: 150,
            flex: 1
        },
        {
            field: 'numPiece',
            headerClassName: 'super-app-theme--header',
            headerName: 'Numéro Pièce',
            editable: true,
            minWidth: 150,
            flex: 1
        },
        {
            field: 'blocked',
            headerClassName: 'super-app-theme--header',
            headerName: 'Blocked ?',
            editable: true,
            flex: 1,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return <Checkbox onClick={() => bloquerAdmin(params.id, params.row.isbloqued)} checked={params.row.isbloqued} />;
            }
        },
    ]


    const classes = AdminStyle();
    return (
        <Layout>
            <Typography variant='h5'
                style={{
                    marginBottom: "20px",
                    borderLeft: "6px solid #000000",
                    color: "#000000",
                    paddingLeft: "20px",
                    fontWeight: "bolder"
                }}>
                LISTE DES ADMINISTRATEURS
            </Typography>

            <Box sx={{}} className={classes.visitePage} >

                <Box style={{ width: "100%" }}>
                    <Box
                        className={classes.filtre}
                    >

                        <div className={classes.champfiltre}>


                            <div className={classes.mysearch}>
                                <FormControl className={classes.mytextsearch}>
                                    <OutlinedInput
                                        size='small'
                                        id="email"
                                        placeholder="rechercher"
                                        style={{ fontWeight: "bolder", color: "#000000" }}
                                        className={classes.mysearch}
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
                        </div>

                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                endIcon={<AddCircleOutlined />}
                                onClick={RedirectAddAdmin}
                                sx={{
                                    backgroundColor: "#FF6600",
                                    color: "#000000",
                                    fontFamily: "Arial",
                                    fontSize: "16px",
                                    fontWeight: "bolder",
                                    marginBottom: "10px",
                                    '&:hover': {
                                        backgroundColor: "#000000",
                                        color: "#FFFFFF",
                                        pointer: "cursor"
                                    }
                                }}
                            >
                                Ajouter
                            </Button>
                        </Box>
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

                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" }}

                                autoHeight
                                pageSize={10}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Pagination: CustomPagination,
                                    // Toolbar: CustomToolbar,
                                }}
                                loading={isLoaded}
                                rows={
                                    admins.filter((val) => {
                                        if (search === "") {
                                            return val;
                                        } else if (val.prenom.toLowerCase().includes(search.toLowerCase()) || val.nom.toLowerCase().includes(search.toLowerCase())
                                            || val.email.toLowerCase().includes(search.toLowerCase()) || val.phone.toLowerCase().includes(search.toLowerCase())
                                            || val.numPiece.toLowerCase().includes(search.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((row) => {
                                        return row;
                                    })
                                }
                                columns={columns}
                                disableVirtualization
                            />
                        </div>

                    </Box>

                </Box>
            </Box>

        </Layout>
    )
}

export default Admin;
