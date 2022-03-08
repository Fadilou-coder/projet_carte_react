import React from 'react'
import sonatelLogo from "../../../assets/images/sonatelLogo.png"
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {LeftBarStyle} from "./LeftBarStyle";
import {LeftBarData} from './LeftBarData';
import {useHistory, useLocation} from "react-router-dom";

const LeftBarDesign = () => {
    const classes = LeftBarStyle();
    const history = useHistory();
    const location = useLocation();

    return(
        <div>
            <div className={classes.logoDiv}>
                <Avatar alt='Sonatel Academy' src={sonatelLogo} variant="square"
                className={classes.logoStyle}
                />
            </div>
                {
                    LeftBarData.map(item =>(
                        <ListItem
                             button
                             key={item.id}
                             onClick={()=>history.push(item.path)}
                             className={location.pathname === item.path ? classes.active : classes.notActive}
                        >
                            <ListItemIcon className={classes.linkIcon}>{item.icon}</ListItemIcon>
                            <ListItemText>{item.title}</ListItemText>
                        </ListItem>
                    ))
                }
        </div>
    )
}

export default LeftBarDesign
