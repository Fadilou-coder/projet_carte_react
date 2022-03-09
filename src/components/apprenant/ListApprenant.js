import { DocumentScannerOutlined, FilterAltOutlined, Notes } from '@mui/icons-material';
import { Box, Grid, InputAdornment, MenuItem, Pagination, PaginationItem, Select, Stack, Button } from '@mui/material';

import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import React from 'react'
import Layout from "../layout/Layout";
import VisiteStyle from '../visites/VisiteStyle';
import ListApprenantStyle from "./ListApprenantStyle";

import pp from "../../assets/images/ppuser.png";
import odc from "../../assets/images/odc.jpeg";
import codeqr from "../../assets/images/qrcode.png";

import sacademy from "../../assets/images/logoODC.png";

import { Typography } from '@material-ui/core';


export const ListApprenant = () => {


    const [structure, setStructure] = React.useState("FadiloU Agency Security");

    const classes1 = ListApprenantStyle();


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


    // Tableau Row and Column qu'on a defini ici

    const data = [
        {
            id: 1,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"

        },
        {
            id: 2,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"
        },
        {
            id: 3,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"

        },
        {
            id: 4,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"

        },
        {
            id: 5,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"

        },
        {
            id: 6,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"

        },
        {
            id: 7,
            prenom: "Fadilou",
            nom: "Sy",
            numero_etudiant: "1234567"
        },

    ];

    const columns = [
        {
            field: 'id',
            headerClassName: 'super-app-theme--header',
            align: 'center',
            headerName: 'ID',
            flex: 1
        },
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
            field: 'numero_etudiant',
            headerClassName: 'super-app-theme--header',
            headerName: 'Numero Etudiant',
            editable: true,
            flex: 1
        }


    ]


    // Pour cocher les cases dont  la valeur blocked est egale à true
    //     const [selectionModel, setSelectionModel] = React.useState(() =>
    //     data.filter((r) => r.blocked = true).map((r) => r.id),
    //   );


    const classes = VisiteStyle();
    return (
        <Layout>
            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                SONATEL ACADEMY : LISTE DES APPRENANTS
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
                                    size='small'
                                    value={structure}
                                    style={{ width: "20vw", fontWeight: "bolder", color: "#787486", borderRadius: "15px" }}
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
                                    <MenuItem value={"data"}> Data Scientist </MenuItem>
                                    <MenuItem value={"dev"}> Developpeur Web et Mobile </MenuItem>
                                </Select>
                            </div>
                        </Stack>


                    </Box>

                    <Stack direction="row" spacing={3} >
                        <Box sx={{
                            boxShadow: 1, borderRadius: "10px", width: "50%", paddingBottom: "20px",
                            '& .super-app-theme--header': {
                                backgroundColor: '#44C3CF'
                            },
                        }} className={classes.tableau}
                        >

                            <div style={{ width: "100%" }}>


                                <DataGrid

                                    sx={{ boxShadow: "30px", width: "100%" }}

                                    autoHeight
                                    pageSize={6}
                                    rowsPerPageOptions={[5, 10, 20]}

                                    onRowClick={(params, event) => {
                                        if (!event.ctrlKey) {
                                            //   alert(event.target.value.id)
                                            console.log(params.row.id)
                                        }
                                    }}

                                    components={{
                                        Pagination: CustomPagination,
                                        // Toolbar: CustomToolbar,
                                    }}
                                    rows={data}
                                    columns={columns}
                                    // checkboxSelection
                                    // selectionModel={selectionModel}
                                    // onSelectionModelChange={setSelectionModel}
                                    disableVirtualization
                                />
                            </div>

                        </Box>

                        <Grid
                            sx={{
                                width: "45%",
                                height: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    width: "95%",
                                    height: "100%",
                                    borderRadius: "10px",
                                    border: "1px solid green",
                                    boxShadow: "2",
                                    padding: "2px 10px 10px 20px",

                                }}
                            >
                                <div className={classes1.avatarApprenant} >
                                    <img src={odc} alt="" style={{ width: "20%" }} />
                                    <img src={sacademy} alt="" style={{ width: "25%" }} />
                                </div>
                                <div className={classes1.infoUser}>
                                    <div style={{ width: "70%" }}>
                                        <Typography variant="h4" style={{ fontWeight: "bold" }}>
                                            Ahmed BA
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            Numero d'etudiant: 20200354
                                        </Typography>

                                        <Typography style={{ fontWeight: "normal" }}>
                                            Réferentiel: Developpeur Web
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            Date et lieu de naissance: xx/xx/xxxx
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            Adresse: xxxxxxxxxxxxxx
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            Telephone: xxxxxxxxxxxxxx
                                        </Typography>


                                    </div>
                                    <div
                                        style={{
                                            width: "29%",
                                            height: "20vh",
                                            background: `url(${pp})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",

                                        }}
                                    >
                                        {/* <img src={pp} alt=""style={{ width: "95%", height:"100%", backgroundColor:"red" }} />                                     */}
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}>
                                    <div
                                        style={{
                                            width: "70%",

                                        }} >
                                        <Typography style={{
                                            fontWeight: "bold",
                                            fontStyle: "italic",
                                            paddingTop: "6vh"
                                        }}>
                                            Numero de contact d'urgence : xxxxxxxxxx
                                        </Typography>
                                    </div>
                                    <div
                                        style={{
                                            width: "30%",
                                            // height:"10vh",
                                            marginLeft: "00px",
                                            textAlign:"center"

                                        }}
                                    >
                                        <img src={codeqr} alt="" style={{ width: "50%", backgroundColor: "red" }} />
                                    </div>


                                </div>
                            </Box>
                            <Box textAlign="right" marginTop="20px">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#138A8A", padding: "2vh 2vw", fontWeight: "bolder" }}
                                    endIcon={<DocumentScannerOutlined />}
                                >
                                    Impression
                                </Button>
                            </Box>
                        </Grid>
                    </Stack>

                </Box>
            </Box >

        </Layout >
    )
}

export default ListApprenant;
