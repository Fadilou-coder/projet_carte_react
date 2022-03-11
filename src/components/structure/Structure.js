
import { Box, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react'
import Layout from "../layout/Layout";
import StructureStyle from "./StructureStyle";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';

export const Structure = () => {

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

            nom: "Phoenix",

        },
        {
            id: 2,
            nom: "Phoenix",

        },
        {
            id: 3,
            nom: "Phoenix",
        },
        {
            id: 4,
            nom: "Phoenix",

        },
        {
            id: 5,
            prenom: "Fadilou",
            nom: "Phoenix",

        },
        {
            id: 6,
            prenom: "Fadilou",
            nom: "Phoenix",

        },
        {
            id: 7,
            nom: "Phoenix",

        }, {
            id: 8,
            nom: "Phoenix",

        },
        {
            id: 9,
            nom: "Phoenix",


        },

        {
            id: 10,
            nom: "Phoenix",

        },
        {
            id: 11,
            nom: "Phoenix",

        },

        {
            id: 12,
            nom: "Phoenix",

        },

    ];

    const columns = [
        {
            field: 'id',
            headerClassName: 'super-app-theme--header'
            ,
            headerName: 'ID',
            flex: 1
        },
        {
            field: 'nom',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom',
            flex: 1
        },


    ]
    // const { data } = useDemoData({
    //     dataSet: "Employee",
    //     rowLength: 100,
    //     maxColumns: 6
    // });
    const classes = StructureStyle();
    return (
        <Layout>

            <Box sx={{}} className={classes.structurePage} >

                <Box style={{ width: "100%" }}>
                    {/* Gestion de l'entete de la liste des Reservations */}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"

                    }} spacing={2}
                    >



                    </Box>

                    <Box sx={{
                        boxShadow: 1, borderRadius: "10px", paddingBottom: "20px",
                        '& .super-app-theme--header': {
                            backgroundColor: '#44C3CF',

                        },
                    }}
                         style={{
                             display:"flex",

                         }}
                         className={classes.tableau}>

                        <div style={{ width:"50%" }}>

                            <h1>SONATEL ACADEMY: LISTE DES STRUCTURES</h1>
                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" ,}}

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

                        <div style={{marginLeft:"100px",width:"40%",}}><div>

                            <h1>AJOUTER STRUCTURES</h1>

                        </div>
                            <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2}>

                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                                <TextField id="outlined-basic" label="Nom structure" variant="outlined" style={{width:"100%",height:"100%",}}/>
                            </Paper>
                            <div>
                                <Button variant="contained" style={{marginTop: "50px",margin: 'auto', display: "flex", backgroundColor: '#44C3CF'}}>AJOUTER</Button>

                            </div>
                        </div>

                    </Box>

                </Box>
            </Box>

        </Layout>
    )
}

export default Structure;
