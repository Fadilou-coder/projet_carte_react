import {
  Box,
  Grid,
} from '@mui/material';

import React from 'react'
import ListApprenantStyle from "./ApprenantStyle";
import Avatar from '@mui/material/Avatar';
import odc from "../../assets/images/logo_ODC.png";

import sacademy from "../../assets/images/logoODC.png";
import { useParams } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { FindApprenantByCode } from './ApprenantService';

export const CarteApprenant = () => {

  const classes1 = ListApprenantStyle();

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

  let { code } = useParams();

  React.useEffect(() => {
    FindApprenantByCode(code).then(res => {
      setApprenant(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Grid
      sx={{
        width: "34%",
        height: "100%",
      }}
      className={classes1.detailUser}
    >
      <Box
        sx={{
          marginTop: "10%",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          border: "1px solid #138A8A",
          boxShadow: "2",
          padding: "2px 10px 10px 20px",

        }}
      >
        <Grid>
          <div className={classes1.avatarApprenant} >
            <img src={odc} alt="" style={{ width: "30%" }} />
            <img src={sacademy} alt="" style={{ height: "100%", width: "25%" }}
            />
          </div>
          <div className={classes1.infoUser}>
            <div style={{ width: "70%", backgroundColor: "white" }}>
              <Typography style={{ fontWeight: "bold", backgroundColor: "white" }}>
                {apprenant.prenom} {apprenant.nom}
              </Typography>
              <Typography style={{ fontWeight: "normal", marginBottom: "2px" }}>
                Numero d'etudiant:  {apprenant.code}
              </Typography>

              <Typography style={{ fontWeight: "normal" }}>
                Réferentiel: {apprenant.referentiel.libelle}
              </Typography>
              <Typography style={{ fontWeight: "normal", marginBottom: "2px", backgroundColor: "white" }}>
                Date de naissance: {apprenant.dateNaissance}
              </Typography>
              <Typography style={{ fontWeight: "normal", marginBottom: "2px", backgroundColor: "white" }}>
                Adresse: {apprenant.addresse}
              </Typography>
              <Typography style={{ fontWeight: "normal", marginBottom: "2px", backgroundColor: "white" }}>
                Telephone: {apprenant.phone}
              </Typography>


            </div>
              <div>
                <Avatar
                  src={`data:image/jpg;base64,${apprenant.avatar}`}
                  sx={{ width: 90, height: 90, marginTop: 4, marginRight: 0.5 }}
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
                backgroundColor: "white"
              }}

            >
              <Typography style={{
                fontWeight: "bold",
                fontStyle: "italic",
                paddingTop: "6vh",
                backgroundColor: "white"
              }}>
                    Numero de contact d'urgence: {apprenant.numTuteur}
              </Typography>
            </div>


          </div>
        </Grid>
      </Box>
    </Grid>
  )

}

export default CarteApprenant;
