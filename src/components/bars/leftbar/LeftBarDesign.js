import React from 'react'
import sonatelLogo from "../../../assets/images/logo_ODC.png"
import { Avatar, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { LeftBarStyle } from "./LeftBarStyle";
import { LeftBarData } from './LeftBarData';
import { useHistory, useLocation } from "react-router-dom";

const LeftBarDesign = () => {
    const classes = LeftBarStyle();
    const history = useHistory();
    const location = useLocation();

    const user = localStorage.getItem('user');

    const myTab = LeftBarData.map((item, key) =>
        (item.showBySuperAdmin === true && user.includes("SUPER_ADMIN")) ? (
            item.after ? (
                <ListItem
                    key={key}
                    button
                    //key={item.id}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : classes.notActive}
                >
                    <ListItemIcon className={classes.linkIcon}>{item.icon}</ListItemIcon>
                    <ListItemText>
                        <Typography style={{ color: "#000000", fontWeight: "bold", fontFamily: "Open Sans, Arial" }} >
                            {item.title}
                        </Typography>
                    </ListItemText>
                </ListItem>
            ) : null
        ) : (item.showByAdmin === false && user.includes("ADMIN")) ? (
            item.after ? (
                <ListItem
                    key={key}
                    button
                    //key={item.id}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : classes.notActive}
                >
                    <ListItemIcon className={classes.linkIcon}>{item.icon}</ListItemIcon>
                    <ListItemText>
                        <Typography style={{ color: "#000000", fontWeight: "bold", fontFamily: "Open Sans, Arial" }} >
                            {item.title}
                        </Typography>
                    </ListItemText>
                </ListItem>
            ) : null
        ) : "nono"
    )

    return (
        <div>
            <div className={classes.logoDiv}>
                <Avatar alt='Sonatel Academy' src={sonatelLogo} variant="square"
                    className={classes.logoStyle} />
            </div>
            {myTab}
        </div>
    )
}

export default LeftBarDesign
