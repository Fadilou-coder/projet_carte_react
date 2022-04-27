import React from 'react'
import Typography from "@mui/material/Typography";
import Layout from "../layout/Layout";
import { Grid, Select, InputAdornment, MenuItem, Box } from '@mui/material';
import { FemaleOutlined, FilterAltOutlined, MaleOutlined, Notes } from '@mui/icons-material';
import DashboardStyle from "./Dashboard.style";
// import { ChartDashboard } from './ChartDashboard';


// import { ListApprenantsByPromo, ListPromos, nbRetardPromo } from './Dashboard.service';
// import faker from "faker";
import { ListApprenantsByReferentielByPromo, ListApprenantsByPromo, ListPromos } from '../apprenant/ApprenantService';
import { nbAbsAllApp, nbRetardPromo } from './Dashboard.service';

import Chart from "react-apexcharts";
import { ChartDashboard } from './ChartDashboard';

// import { Bar } from "react-chartjs-2";
// import faker from "faker";



// import ChartApex from './ChartApex';

const Dashbord = () => {

    const [promo, setPromo] = React.useState(100);
    const [allPromos, setAllPromos] = React.useState([]);


    // Valeur des Absences globales
    const [absences, setAbsences] = React.useState([]);

    // Valeur des Retards globales
    const [retards, setRetards] = React.useState([]);


    // ChartJS configuration
    const [optionschart, setOptionChart] = React.useState({
        tooltips: {
            titleAlign: "center",
            titleMarginBottom: 8,
            bodyFontFamily: "'Nunito', sans-serif",
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Test",
            },
            hover: {
                mode: 'label'
            }

        },
    });


    const mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];


    const [dataChart, setDataChart] = React.useState([{
        mois,
        datasets: [
            {
                label: "Donnees ",
                data: {
                    Janvier: 10,
                    Fevrier: 20,
                    Mars: 60,
                    Avril: 45,
                    Mai: 21,
                    Juin: 34,
                    Juillet: 40,
                    Aout: 20,
                    Septembre: 73,
                    Octobre: 12,
                    Novembre: 56,
                    Decembre: 10
                },
                backgroundColor: "#FF6600",
            },

        ],
    }])

    // Chart Apex configuration
    const [options, setObject] = React.useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ["Janvier", "Fevrier", " Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
        }

    });

    // Pour Retards
    const [series1, setSeries1] = React.useState([{
        name: "series-2",
        data: [80, 11, 11, 20, 40, 45, 50, 49, 60, 70, 91, 11],
    }])

    // Pour Absences 
    const [series, setSeries] = React.useState([{
        name: "series-1",
        data: [80, 11, 11, 20, 40, 45, 50, 49, 60, 70, 91, 11],
    }])


    const [nbApprenants, setnbApprenants] = React.useState();

    const [nbHommes, setnbHommes] = React.useState(0);

    const [nbFemmes, setnbFemmes] = React.useState(0);



    // Initialiser Liste Reeferentiel
    // const [referentiels, setReferentiels] = React.useState([]);

    React.useEffect(() => {
        ListApprenantsByPromo(promo).then(res => {
            console.log(res.data);
            setnbApprenants(res.data.length);

            let nbhommes = 0;
            let nbfemmes = 0;
            res.data.map((element) => {
                if (element.sexe === "M") {
                    nbhommes++;
                } else {
                    nbfemmes++;
                }
            })

            setnbHommes(nbhommes);
            setnbFemmes(nbfemmes);

        });

        ListPromos().then(res => {
            console.log(res.data);
            setAllPromos(res.data);
            let grandId = 0;
            res.data.map((element) => {
                // console.log(element.id);
                if (grandId < element.id) {
                    grandId = element.id;
                }
            });
            setPromo(grandId);
        })
       

    }, []);



    function chargerApprenant(idPromo) {

        ListApprenantsByPromo(idPromo).then(res => {
            // console.log(res.data);
            setnbApprenants(res.data.length);

            let nbhommes = 0;
            let nbfemmes = 0;
            res.data.map((element) => {
                if (element.sexe === "M") {
                    nbhommes++;
                }
            })

            setnbHommes(nbhommes);
            nbfemmes = res.data.length - nbhommes;
            setnbFemmes(nbfemmes);

        });

        for (let i = 1; i < 12; i++) {

            let valeurdate = i.toString();
            let val = (i + 1).toString()
            if (i.toString().length === 1) {
                valeurdate = "0" + i.toString();
            }
            if (val.length === 1) {
                val = "0" + val;
            }

            nbAbsAllApp(idPromo, "2022-" + (valeurdate) + "-01", "2022-" + (val) + "-01").then(r => {
                var tmp = absences;
                tmp.push(r.data);
                setAbsences([]);
                setAbsences(tmp);
            });

            nbRetardPromo(idPromo, "2022-" + (valeurdate) + "-01", "2022-" + (val) + "-01").then(r => {
                var tmp = retards;
                tmp.push(r.data);
                setRetards([]);
                setRetards(tmp);
            });

        }



    }





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
                                        chargerApprenant(event.target.value)
                                    }}

                                    // className={classes1.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Notes sx={{ color: "#000000" }} ></Notes>
                                        </InputAdornment>}

                                >
                                    <MenuItem value={""}> Tous </MenuItem>
                                    {
                                        allPromos.map((element, i) => {
                                            return (<MenuItem value={element.id}> {element.libelle} </MenuItem>)
                                        })
                                    }

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
                                        {nbApprenants}
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
                                        {nbHommes}
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
                                        {nbFemmes}

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
                            <ChartDashboard donneesretards={retards} titre="retard" color="#FF6600" ></ChartDashboard>
                            {/* <ChartApex chargerChart={absences} ></ChartApex> */}
                            {/* <Chart
                                options={options}
                                series={series}
                                type="bar"
                                width="100%"
                                height={500}
                            /> */}
                            {/* <Bar options={optionschart} data={dataChart} /> */}

                        </div>
                        <div
                            style={{
                                width: "48%",
                            }}
                            sx={{

                            }}
                        >
                            <ChartDashboard donneesabsences={absences} titre="absence" color="#000000"></ChartDashboard>
                        </div>
                    </Box>

                </Grid>

            </Grid>

        </Layout>
    )
}

export default Dashbord;
