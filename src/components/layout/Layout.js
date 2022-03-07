import React, {useState} from 'react';
import {LayoutStyle} from "./LayoutStyle";
import LeftBar from "../bars/leftbar/LeftBar";
import Topbar from "../bars/topbar/Topbar";



const Layout = ({children}) => {
    const classes = LayoutStyle();
    const [isMobile, setIsMobile] = useState(false);
    const funcSetIsMobile = () => {
        setIsMobile(!isMobile);
    }
     return(
         <div className={classes.root}>
             <LeftBar isMobile={isMobile}
                      funcSetIsMobile={funcSetIsMobile}
             />
             <Topbar funcSetIsMobile={funcSetIsMobile}/>
             <main>
                 <div className={classes.topbarWidth}/>
                 {children}
             </main>
         </div>
     )
}
export default Layout;
