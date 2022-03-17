import { AddCircleOutlined, Check, Close, DocumentScannerOutlined, FilterAltOutlined, Notes } from '@mui/icons-material';
import { Box, Grid, InputAdornment, MenuItem, Pagination, PaginationItem, Select, Stack, Button } from '@mui/material';
import EasyEdit, { Types } from "react-easy-edit";
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
import logosonatel from "../../assets/images/logoSA.png";

import sacademy from "../../assets/images/logoODC.png";
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { ListAllApprenant } from './ApprenantService';

var QRCode = require('qrcode.react');


export const ListApprenant = () => {


    const [structure, setStructure] = React.useState("FadiloU Agency Security");


    // Initialisation des données des apprenants
    const [apprenants, setApprenants] = React.useState([]);



    React.useEffect(() => {
        ListAllApprenant().then(res => {
            setApprenants(res.data);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





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
            nom: 'Fadilou',
            prenom: 'SY',
            code: '20200354',
            referentiel: 'Developpeur Web',
            date_naiss: '02/02/2000',
            adresse: 'Pikine',
            telephone: '77 777 77 77'

        }

    ];

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
            field: 'code',
            headerClassName: 'super-app-theme--header',
            headerName: 'Numero Etudiant',
            editable: true,
            flex: 1
        }


    ]

    // Show detail Apprenant
    let [apprenant, setApprenant] = React.useState(
        data[0]
    );

    // Pour cocher les cases dont  la valeur blocked est egale à true
    //     const [selectionModel, setSelectionModel] = React.useState(() =>
    //     data.filter((r) => r.blocked = true).map((r) => r.id),
    //   );
    let history = useHistory();

    function RedirectAddApprenant() {
        history.push("/add_apprenant");
    }

    const classes = VisiteStyle();
    return (
        <Layout>
            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                SONATEL ACADEMY : LISTE DES APPRENANTS
            </Typography>
            <Box sx={{}} className={classes.visitePage} >

                <Box style={{ width: "100%" }}>
                    {/* Gestion de l'entete de la liste des Reservations */}

                    <Box
                        marginBottom={1}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"


                        }} spacing={2}
                    >

                        <Stack
                            direction="row"
                            spacing={5}
                            justifyContent="center"
                            alignItems="center"


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
                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                style={{

                                }}
                                sx={{
                                    backgroundColor: "#138A8A",
                                    marginRight: "35px",
                                    fontWeight: "bolder",
                                    '&:hover': {
                                        backgroundColor: '#F48322',
                                    }
                                }}
                                endIcon={<AddCircleOutlined />}
                                onClick={RedirectAddApprenant}
                            >
                                Ajouter
                            </Button>
                        </Box>

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
                                    pageSize={10}
                                    rowsPerPageOptions={[5, 10, 20]}

                                    onRowClick={(params, event) => {
                                        if (!event.ctrlKey) {
                                         setApprenant(params.row);

                                        }
                                    }}

                                    components={{
                                        Pagination: CustomPagination,
                                        // Toolbar: CustomToolbar,
                                    }}
                                    rows={apprenants}
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
                                    border: "1px solid #138A8A",
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
                                            {/* Ahmed BA */}
                                            <Stack spacing={2} direction="row">
                                                <EasyEdit
                                                    type={Types.TEXT}
                                                    value={apprenant.nom}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />

                                                <EasyEdit
                                                    type={Types.TEXT}
                                                    value={apprenant.prenom}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                            </Stack>
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            <Stack direction="row" spacing={1} >
                                                <div>
                                                    Numero d'etudiant:
                                                </div>
                                                <EasyEdit
                                                    type={Types.TEXT}
                                                    value={apprenant.code}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                            </Stack>
                                        </Typography>

                                        <Typography style={{ fontWeight: "normal" }}>
                                            <Stack spacing={1} direction="row">
                                                <div>Réferentiel:</div>
                                                <EasyEdit
                                                    type="select"
                                                    options={[
                                                        { label: 'Developpeur Web et Mobile', value: 'one' },
                                                        { label: 'Data Scientist', value: 'two' },
                                                        { label: 'Reference Digital', value: 'trois' }

                                                    ]}
                                                    value={apprenant.referentiel.libelle}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                            </Stack>
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>

                                            <Stack spacing={1} direction="row">
                                                <div>
                                                    Date de naissance:

                                                </div>
                                                <EasyEdit
                                                    type="date"
                                                    value={apprenant.dateNaissance}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                                <EasyEdit
                                                    type={Types.TEXT}
                                                    value={apprenant.lieuNaissance}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                            </Stack>
                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            {/* Adresse: xxxxxxxxxxxxxx */}
                                            <Stack spacing={1} direction="row">
                                                <div>
                                                    Adresse:
                                                </div>
                                                <EasyEdit
                                                    type={Types.TEXT}
                                                    value={apprenant.addresse}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                            </Stack>

                                        </Typography>
                                        <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                                            <Stack spacing={1} direction="row">
                                                <div>
                                                    Telephone:
                                                </div>
                                                <EasyEdit
                                                    type={Types.TEXT}
                                                    value={apprenant.phone}
                                                    onSave={(val) => console.log(val)}
                                                    saveButtonLabel={<Check></Check>}
                                                    cancelButtonLabel={<Close />}
                                                />
                                            </Stack>

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
                                            textAlign: "center"

                                        }}
                                    >
                                        {/* <img src={codeqr} alt="" style={{ width: "50%", backgroundColor: "red" }} /> */}
                                        <QRCode
                                            value={apprenant.code}
                                            size={90}
                                            bgColor={"#ffffff"}
                                            fgColor={"#138A8A"}
                                            level={"H"}
                                            includeMargin={false}
                                            renderAs={"svg"}
                                            imageSettings={{
                                                src: `${logosonatel}`,
                                                x: null,
                                                y: null,
                                                height: 30,
                                                width: 30,
                                                excavate: false,
                                            }}
                                        />
                                    </div>


                                </div>
                            </Box>
                            <Box textAlign="right" marginTop="20px">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#138A8A",
                                        padding: "2vh 2vw",
                                        fontWeight: "bolder",
                                        '&:hover': {
                                            backgroundColor: '#F48322',
                                        }
                                    }}
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
