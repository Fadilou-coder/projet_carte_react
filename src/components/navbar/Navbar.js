import {  PersonRounded } from "@material-ui/icons";
import { CalendarViewDaySharp, FormatListBulletedSharp, SchoolRounded } from "@mui/icons-material";
import {  Box,  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import logo from "../../assets/images/logoODC.png";


const drawerWidth = 240;


const Navbar = () => {

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Stack
                    sx={{
                        paddingTop: "50px"
                    }}>
                    <Box
                        sx={{
                            paddingLeft: "20px"
                        }}
                    >
                        <img style={{ width: "80%" }} src={logo} alt="" />
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            <List sx={{ padding: "20px 0 0 12px", color: "gray" }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CalendarViewDaySharp />
                                        </ListItemIcon>
                                        <ListItemText primary="Visites" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PersonRounded />
                                        </ListItemIcon>
                                        <ListItemText primary="Admin" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <SchoolRounded />
                                        </ListItemIcon>
                                        <ListItemText primary="Apprenants" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FormatListBulletedSharp />
                                        </ListItemIcon>
                                        <ListItemText primary="Structure" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                    </Box>

                </Stack>

            </Drawer>

        </div>
    );
}


export default Navbar;