import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar } from "@material-ui/core";
import { TopbarStyle } from "./TopbarStyle";
import MenuIcon from '@material-ui/icons/Menu'
import styled from "styled-components";
import { Typography, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import { SearchOutlined } from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';


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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <AppBar position="fixed" sx={{ with: "100%" }}   >
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }} className={classes.topbar}>
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
                                placeholder="username"
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
                        <Button aria-describedby={id}  onClick={handleClick}>
                            <AvatarContainer>
                                <AvatarLabel>
                                    <Avatar
                                        style={{ marginRight: "14px" }}
                                        alt="Jack Sparrow"
                                        src="https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                    />
                                    <Typography variant="body2" style={{ color: "white" }} >Baye Niass</Typography>
                                </AvatarLabel>
                            </AvatarContainer>
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
                                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                </Popover>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar;
