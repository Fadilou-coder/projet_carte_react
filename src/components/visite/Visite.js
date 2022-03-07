import { FilterAltOutlined, Person } from "@mui/icons-material";
import { Box, Grid, MenuItem, Select, Stack } from "@mui/material";
import Navbar from "../navbar/Navbar";
import visiteStyle from "./Visite.style"

const Visite = () => {
    const classes = visiteStyle();
    return (
        <Grid container>
            <Navbar>

            </Navbar>
            <Box sx={{ marginLeft: "240px", padding: "12px" }} >
                <Box >
                    {/* Gestion de l'entete de la liste des Reservations */}
                    <Grid>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center" spacing={2}>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                color: "gray"
                            }}
                            >
                                <FilterAltOutlined></FilterAltOutlined>
                                Filter
                            </div>

                            <div>
                                date
                            </div>
                            <div>
                                <Select
                                    value="default"
                                    defaultValue="Apprenant"
                                    // onChange={handleChange}
                                    // displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </div>
                        </Stack>
                    </Grid>
                </Box>
            </Box>
        </Grid >
    )
}

export default Visite;