import React from 'react';
import {AppBar, Toolbar, IconButton, Avatar} from "@material-ui/core";
import {TopbarStyle} from "./TopbarStyle";
import MenuIcon from '@material-ui/icons/Menu'
import logoSonatel from "../../../assets/images/logoSonatel.png"
import navLogo from "../../../assets/images/navLogo.jpeg"
import styled from "styled-components";
import {Typography} from "@mui/material";

const Topbar = ({funcSetIsMobile}) => {
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
    return(
        <div>
            <AppBar position="fixed" elevation={1}>
                <Toolbar className={classes.topbar}>
                   <IconButton
                       onClick={funcSetIsMobile}
                       className={classes.topbarContent}>
                       <MenuIcon/>
                   </IconButton>
                    <div className={classes.topbarContent}>
                        <Avatar variant="square" alt="Sonatel Academy"
                        src={logoSonatel} className={classes.topbarLogo}
                        />
                    </div>
                    <div className={classes.avatar}>
                        <AvatarContainer>
                            <AvatarLabel>
                                <Avatar
                                    style={{ marginRight: "14px" }}
                                    alt="Jack Sparrow"
                                    src="https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                />
                                <Typography variant="body2">Baye Niass</Typography>
                            </AvatarLabel>
                        </AvatarContainer>
                       {/* <Avatar
                            sx={{
                                height: 50,
                                width: 50,
                                ml: 1,
                            }}
                            src={navLogo}
                        >
                             <UserCircleIcon fontSize="small" />
                        </Avatar>*/}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar;
