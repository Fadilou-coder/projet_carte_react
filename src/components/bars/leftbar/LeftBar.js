import React from 'react';
import {Drawer, Hidden} from "@material-ui/core";
import {LeftBarStyle} from "./LeftBarStyle";
import LeftBarDesign from "./LeftBarDesign";
import {useMediaQuery} from "react-responsive";


const LeftBar = ({isMobile, funcSetIsMobile}) => {
    const classes = LeftBarStyle();

    //const theme = useTheme();
    //const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const isMatch = useMediaQuery({query: '(max-width: 500px)'})
    return(
        isMatch ? (
                <div>
                    <nav className={classes.drawer}>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open
                                anchor="left"
                                classes = {{paper: classes.drawerPaperSm}}
                            >
                                <LeftBarDesign/>
                            </Drawer>
                        </Hidden>
                        <Drawer
                            variant="temporary"
                            open ={isMobile}
                            anchor="left"
                            classes = {{paper: classes.drawerPaperSm}}
                            onClick={funcSetIsMobile}
                        >
                            <LeftBarDesign/>
                        </Drawer>
                    </nav>
                </div>
        ) :
        <div>
            <nav className={classes.drawer} sx={{marginTop:'20px'}}>
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
