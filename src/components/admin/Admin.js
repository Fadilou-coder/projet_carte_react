import {Box, Button, Stack, OutlinedInput, TableCell} from '@mui/material';
import React from 'react'
import Layout from "../layout/Layout";
import { FilterAltOutlined, Notes, AddCircleOutlined } from '@mui/icons-material';
import { InputAdornment, MenuItem, Select, Pagination, PaginationItem } from '@mui/material';
import VisiteStyle from "../visites/VisiteStyle";
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

    const [structure, setStructure] = React.useState("FadiloU Agency Security");

    const [admins, setAdmin] = React.useState([]);
    const [search, setSearch] = React.useState('');


    React.useEffect(() => {
        ListAllAdmin().then(res => {
            setAdmin(res.data);
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
                            ListAllAdmin().then(res => {
                                setAdmin(res.data);
                            })
                        })
                    })
                }
            })
        }else{
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
                            ListAllAdmin().then(res => {
                                setAdmin(res.data);
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
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            editable: true,
            flex: 1
        },
        {
            field: 'email',
            headerClassName: 'super-app-theme--header',
            headerName: 'Email',
            editable: true,
            flex: 1
        },
        {
            field: 'phone',
            headerClassName: 'super-app-theme--header',
            headerName: 'Téléphone',
            editable: true,
            flex: 1
        },
        {
            field: 'cni',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cni',
            editable: true,
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
                return <Checkbox onClick={() => bloquerAdmin(params.id)} checked={params.row.isbloqued} />;
            }
        },


    ]


    // Pour cocher les cases dont  la valeur blocked est egale à true
    //     const [selectionModel, setSelectionModel] = React.useState(() =>
    //     data.filter((r) => r.blocked = true).map((r) => r.id),
    //   );


    const classes = VisiteStyle();
    return (
        <Layout>
            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                LISTE DES ADMINISTRATEURS
            </Typography>

            <Box sx={{}} className={classes.visitePage} >

                <Box style={{ width: "100%" }}>
                    {/* Gestion de l'entete de la liste des Reservations */}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"

                    }} spacing={2}
                    >

                        <Stack
                            direction="row"
                            spacing={5}
                            justifyContent="center"
                            alignItems="center"
                            marginBottom={4}

                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                color: "gray"
                            }}
                            >
                                <FilterAltOutlined></FilterAltOutlined>
                                Filtre
                            </div>


                            <div>
                                <Select
                                    value={structure}
                                    style={{ width: "12vw", fontWeight: "bolder", color: "#787486", borderRadius: "10px" }}
                                    onChange={(event) => setStructure(event.target.value)}
                                    className={classes.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Notes sx={{ color: "#44C3CF" }} ></Notes>
                                        </InputAdornment>}

                                >
                                    <MenuItem value="">
                                        <em>Tous</em>
                                    </MenuItem>
                                    <MenuItem value={"fadilou"}> Fadilou Agency Security </MenuItem>
                                    <MenuItem value={"cbag"}> Cbag Securité </MenuItem>
                                </Select>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1 }} className={classes.mysearch}>
                                    <OutlinedInput
                                        id="email"
                                        placeholder="rechercher"
                                        style={{ fontWeight: "bolder", color: "#787486"}}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchOutlined></SearchOutlined>
                                            </InputAdornment>
                                        }
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                        }}

                                    />
                                </FormControl>
                            </div>

                        </Stack>

                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                endIcon={<AddCircleOutlined />}
                                onClick={RedirectAddAdmin}
                                sx={{
                                    backgroundColor: "#05888A",
                                    fontFamily: "Arial", fontSize: "20px",
                                    '&:hover': {
                                        backgroundColor: "#F48322",
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
                            backgroundColor: '#44C3CF'
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

                                 rows={
                                admins.filter((val) => {
                                    if(search === ""){
                                        return val;
                                    } else if (val.prenom.toLowerCase().includes(search.toLowerCase()) || val.nom.toLowerCase().includes(search.toLowerCase())
                                        || val.email.toLowerCase().includes(search.toLowerCase()) || val.phone.toLowerCase().includes(search.toLowerCase())
                                        || val.cni.toLowerCase().includes(search.toLowerCase())){
                                        return val;
                                    }
                                }).map((row) => {
                                     return row;
                                })
                            }
                                columns={columns}
                                disableVirtualization
                            >
                            </DataGrid>
                        </div>

                    </Box>

                </Box>
            </Box>

        </Layout>
    )
}

export default Admin;
