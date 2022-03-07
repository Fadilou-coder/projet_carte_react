import { Box, FormControl, Typography } from '@material-ui/core';
import LoginStyle from './Login.style';
import Grid from '@mui/material/Grid';
import logo from "../../assets/images/logoODC.png";
import { InputAdornment, OutlinedInput, Stack, IconButton, Button } from '@mui/material';
import { PersonOutline, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';


const Login = () => {

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const classes = LoginStyle();

  return (
    <>
      <Grid container className={classes.loginpage}>


        <Grid borderRadius="25%" style={{ width: '100%', zIndex: 2 }} className={classes.loginContent}>

          <h1 className={classes.titre}>
            PLATEFORME DE POINTAGE DES APPRENANTS
          </h1>
          <Box
            sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)', }}
            className={classes.contenu} boxShadow = {3}
          >
            <Box className={classes.logo} >
              <img style={{ width: "70%" }} src={logo} alt="" />
            </Box>

            <Stack alignItems={"center"} spacing={2}>
              <Typography variant='h4' style={{ fontWeight: 600, color: "#138A8A" }} > Bienvenue </Typography>
              <hr style={{ borderTop: " 1px solid #138A8A", width: "30%" }} />
              <Typography
                variant='subtitle1'
                className={classes.subtit}
              >
                Entrer vos informations de connexion
              </Typography>

              {/* Input Email */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  id="email"
                  placeholder="username"
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonOutline></PersonOutline>
                    </InputAdornment>}

                />
              </FormControl>


              {/* Input Password */}
              <FormControl fullWidth>
                <OutlinedInput
                  id='password'
                  placeholder='Password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockOutlinedIcon></LockOutlinedIcon>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} >
                        <VisibilityOff />
                      </IconButton>
                    </InputAdornment>
                  }
                >

                </OutlinedInput>
              </FormControl>

              {/* Forgot Mdp */}
              <div
                style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "20px" }}
              >
                <a
                  href="/"
                  style={{ color: "primary", textDecoration: "none", fontSize: "small", cursor: "pointer" }}
                >
                  forgot password?
                </a>
              </div>

              {/* Se connecter */}
              <Button style={{ backgroundColor: "#138A8A", width: "100%", marginTop: "30px" }} variant="contained">Se connecter</Button>
            </Stack>

          </Box>
        </Grid>
        <Box style={{ zIndex: 1 }} className={classes.pageGreen}>

        </Box>

      </Grid>

    </>
  )
}


export default Login;