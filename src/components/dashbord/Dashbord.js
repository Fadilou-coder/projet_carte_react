import React from 'react'
import Typography from "@mui/material/Typography";
import Layout from "../layout/Layout";
import { Grid, Select, InputAdornment, MenuItem, Box } from '@mui/material';
import { FemaleOutlined, FilterAltOutlined, MaleOutlined, Notes } from '@mui/icons-material';
import { ListItem } from '@mui/material';
import DashboardStyle from "./Dashboard.style";
import { ChartDashboard } from './ChartDashboard';
import { ListApprenantsByPromo, ListPromos } from './Dashboard.service';
// import faker from "faker";

const Dashbord = () => {

    const [promo, setPromo] = React.useState(8);
    
    const [nbApprenants, setnbApprenants]= React.useState();

    React.useEffect(() => {

        // ListPromos().then(res => {
        //     // console.log(res.data[res.data.length - 1].id);
        //     // console.log(res.data[res.data.length - 1]);
        //     console.log(res.data);

        //     setPromo(res.data[res.data.length - 1].id);

        // });

        ListApprenantsByPromo(promo).then(res => {
            console.log(res.data.length);
            setnbApprenants(res.data.length);

        })
        // listAllReferentiels().then(res => {
        //     setReferentiels(res.data);
        // });

        // ListPromos().then(res => {
        //     setPromos(res.data);
        //     setPromo(res.data[res.data.length - 1].id);
        //     ListApprenantsByPromo(res.data[res.data.length - 1].id).then(res => {
        //         setApprenants(res.data)
        //         setApprenant(res.data[0]);
        //         setLoading(false);
        //     })
        // });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = DashboardStyle();

    return (
        <Layout>
            <Grid style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Grid style={localStorage.getItem('user') === '["ADMIN"]' ? { width: '80%' } : { width: '100%' }}>
                    <Typography variant='h5'
                        style={{
                            marginBottom: "20px",
                            borderLeft: "6px solid #000000",
                            color: "#000000",
                            paddingLeft: "15px",
                            fontWeight: "bolder"
                        }}>
                        DASHBOARD
                    </Typography>
                    <Box
                        sx={{
                            width: "100%"
                        }}
                    >
                        <div className={classes.filtre}>
                            <div
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
                            <div
                                className={classes.selection}
                            >
                                <Select
                                    size='small'
                                    // value={referentiels[0].libelle}
                                    style={{ fontWeight: "bolder", width: "100%", borderRadius: "10px", border: "2px solid black" }}
                                    onChange={(event) => {
                                        // setReferentiel(event.target.value)
                                        // chargerApprenant(event.target.value, promo)
                                    }}

                                    // className={classes1.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Notes sx={{ color: "#000000" }} ></Notes>
                                        </InputAdornment>}

                                >
                                    <MenuItem value={""}> Tous </MenuItem>
                                    {/* {
                                        referentiels.map((element, i) => {
                                            return (<MenuItem value={element.id}> {element.libelle} </MenuItem>)
                                        })
                                    } */}
                                    <ListItem> AAAAAA</ListItem>
                                </Select>
                            </div>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",

                        }}
                    >
                        <div className={classes.nbApprenant} >
                            <div className={classes.nbValue}>
                                <div className={classes.valueIcon}>
                                    <div style={{ width: "100%" }}>

                                        <svg
                                            style={{
                                                width: "80%",
                                                height: "80%",
                                                paddingLeft: "10px",
                                                borderRadius: "50px",
                                                fontSize: {
                                                    xs: "20vw",
                                                    lg: "3vw",
                                                    sm: "5vw"
                                                }
                                                // backgroundColor: "#FFF333"
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true" role="img" class="iconify iconify--ph" width="32" height="32"
                                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
                                            <path
                                                fill="currentColor"
                                                d="m226.5 56.4l-96-32a8.5 8.5 0 0 0-5 0l-95.9 32h-.2l-1 .5h-.1l-1 .6c0 .1-.1.1-.2.2l-.8.7l-.7.8c0 .1-.1.1-.1.2l-.6.9c0 .1 0 .1-.1.2l-.4.9l-.3 1.1v.3A3.7 3.7 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.6 11.2A63.2 63.2 0 0 0 64 120a64 64 0 0 0 30 54.2a96.1 96.1 0 0 0-46.5 37.4a8.1 8.1 0 0 0 2.4 11.1a7.9 7.9 0 0 0 11-2.3a80 80 0 0 1 134.2 0a8 8 0 0 0 6.7 3.6a7.5 7.5 0 0 0 4.3-1.3a8.1 8.1 0 0 0 2.4-11.1a96.1 96.1 0 0 0-46.5-37.4a64 64 0 0 0 30-54.2a63.2 63.2 0 0 0-9.6-33.7l44.1-14.7a8 8 0 0 0 0-15.2ZM128 168a48 48 0 0 1-48-48a48.6 48.6 0 0 1 9.3-28.5l36.2 12.1a8 8 0 0 0 5 0l36.2-12.1A48.6 48.6 0 0 1 176 120a48 48 0 0 1-48 48Z">
                                            </path>
                                        </svg>

                                    </div>
                                </div>
                                <div className={classes.nbVal}>
                                    <Typography variant='h3'>
                                        {{ nbApprenants }}
                                    </Typography>
                                    Apprenants
                                </div>
                            </div>
                            <div className={classes.nbValue}>
                                <div className={classes.valueIcon}>
                                    <div className={classes.valueIconResponsive} style={{ width: "100%" }}>
                                        <MaleOutlined
                                            sx={{
                                                fontSize: {
                                                    xs: "20vw",
                                                    lg: "4vw",
                                                    sm: "5vw"
                                                }
                                            }}
                                        ></MaleOutlined>
                                    </div>
                                </div>
                                <div className={classes.nbVal}>
                                    <Typography variant='h3'>
                                        42
                                    </Typography >
                                    Hommes
                                </div>
                            </div>
                            <div className={classes.nbValue}>
                                <div className={classes.valueIcon}>
                                    <div className={classes.valueIconResponsive} style={{ width: "100%" }}>
                                        <FemaleOutlined
                                            sx={{
                                                fontSize: {
                                                    xs: "20vw",
                                                    lg: "4vw",
                                                    sm: "5vw"
                                                }
                                            }}
                                        ></FemaleOutlined>
                                    </div>
                                </div>
                                <div className={classes.nbVal}>
                                    <Typography variant='h3'>
                                        20
                                    </Typography>
                                    Femmes
                                </div>
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Partie graphique et Statistique
                        </Typography>
                    </Box>
                    <Box className={classes.chartStyle}>
                        <div
                            style={{ width: "48%" }}>
                            <ChartDashboard titre="retard" color="#FF6600" ></ChartDashboard>
                        </div>
                        <div
                            style={{
                                width: "48%",
                            }}
                            sx={{

                            }}
                        >
                            <ChartDashboard titre="absence" color="#000000"></ChartDashboard>
                        </div>
                    </Box>

                </Grid>

            </Grid>

        </Layout>
    )
}

export default Dashbord;
