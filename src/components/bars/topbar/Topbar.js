import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar } from "@material-ui/core";
import { TopbarStyle } from "./TopbarStyle";
import MenuIcon from '@material-ui/icons/Menu'
import styled from "styled-components";
import { Typography, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import { SearchOutlined } from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useHistory } from "react-router-dom";
import { FindById, FindBySuperAdminId } from '../../admin/AdminService'

const Topbar = ({ funcSetIsMobile }) => {
    const classes = TopbarStyle();
    const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 14px;
  & > * {
    margin: 4px;
  }
`;
    const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
`;

    const [anchorEl, setAnchorEl] = React.useState(false);
    const [admin, setAdmin] = React.useState({});

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/')
    }

    React.useEffect(() => {
        if (localStorage.getItem('user') === '["ADMIN"]') {
            FindById(localStorage.getItem('id')).then(res => {
                setAdmin(res.data);
            })
        }else{
            FindBySuperAdminId(localStorage.getItem('id')).then(res => {
                setAdmin(res.data);
            })
        }
    }, []
    );


    return (
        <div>
            <AppBar position="fixed" sx={{ with: "100%" }}   >
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }} className={localStorage.getItem('user') === '["ADMIN"]' ? classes.topbarAdmin : classes.topbar}>
                    <IconButton
                        onClick={funcSetIsMobile}
                        className={classes.topbarContent}
                    >
                        <MenuIcon />
                    </IconButton>

                    <div className={classes.mysearch}>
                        <FormControl sx={{ m: 1 }}>
                            <OutlinedInput
                                id="email"
                                placeholder="rechercher"
                                width="small"
                                size='small'
                                style={{ backgroundColor: "white", borderRadius: "50px", marginLeft: "100px" }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchOutlined></SearchOutlined>
                                    </InputAdornment>

                                }

                            // onChange={handleUsernameChange}

                            />
                        </FormControl>
                    </div>
                    <div className={classes.avatar}>
                        <Button aria-describedby={id} onClick={handleClick}>
                            <AvatarContainer>
                                <AvatarLabel>
                                    <Avatar
                                        style={{ marginRight: "14px" }}
                                        src=""
                                    />
                                    <Typography variant="body2" style={{ color: "white" }} >{admin.prenom} {admin.nom}</Typography>
                                </AvatarLabel>
                            </AvatarContainer>
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {/* <Button variant="text" sx={{ color: "#000000"}}><PersonIcon marginLeft='5px'/>Profil</Button> */}
                            <Button variant="text" sx={{ color: "#000000" }}
                                onClick={logout}
                            ><ExitToAppRoundedIcon marginLeft='5px' />Déconnexion</Button>

                        </Popover>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar;
