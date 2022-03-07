import React from 'react';
import {Drawer, Hidden} from "@material-ui/core";
import {LeftBarStyle} from "./LeftBarStyle";
import LeftBarDesign from "./LeftBarDesign";


const LeftBar = ({isMobile, funcSetIsMobile}) => {
    const classes = LeftBarStyle();
    return(
        <div>
            <nav className={classes.drawer}>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        anchor="left"
                        classes = {{paper: classes.drawerPaper}}
                    >
                        <LeftBarDesign/>
                    </Drawer>
                </Hidden>
                <Drawer
                    variant="temporary"
                    open ={isMobile}
                    anchor="left"
                    classes = {{paper: classes.drawerPaper}}
                    onClick={funcSetIsMobile}
                >
                   <LeftBarDesign/>
                </Drawer>
            </nav>
        </div>
    )
}

export default LeftBar;
