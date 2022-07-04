import React from 'react';
import Typography from "@mui/material/Typography";
import Layout from "../layout/Layout";
import {
    Box,
    Button,
    InputAdornment,
    OutlinedInput,
    Pagination,
    PaginationItem,
} from "@mui/material";
import AdminStyle from "../admin/AdminStyle";
import {FormControl} from "@material-ui/core";
import {
    AddCircleOutlined,
    SearchOutlined
} from "@mui/icons-material";
import {DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector} from "@mui/x-data-grid";
import {useHistory} from "react-router-dom";
import {ListAllSuperViseur, editSuperViseur} from "./SuperviseurService";
import Swal from "sweetalert2";

const Superviseur = () => {

    const [admins, setAdmin] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [superviseur, setSuperviseur] = React.useState({
      prenom: "",
      nom: "",
      email: "",
      phone: "",
      numPiece: "",
      addresse: "",
      password: ""
    });
    React.useEffect(() => {
        ListAllSuperViseur().then(res => {
            setAdmin(res.data);
            setIsLoaded(false);
        })
    }, []);

    let history = useHistory();

    function RedirectAddAdmin() {
        history.push("/add_superviseurs");
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

    const updateSuperviseur = (data, id) => {
      setIsLoaded(true)
      editSuperViseur(data, id).then(() => {
        ListAllSuperViseur().then(res => {
          setAdmin(res.data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Modifier avec success',
                showConfirmButton: false,
                timer: 1500
            })
        })
      })
      setIsLoaded(false);
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
                          setSuperviseur({ ...superviseur, prenom: event.target.value })
                        }}
                        value={superviseur.prenom === "" ? params.value : superviseur.prenom}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateSuperviseur(superviseur, params.id)
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
                          setSuperviseur({ ...superviseur, nom: event.target.value })
                        }}
                        value={superviseur.nom === "" ? params.value : superviseur.nom}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateSuperviseur(superviseur, params.id)
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
                          setSuperviseur({ ...superviseur, email: event.target.value })
                        }}
                        value={superviseur.email === "" ? params.value : superviseur.email}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateSuperviseur(superviseur, params.id)
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
                          setSuperviseur({ ...superviseur, phone: event.target.value })
                        }}
                        value={superviseur.phone === "" ? params.value : superviseur.phone}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateSuperviseur(superviseur, params.id)
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
                          setSuperviseur({ ...superviseur, numPiece: event.target.value })
                        }}
                        value={superviseur.numPiece === "" ? params.value : superviseur.numPiece}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            updateSuperviseur(superviseur, params.id)
                          }
                        }}
                      />
              </FormControl>
            )
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
                LISTE SUPERVISEUR
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
                            {
                                (localStorage.getItem('user') === '["SUPER_ADMIN]') ?
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
                                    </Button> : null
                            }
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
                                    admins.filter(function(val) {
                                        if (search === "") {
                                            return val;
                                        } else if (val.prenom.toLowerCase().includes(search.toLowerCase()) || val.nom.toLowerCase().includes(search.toLowerCase())
                                            || val.email.toLowerCase().includes(search.toLowerCase()) || val.numPiece.toLowerCase().includes(search.toLowerCase())
                                            || val.numPiece.toLowerCase().includes(search.toLowerCase())) {
                                            return val;
                                        }
                                        return val;
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

export default Superviseur
