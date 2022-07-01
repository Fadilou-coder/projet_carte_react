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
import Avatar from '@mui/material/Avatar';
import odc from "../../assets/images/logo_ODC.png";
import logosonatel from "../../assets/images/logoSA.png";

import sacademy from "../../assets/images/logoODC.png";
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { ListAllApprenant, putApprenant, ListApprenantsByReferentielByPromo, listAllReferentiels, ListPromos, ListApprenantsByPromo, nbRetartdsApprenant } from './ApprenantService';
import Swal from "sweetalert2";
import { SearchOutlined } from '@mui/icons-material';
import ReactBoxFlip from 'react-box-flip';
import { nbAbsencesApprenant } from './ApprenantService';

var QRCode = require('qrcode.react');


export const ListApprenant = () => {

  const classes = VisiteStyle();
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  var componentRef = React.createRef();


  // Initialisation des données des apprenants
  const [apprenants, setApprenants] = React.useState([]);

  // Initialiser Liste Reeferentiel
  const [referentiels, setReferentiels] = React.useState([]);

  // Initialiser Liste Promos
  const [promos, setPromos] = React.useState([]);

  // Initialiser Referentiel 
  const [referentiel, setReferentiel] = React.useState("");

  // Absences et Retards
  const [nbrAbsences, setNbrAbsences] = React.useState(0);
  const [nbrRetards, setNbrRetards] = React.useState(0);


  // Initialiser Liste Promos
  const [promo, setPromo] = React.useState("");


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


  // Déclarer tous les mois
  const months = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ];


  // Gerer le flip de la carte
  const [isFlipped, setIsFlipped] = React.useState(false);

  function flipClick() {
    setIsFlipped(!isFlipped);
    getAbsencesRetard(apprenant.id, '2022-0' + (new Date().getMonth() + 1) + '-01', '2022-0' + (new Date().getMonth() + 2) + '-01');
  }

  function getAbsencesRetard(id, datedebut, datefin) {
    nbAbsencesApprenant(id, datedebut, datefin).then(res => {
      setNbrAbsences(res.data);
    });

    nbRetartdsApprenant(id, datedebut, datefin).then(res => {
      setNbrRetards(res.data);
    })
  }




  React.useEffect(() => {

    listAllReferentiels().then(res => {
      setReferentiels(res.data);
    });

    ListPromos().then(res => {
      setPromos(res.data);
      setPromo(res.data[res.data.length - 1].id);
      ListApprenantsByPromo(res.data[res.data.length - 1].id).then(response => {
        if (response.data.length > 0) {
          setApprenants(response.data)
          setApprenant(response.data[0]);
          console.log(response.data);
        }
        setLoading(false);
      })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ValueQR = 'https://pointage-odc.vercel.app/apprenant/' + apprenant.code;




  function chargerApprenant(idRef, idPr) {
    setLoading(true);
    if (idRef === "") {
      ListApprenantsByPromo(idPr).then(res => {
        if (res.data.length > 0) {
          setApprenants(res.data)
          setApprenant(res.data[0]);
        }
        setLoading(false);
      })
    } else {
      ListApprenantsByReferentielByPromo(idRef, idPr).then(res => {
        if (res.data.length > 0) {
          setApprenants(res.data)
          setApprenant(res.data[0]);
        }
        setLoading(false);
      })
    }
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
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'prenom',
      headerClassName: 'super-app-theme--header',
      headerName: 'Prenom',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'nom',
      headerClassName: 'super-app-theme--header',
      headerName: 'Nom',
      minWidth: 150,
      flex: 1
    },
  ]


  function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return new File([bytes], 'photo');
  }

  function update() {
    let newApp = new FormData();
    newApp.append('prenom', apprenant.prenom);
    newApp.append('nom', apprenant.nom);
    newApp.append('email', apprenant.email);
    newApp.append('phone', apprenant.phone);
    newApp.append('adresse', apprenant.addresse);
    newApp.append('typePiece', '');
    newApp.append('numPiece', '');
    newApp.append('dateNaissance', apprenant.dateNaissance);
    newApp.append('lieuNaissance', apprenant.lieuNaissance);
    newApp.append('numTuteur', apprenant.numTuteur);
    newApp.append('referentiel', Number(apprenant.referentiel.id));

    // console.log(apprenant.referentiel.id)
    // for (var value of newApp.values()) {
    //   console.log(value);
    // }

    if (apprenant.avatar !== null) {
      // if (apprenant.avatar.length === 0) {
      //   newApp.append('avatar', new File([], ''));
      // } else {
      newApp.append('avatar', _base64ToArrayBuffer(apprenant.avatar));
      console.log(newApp);
      // }
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
      <Typography variant='h5'
        style={{
          marginBottom: "20px",
          borderLeft: "6px solid #000000",
          color: "#000000",
          paddingLeft: "20px",
          fontWeight: "bolder"
        }}>
        LISTE DES APPRENANTS
      </Typography>
      <Box sx={{}} className={classes.visitePage} >

        <Box style={{ width: "100%" }}>
          {/* Gestion de l'entete de la liste des Reservations */}

          <div className={classes1.gridfiltre}>

            <div className={classes1.filtre}>
              <div
                className={classes1.champtextfiltre}
                style={{
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
                  value={promo}
                  onChange={(event) => {
                    setPromo(event.target.value)
                    chargerApprenant(referentiel, event.target.value)
                  }}
                  style={{
                    borderRadius: "30px",
                  }}
                  className={classes1.visiteur}
                  startAdornment={
                    <InputAdornment position="start">
                      <Notes sx={{ color: "#000000" }} ></Notes>
                    </InputAdornment>}

                >

                  {
                    promos.map((element, i) => {
                      return (<MenuItem value={element.id} > {element.libelle} </MenuItem>)
                    })
                  }
                </Select>
              </div>

              <div>
                <Select
                  size='small'
                  // value={referentiels[0].libelle}
                  onChange={(event) => {
                    setReferentiel(event.target.value)
                    chargerApprenant(event.target.value, promo)
                  }}
                  style={{
                    borderRadius: "30px",
                  }}
                  className={classes1.visiteur}

                  startAdornment={
                    <InputAdornment position="start">
                      <Notes sx={{ color: "#000000" }} ></Notes>
                    </InputAdornment>}

                >
                  <MenuItem value={""}> Tous </MenuItem>
                  {
                    referentiels.map((element, i) => {
                      return (<MenuItem value={element.id}> {element.libelle} </MenuItem>)
                    })
                  }
                </Select>
              </div>

              <div>
                <FormControl style={{ width: "100%", marginBottom: "20px" }}>
                  <OutlinedInput

                    id="email"
                    placeholder="rechercher"
                    style={{ fontWeight: "bolder", color: "#000000" }}
                    size="small"
                    className={classes1.mysearch}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchOutlined sx={{ color: "#000000" }}></SearchOutlined>
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
                (localStorage.getItem('user') === '["SUPER_ADMIN"]') ?
                  <Button
                    variant="contained"
                    style={{

                    }}
                    sx={{
                      backgroundColor: "#FF6600",
                      color: "#000000",
                      marginRight: "35px",
                      fontWeight: "bolder",
                      '&:hover': {
                        backgroundColor: '#000000',
                        color: "white"
                      }
                    }}
                    endIcon={<AddCircleOutlined />}
                    onClick={RedirectAddApprenant}
                  >
                    Ajouter
                  </Button> : null
              }
            </Box>

          </div>

          <Grid className={classes1.table} >

            <Grid
              sx={{
                boxShadow: 1,
                borderRadius: "10px",
                width: "60%",
                '& .super-app-theme--header': {
                  backgroundColor: '#696969',
                  color: "white"


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

                        console.log(apprenant);
                        if(isFlipped===true){
                          flipClick();
                        }
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
                    NoRowsOverlay: CustomNoRowsOverlay,

                  }}
                  loading={loading}
                  rows={
                    apprenants.length > 0 ?
                      apprenants.filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (val.prenom.toLowerCase().includes(search.toLowerCase()) || val.nom.toLowerCase().includes(search.toLowerCase())
                          || val.code.toLowerCase().includes(search.toLowerCase())) {
                          return val;
                        }
                      }).map((row) => {
                        return row;
                      }) : apprenants
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
              <Grid
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative"
                }}>
                <button style={{ marginBottom: "10px" }} onClick={flipClick}> Voir details Présence :  </button>
                <ReactBoxFlip isFlipped={isFlipped}>
                  <Box
                    sx={{
                      width: "94%",
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
                        <img src={odc} alt="" style={{ width: "30%" }} />
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
                              <div>
                                {apprenant.code}
                              </div>
                            </Stack>
                          </Typography>
                          <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                            <Stack direction="row" spacing={1} >
                              <div>
                                Email:
                              </div>
                              <EasyEdit
                                type={Types.TEXT}
                                value={apprenant.email}
                                onSave={(val) => {
                                  apprenant.email = val;
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
                                  { label: 'Developpeur Web et Mobile', value: '1' },
                                  { label: 'Data Scientist', value: '2' },
                                  { label: 'Reference Digital', value: '3' }

                                ]}
                                value={apprenant.referentiel.libelle}
                                onSave={(val) => {
                                  apprenant.referentiel.id = val;
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
                        <div>
                          <Avatar
                            src={`data:image/jpg;base64,${apprenant.avatar}`}
                            sx={{ width: 120, height: 125, marginTop: 4, marginRight: 3 }}
                            variant="square"
                          />
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
                            value={ValueQR}
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

                          <QRCode
                            hidden
                            id="qr-gen"
                            value={ValueQR}
                            size={400}
                            level={"H"}
                            includeMargin={true}
                            bgColor={"#ffffff"}
                            fgColor={"#138A8A"}
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

                  <Box
                    sx={{
                      width: "94%",
                      height: "100%",
                      borderRadius: "10px",
                      border: "1px solid #138A8A",
                      boxShadow: "2",
                      padding: "2px 10px 10px 20px",

                    }}
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: " center",
                      flexDirection: "column"
                    }}
                  >

                    <h1 style={{ textAlign: "center" }} > {apprenant.prenom} {apprenant.nom} </h1>


                    <div style={{ textAlign: "center" }}>

                      <Select
                        defaultValue={new Date().getMonth() + 1}
                        onChange={(event) => {
                          console.log(event.target.value);
                          getAbsencesRetard(apprenant.id, '2022-0' + event.target.value + '-01', '2022-0' + (Number(event.target.value) + 1) + '-01')
                        }}
                        size='small'
                        sx={{
                          width: "50%",

                        }}
                      >
                        {
                          months.map((element, index) => {
                            return (<MenuItem value={Number(index) + 1} key={Number(index) + 1} > {element} </MenuItem>)
                          })
                        }

                      </Select>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>

                      <div style={{ textAlign: "center" }}> Nombre d'heures de retard :  <hr />
                        <h1>{nbrRetards}</h1>
                      </div>
                      <div style={{ textAlign: "center" }}> Nombre de jours d'Absences :  <hr />
                        <h1>{nbrAbsences}</h1>
                      </div>

                    </div>


                  </Box>

                </ReactBoxFlip>
              </Grid>

              <Grid sx={{ display: "flex", justifyContent: "space-evenly", marginTop: "400px" }} marginTop="20px">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF6600',
                    color: "#000000",
                    fontWeight: "bolder",
                    '&:hover': {
                      backgroundColor: '#000000',
                      color: "#FFFFFF"
                    }
                  }}
                  onClick={update}
                >
                  Enregistrer Modification
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF6600',
                    color: "#000000",
                    fontWeight: "bolder",
                    '&:hover': {
                      backgroundColor: '#000000',
                      color: "#FFFFFF"
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
