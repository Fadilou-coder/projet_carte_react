/* eslint-disable array-callback-return */
import { AddCircleOutlined, Check, Close, DocumentScannerOutlined, FilterAltOutlined, Notes } from '@mui/icons-material';
import {
    Box,
    Grid,
    InputAdornment,
    MenuItem,
    Pagination,
    PaginationItem,
    Select,
    Stack,
    Button,
    FormControl, OutlinedInput
} from '@mui/material';
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
import ListApprenantStyle from "./ApprenantStyle";
import pp from "../../assets/images/ppuser.png";
import odc from "../../assets/images/odc.jpeg";
import logosonatel from "../../assets/images/logoSA.png";
import sacademy from "../../assets/images/logoODC.png";
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { ListAllApprenant, putApprenant, ListApprenantsByReferentiel, listAllReferentiels } from './ApprenantService';
import Swal from "sweetalert2";
import { SearchOutlined } from '@mui/icons-material';


var QRCode = require('qrcode.react');


export const ListApprenant = () => {

    const classes = VisiteStyle();
    const [search, setSearch] = React.useState('');
    var componentRef = React.createRef();


    // Initialisation des données des apprenants
    const [apprenants, setApprenants] = React.useState([]);

    // Initialiser Liste Reeferentiel
    const [referentiels, setReferentiels] = React.useState([]);
    // Show detail Apprenant
    const [apprenant, setApprenant] = React.useState({
        id: 0,
        nom: '',
        prenom: '',
        code: '',
        referentiel: { id: 0, libelle: '', },
        date_naiss: '00/00/0000',
        addresse: '',
        telephone: '77 777 77 77'

    });



    React.useEffect(() => {
        ListAllApprenant().then(res => {
            setApprenants(res.data);
            setApprenant(res.data[0]);
        });

        listAllReferentiels().then(res => {
            setReferentiels(res.data);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function chargerReferentiel(value) {
        if (value === "") {
            ListAllApprenant().then(res => {
                setApprenants(res.data);
                // setApprenant(res.data[0]);
            })
        } else {
            ListApprenantsByReferentiel(value).then(res => {
                setApprenants(res.data)
            })
        }
    };




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

    const [isSelection, setIsSelection] = React.useState(false);


    const columns = [

        {
            field: 'code',
            headerClassName: 'super-app-theme--header',
            headerName: 'Numero Etudiant',
            flex: 1,
        },
        {
            field: 'prenom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Prenom',
            flex: 1,
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            flex: 1
        },
    ]

    function update() {
        let newApp = new FormData();
        newApp.append('prenom', apprenant.prenom);
        newApp.append('nom', apprenant.nom);
        newApp.append('email', apprenant.email);
        newApp.append('phone', apprenant.phone);
        newApp.append('adresse', apprenant.addresse);
        newApp.append('cni', '1234543212345');
        newApp.append('dateNaissance', apprenant.dateNaissance);
        newApp.append('lieuNaissance', apprenant.lieuNaissance);
        newApp.append('numTuteur', apprenant.numTuteur);
        if (apprenant.avatar !== null) {
            newApp.append('avatar', apprenant.avatar);
        }
        else
            newApp.append('avatar', new File([], ''));

        putApprenant(newApp, apprenant.id).then(res => {
            if (res.status === 200) {
                setApprenant(res.data);
                setIsSelection(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Enregistrer avec success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })


    }

    let history = useHistory();

    function RedirectAddApprenant() {
        history.push("/add_apprenant");
    }

    const downloadQRCode = () => {
        // exportComponentAsJPEG(componentRef)
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode_" + apprenant.prenom + "_" + apprenant.nom + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


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
                                    // value={referentiels[0].libelle}
                                    onChange={(event) => chargerReferentiel(event.target.value)}
                                    style={{
                                        width: "20em",
                                        fontWeight: "bolder",
                                        color: "#787486",
                                        borderRadius: "15px",
                                    }}
                                    className={classes.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Notes sx={{ color: "#44C3CF" }} ></Notes>
                                        </InputAdornment>}

                                >
                                    <MenuItem value={""}> Tous </MenuItem>
                                    {
                                        referentiels.map((element, i) => {
                                            return (<MenuItem value={""+element.id}> {element.libelle} </MenuItem>)
                                        })
                                    }
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

                    <Grid className={classes1.table} >

                        <Grid
                            sx={{
                                boxShadow: 1,
                                borderRadius: "10px",
                                width: "60%",
                                '& .super-app-theme--header': {
                                    backgroundColor: '#44C3CF',


                                },
                            }} className={classes1.tableau}
                        >

                            <div style={{ width: "100%" }}>
                                <DataGrid
                                    sx={{
                                        boxShadow: "30px",
                                        width: "100%",
                                        fontSize: "20px",
                                    }}
                                    style={{
                                        ".MuiDataGrid-columnHeaderTitleContainer": {
                                            background: '#010310',
                                        }
                                    }}
                                    autoHeight
                                    pageSize={10}
                                    rowsPerPageOptions={[5, 10, 20]}

                                    onRowClick={(params, event) => {
                                        if (!event.ctrlKey) {
                                            if (apprenant.id !== params.row.id) {
                                                if (isSelection === false) {
                                                    setApprenant(params.row);
                                                } else {
                                                    Swal.fire({
                                                        title: 'Attention?',
                                                        text: "Voulez vous enregistrer les derniers modifications",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Oui!',
                                                        cancelButtonText: 'Non'
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            update();
                                                            setApprenant(params.row);
                                                            setIsSelection(false)
                                                        } else {
                                                            ListAllApprenant().then(res => {
                                                                setApprenants(res.data);
                                                            });
                                                            setIsSelection(false)
                                                        }
                                                    })
                                                }
                                            }

                                        }
                                    }}
                                    components={{
                                        Pagination: CustomPagination,
                                    }}
                                    rows={
                                        apprenants.filter((val) => {
                                            if(search === ""){
                                                return val;
                                            } else if (val.prenom.toLowerCase().includes(search.toLowerCase()) || val.nom.toLowerCase().includes(search.toLowerCase())
                                                || val.code.toLowerCase().includes(search.toLowerCase())){
                                                return val;
                                            }
                                        }).map((row) => {
                                            return row;
                                        })
                                    }
                                    columns={columns}
                                    getRowClassName={() => 'apprenant-table--row'}
                                    getCellClassName={() => 'apprenant-table--cell'}

                                    disableVirtualization
                                />
                            </div>

                        </Grid>

                        <Grid
                            sx={{
                                width: "34%",
                                height: "100%",
                            }}
                            className={classes1.detailUser}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "10px",
                                    border: "1px solid #138A8A",
                                    boxShadow: "2",
                                    padding: "2px 10px 10px 20px",

                                }}
                                style={{ backgroundColor: "white" }}

                            >
                                <Grid ref={componentRef}>
                                    <div className={classes1.avatarApprenant} >
                                        <img src={odc} alt="" style={{ width: "20%" }} />
                                        <img src={sacademy} alt="" style={{ height: "100%", width: "25%" }}
                                        />
                                    </div>
                                    <div className={classes1.infoUser}>
                                        <div style={{ width: "70%", backgroundColor: "white" }}>
                                            <Typography variant="h4" style={{ fontWeight: "bold", backgroundColor: "white" }}>
                                                {/* Ahmed BA */}
                                                <Stack spacing={2} direction="row" style={{ backgroundColor: "white" }}>
                                                    <EasyEdit
                                                        type={Types.TEXT}
                                                        value={apprenant.nom}
                                                        onSave={(val) => {
                                                            apprenant.nom = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
                                                        saveButtonLabel={<Check></Check>}
                                                        cancelButtonLabel={<Close />}
                                                    />

                                                    <EasyEdit
                                                        type={Types.TEXT}
                                                        value={apprenant.prenom}
                                                        onSave={(val) => {
                                                            apprenant.prenom = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
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
                                                        onSave={(val) => {
                                                            apprenant.code = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
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
                                                        onSave={(val) => {
                                                            apprenant.referentiel.libelle = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
                                                        saveButtonLabel={<Check></Check>}
                                                        cancelButtonLabel={<Close />}
                                                    />
                                                </Stack>
                                            </Typography>
                                            <Typography style={{ fontWeight: "normal", marginBottom: "2px", backgroundColor: "white" }}>

                                                <Stack spacing={1} direction="row">
                                                    <div>
                                                        Date de naissance:

                                                    </div>
                                                    <EasyEdit
                                                        type="date"
                                                        value={apprenant.dateNaissance}
                                                        onSave={(val) => {
                                                            apprenant.dateNaissance = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
                                                        saveButtonLabel={<Check></Check>}
                                                        cancelButtonLabel={<Close />}
                                                    />
                                                    <EasyEdit
                                                        type={Types.TEXT}
                                                        value={apprenant.lieuNaissance}
                                                        onSave={(val) => {
                                                            apprenant.lieuNaissance = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
                                                        saveButtonLabel={<Check></Check>}
                                                        cancelButtonLabel={<Close />}
                                                    />
                                                </Stack>
                                            </Typography>
                                            <Typography style={{ fontWeight: "normal", marginBottom: "2px", backgroundColor: "white" }}>
                                                <Stack spacing={1} direction="row">
                                                    <div>
                                                        Adresse:
                                                    </div>
                                                    <EasyEdit
                                                        type={Types.TEXT}
                                                        value={apprenant.addresse}
                                                        onSave={(val) => {
                                                            apprenant.addresse = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
                                                        saveButtonLabel={<Check></Check>}
                                                        cancelButtonLabel={<Close />}
                                                    />
                                                </Stack>

                                            </Typography>
                                            <Typography style={{ fontWeight: "normal", marginBottom: "2px", backgroundColor: "white" }}>
                                                <Stack spacing={1} direction="row">
                                                    <div>
                                                        Telephone:
                                                    </div>
                                                    <EasyEdit
                                                        type={Types.TEXT}
                                                        value={apprenant.phone}
                                                        onSave={(val) => {
                                                            apprenant.phone = val;
                                                            setApprenant(apprenant);
                                                            setIsSelection(true);
                                                        }}
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
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        backgroundColor: "white"
                                    }}>
                                        <div
                                            style={{
                                                width: "70%",
                                                backgroundColor: "white"

                                            }} >
                                            <Typography style={{
                                                fontWeight: "bold",
                                                fontStyle: "italic",
                                                paddingTop: "6vh",
                                                backgroundColor: "white"
                                            }}>
                                                <Stack spacing={1} direction="row">
                                                    <div>
                                                        Numero de contact d'urgence:
                                                    </div>
                                                    <EasyEdit
                                                        type={Types.TEXT}
                                                        value={apprenant.numTuteur}
                                                        onSave={(val) => {
                                                            apprenant.numTuteur = val;
                                                            setApprenant(apprenant);
                                                        }}
                                                        saveButtonLabel={<Check></Check>}
                                                        cancelButtonLabel={<Close />}
                                                    />
                                                </Stack>
                                            </Typography>
                                        </div>
                                        <div
                                            style={{
                                                width: "30%",
                                                textAlign: "center",
                                                backgroundColor: "white"

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
                                </Grid>
                            </Box>
                            <Grid sx={{ display: "flex", justifyContent: "space-evenly" }} marginTop="20px">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#F48322",
                                        fontWeight: "bolder",
                                        '&:hover': {
                                            backgroundColor: '#F48322',
                                        }
                                    }}
                                    onClick={update}
                                >
                                    Enregistrer Modification
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#138A8A",
                                        fontWeight: "bolder",
                                        '&:hover': {
                                            backgroundColor: '#138A8A',
                                        }
                                    }}
                                    endIcon={<DocumentScannerOutlined />}
                                    onClick={downloadQRCode}
                                >
                                    Impression
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Box >

        </Layout >
    )
}
export default ListApprenant;
