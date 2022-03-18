import React, { useState } from 'react';
import { LayoutStyle } from "./LayoutStyle";
import LeftBar from "../bars/leftbar/LeftBar";
import Topbar from "../bars/topbar/Topbar";



const Layout = ({ children }) => {
    const classes = LayoutStyle();
    const [isMobile, setIsMobile] = useState(false);
    const funcSetIsMobile = () => {
        setIsMobile(!isMobile);
    }



    return (
        <div className={classes.root}>
            {(localStorage.getItem("user") === '["SUPER_ADMIN"]') ?
                <LeftBar isMobile={isMobile}
                    funcSetIsMobile={funcSetIsMobile}
                /> : null
            }
            <Topbar funcSetIsMobile={funcSetIsMobile} />
            <main className={classes.children}>
                <div className={classes.topbarWidth} />
                {/*Affic  */}

                {children}

            </main>
        </div>
    )
}
export default Layout;
