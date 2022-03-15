
import { Box, Button, Pagination, PaginationItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react'
import Layout from "../layout/Layout";
import StructureStyle from "./StructureStyle";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
    DataGrid, GridApi, GridCellValue,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import {ListAllVisite} from "../visites/VisiteService";
import {Addstructure, ListAllStructure} from "./StructureService";
import {Typography} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";



export const Structure = () => {

    const [structure, setStructure] = React.useState([]);
    const [nomStructure, setNomStructure] = React.useState({ nomStructure: ''});
    React.useEffect(()=> {
            ListAllStructure().then(response => {setStructure(response.data)})
        }, []
        );
    function AddStructure (){
        Addstructure(nomStructure).then(response => {
            ListAllStructure().then(response => {setStructure(response.data)})
            setNomStructure({ nomStructure: ''});
        });
    }

    function BloquerSstructure() {

    }



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

    const columns = [
        {
            field: 'nomStructure',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nom Stucture',
            flex: 1
        },
        {
            field: 'blocked',
            headerClassName: 'super-app-theme--header',
            headerName: 'Blocked ?',
            editable: true,
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );

                    return alert(JSON.stringify(thisRow, null, 4));
                };

                return <Button variant="contained" style={{backgroundColor: 'red'}} onClick={AddStructure}>Bloquer</Button>;
            }
        },


    ]
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
                            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                                LISTE DES VISITEURS
                            </Typography>


                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" ,}}

                                autoHeight
                                pageSize={6}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Pagination: CustomPagination,
                                }}
                                rows={structure}
                                columns={columns}
                            />
                        </div>

                        <div style={{marginLeft:"100px",width:"40%",}}><div>

                            <Typography variant='h4' style={{ marginBottom: "20px", borderLeft: "6px solid gray", color: "gray", paddingLeft: "20px" }}>
                                LISTE DES VISITEURS
                            </Typography>

                        </div>
                            <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2}>

                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                                <TextField
                                    id="outlined-basic"
                                    label="Nom structure"
                                    variant="outlined"
                                    style={{width:"100%",height:"100%",}}
                                    value={nomStructure.nomStructure}
                                    onChange={(event) => setNomStructure({
                                        ...nomStructure,
                                        nomStructure: event.target.value
                                    })}
                                />
                            </Paper>
                            <div style={{marginTop: "20px"}}>
                                <Button disabled={nomStructure.nomStructure === ''} variant="contained" style={{marginTop: "50px",margin: 'auto', display: "flex", backgroundColor: '#44C3CF'}} onClick={AddStructure}>AJOUTER</Button>

                            </div>
                        </div>

                    </Box>

                </Box>
            </Box>

        </Layout>
    )
}

export default Structure;