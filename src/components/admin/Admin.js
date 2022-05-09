/* eslint-disable array-callback-return */
import { Box, Button, Grid, OutlinedInput } from '@mui/material';
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
import { ListAllAdmin, BloquerAdmin, DebloquerAdmin, updateFieldAdmin } from './AdminService';
import Swal from "sweetalert2";
import { SearchOutlined } from '@mui/icons-material';


export const Admin = () => {

    const [admins, setAdmins] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [admin, setAdmin] = React.useState({
      prenom: "",
      nom: "",
      email: "",
      phone: "",
      numPiece: "",
      addresse: ""
    });
    React.useEffect(() => {
        ListAllAdmin().then(res => {
            setAdmins(res.data);
            setIsLoaded(false);
        })
    }, []);

    let history = useHistory();

    function RedirectAddAdmin() {
        history.push("/add_admin");
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
                                setAdmins(res.data);
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
                                setAdmins(res.data);
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
            renderEditCell: (params) => (
              <FormControl fullWidth>
                <OutlinedInput
                        id="ok"
                        name="prenom"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setAdmin({ ...admin, prenom: event.target.value })
                        }}
                        value={admin.prenom === "" ? params.value : admin.prenom}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateAdmin(admin, params.id)
                          }
                        }}
                      />
              </FormControl>
            )
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            editable: true,
            flex: 1,
            minWidth: 150,
            renderEditCell: (params) => (
              <FormControl fullWidth>
                <OutlinedInput
                        id="ok"
                        name="nom"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setAdmin({ ...admin, nom: event.target.value })
                        }}
                        value={admin.nom === "" ? params.value : admin.nom}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateAdmin(admin, params.id)
                          }
                        }}
                      />
              </FormControl>
            )

        },
        {
            field: 'email',
            headerClassName: 'super-app-theme--header',
            headerName: 'Email',
            editable: true,
            minWidth: 150,
            flex: 1,
            renderEditCell: (params) => (
              <FormControl fullWidth>
                <OutlinedInput
                        id="ok"
                        name="email"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setAdmin({ ...admin, email: event.target.value })
                        }}
                        value={admin.email === "" ? params.value : admin.email}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateAdmin(admin, params.id)
                          }
                        }}
                      />
              </FormControl>
            )
        },
        {
            field: 'phone',
            headerClassName: 'super-app-theme--header',
            headerName: 'Téléphone',
            editable: true,
            minWidth: 150,
            flex: 1,
            renderEditCell: (params) => (
              <FormControl fullWidth>
                <OutlinedInput
                        id="ok"
                        name="phone"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setAdmin({ ...admin, phone: event.target.value })
                        }}
                        value={admin.phone === "" ? params.value : admin.phone}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateAdmin(admin, params.id)
                          }
                        }}
                      />
              </FormControl>
            )
        },
        {
            field: 'numPiece',
            headerClassName: 'super-app-theme--header',
            headerName: 'Numéro Pièce',
            editable: true,
            minWidth: 150,
            flex: 1,
            renderEditCell: (params) => (
              <FormControl fullWidth>
                <OutlinedInput
                        id="ok"
                        name="numPiece"
                        required
                        type="text"
                        variant="outlined"
                        onChange={(event) => {
                            setAdmin({ ...admin, numPiece: event.target.value })
                        }}
                        value={admin.numPiece === "" ? params.value : admin.numPiece}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateAdmin(admin, params.id)
                          }
                        }}
                      />
              </FormControl>
            )
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

    const updateAdmin = (admin, id) => {
        setIsLoaded(true)
        console.log(admin)
        updateFieldAdmin(admin, id).then(() => {
          ListAllAdmin().then(res => {
            setAdmins(res.data);
          })
        })
        setIsLoaded(false)
    }


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
                                    NoRowsOverlay: CustomNoRowsOverlay,

                                    // Toolbar: CustomToolbar,
                                }}
                                loading={isLoaded}
                                rows={
                                    admins.filter((val) => {
                                        if (search === "") {
                                            return val;
                                        } else if (val.email.toLowerCase().includes(search.toLowerCase()) || val.nom.toLowerCase().includes(search.toLowerCase())
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
                                // onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {

                               // }}
                               onCellValueChanged = {(params) => updateAdmin(params)}
                            />
                        </div>

                    </Box>

                </Box>
            </Box>

        </Layout>
    )
}

export default Admin;
