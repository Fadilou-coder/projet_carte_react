import { Box, FormControl, Typography } from '@material-ui/core';
import LoginStyle from './Login.style';
import Grid from '@mui/material/Grid';
import logo from "../../assets/images/login.jpeg";
import { InputAdornment, OutlinedInput, Stack, IconButton, Button } from '@mui/material';
import { VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import AuthService from '../../core/service/AuthService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { EmailOutlined } from '@mui/icons-material';


const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorPage, setErrorPage] = useState(false);

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const initialValues = {username: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState( {});
  const [isSubmit, setIsSubmit] = useState(false);

  const [ open, setOpen] = React.useState(false);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleUsernameChange = (event) => {
     setUsername(event.target.value);
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
     setOpen(true);
    AuthService.login(username, password).then(
    (res) => {
      props.history.push("/visites");
    }
    ).catch((e)=>{
     setOpen(false);
      setErrorPage(true);
      console.log("Login ou Mot de Passe Incorrect!!!")
    });
}

  const validate = (val) => {
    const errors = {};
    if(!val.username){
      errors.username = "email est requis"
    }
    if(!val.password){
      errors.password = "password est requis"
    } else if(val.password.length < 3){
      errors.password = "le mot de passe doit comporter plus de 3 caractères";
    }
    else if(val.password.length > 10){
      errors.password = "le mot de passe ne peut pas dépassé plus de 10 caractères";
    }
    return errors;
  };

  const classes = LoginStyle();

  const btn = username === '' || password === '' ? <Button disabled sx={{ backgroundColor: "#FF6600", width: "100%", marginTop: "30px", '&:hover':{backgroundColor: "#000000"} }} variant="contained" onClick={handleLogin}
  >Se connecter</Button> : <Button sx={{ backgroundColor: "#FF6600", width: "100%", marginTop: "30px", '&:hover':{backgroundColor: "#000000"} }} variant="contained" onClick={handleLogin}
  >Se connecter</Button>

  return (
    <>
      <Grid container className={classes.loginpage}>

        <Grid borderRadius="25%" style={{ width: '100%', zIndex: 2}} className={classes.loginContent}>

          {/* <h1 className={classes.titre}>
            PLATEFORME DE POINTAGE DES APPRENANTS
          </h1> */}
          <Box
            sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)', }}
            className={classes.contenu}
          >
            <Box className={classes.logo} >
             <img  style={{ width: "80%" }} src={logo} alt="" />
              {/* <Box sx={12}><img style={{ width: "100%" }} src="https://www.orange.com/sites/orangecom/files/styles/crop_4_3_medium/public/2021-08/Orange%20jobs%20HP.png?h=541b8180&itok=t0pYzqqY" alt="" /></Box> */}
            </Box>

            <Stack alignItems={"center"} spacing={2}>
              <Typography variant='h4' style={{ fontWeight: 600, color: "#000000" }} > Bienvenue </Typography>
              <hr style={{ borderTop: " 1px solid #FF6600", width: "30%" }} />
              <Typography
                variant='subtitle1'
                className={classes.subtit}
              >
                Entrer vos informations de connexion
              </Typography>
              {errorPage === true && isSubmit ? (
                  <div className={classes.formError} >Login ou mot de passe incorrect!!!</div>
              ) : null}

              {/* Input Email */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  id="username"
                  placeholder="email"
                  name="username"
                  value={values.username}
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <PersonOutline></PersonOutline> */}
                      <EmailOutlined></EmailOutlined>
                    </InputAdornment>}

                  onChange={handleUsernameChange}
                />
              </FormControl>
              <p className={classes.formError}>{formErrors.username}</p>

              {/* Input Password */}
              <FormControl fullWidth>
                <OutlinedInput
                  id='password'
                  placeholder='password'
                  name="password"
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
                  onChange={handlePasswordChange}
                >
                </OutlinedInput>
              </FormControl>
              <p className={classes.formError}>{formErrors.password}</p>
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
              {btn}
            </Stack>

          </Box>
        </Grid>
        <Box style={{ zIndex: 1 }} className={classes.pageGreen}>

        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

      </Grid>

    </>
  )
}


export default Login;
