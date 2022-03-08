import { DocumentScannerOutlined, FilterAltOutlined, PersonOutline } from '@mui/icons-material';
import { Box, InputAdornment, MenuItem, Select, Stack, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react'
import Layout from "../layout/Layout";
import VisiteStyle from "./VisiteStyle";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useDemoData } from "@mui/x-data-grid-generator";

export const Visites = () => {
    const [visiteur, setVisiteur] = React.useState("apprenant");

    // Date du jour 
    const [value, setValue] = React.useState(new Date());

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
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 2,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 3,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 4,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 5,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 6,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 7,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        }, {
            id: 8,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 9,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },

        {
            id: 10,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },
        {
            id: 11,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },

        {
            id: 12,
            prenom: "Fadilou",
            nom: "Sy",
            cni: "13456789012",
            dateEntree: "12h:33mn",
            dateSortie: "20h:44mn"
        },

    ];

    const columns = [
        {
            field: 'id',
            headerClassName: 'super-app-theme--header'
            ,
            headerName: 'ID'
        },
        {
            field: 'prenom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Prenom',
            width: 320
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            width: 220
        },
        {
            field: 'cni',
            headerClassName: 'super-app-theme--header',
            headerName: 'Cni',
            width: 220
        },
        {
            field: 'dateEntree',
            headerClassName: 'super-app-theme--header',
            headerName: 'Entree',
            width: 175
        },
        {
            field: 'dateSortie',
            headerClassName: 'super-app-theme--header',
            headerName: 'Sortie',
            width: 175
        },

    ]
    // const { data } = useDemoData({
    //     dataSet: "Employee",
    //     rowLength: 100,
    //     maxColumns: 6
    // });
    const classes = VisiteStyle();
    return (
        <Layout>

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
                            direction="row" spacing={5} justifyContent="center" alignItems="center"

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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyy"
                                        className={classes.visiteur}
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                        svg: { color: "#44C3CF" },
                                                        input: { color: "#787486", fontWeight: "bold" },
                                                        label: { color: "#44C3CF" },
                                                        border: "2px solid #44C3CF",
                                                        width: "15vw",
                                                        borderRadius: "15px"
                                                    }}
                                                />
                                            );
                                        }}
                                    // renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <Select
                                    value={visiteur}
                                    style={{ width: "15vw", fontWeight: "bolder", color: "#787486", borderRadius: "15px" }}
                                    onChange={(event) => setVisiteur(event.target.value)}
                                    className={classes.visiteur}

                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonOutline sx={{ color: "#44C3CF" }} ></PersonOutline>
                                        </InputAdornment>}

                                >
                                    <MenuItem value="">
                                        <em>Tous</em>
                                    </MenuItem>
                                    <MenuItem value={"apprenant"}>Apprenant</MenuItem>
                                    <MenuItem value={"visiteur"}>Visiteur</MenuItem>
                                </Select>
                            </div>
                        </Stack>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#138A8A", padding: "2vh 2vw", fontWeight: "bolder" }}
                                endIcon={<DocumentScannerOutlined />}
                            >
                                Impression
                            </Button>
                        </div>

                    </Box>

                    <Box sx={{
                        boxShadow: 1, borderRadius: "10px", paddingBottom: "20px",
                        '& .super-app-theme--header': {
                            backgroundColor: '#44C3CF',
                        },
                    }} className={classes.tableau}>

                        <div style={{ width: "100%" }}>
                            <h1> Liste du {value.toLocaleString("fr-FR").split(',')[0]}</h1>
                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" }}

                                autoHeight
                                pageSize={6}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Pagination: CustomPagination,
                                }}
                                rows={data}
                                columns={columns}
                            />
                        </div>

                    </Box>

                </Box>
            </Box>

        </Layout>
    )
}

export default Visites;
