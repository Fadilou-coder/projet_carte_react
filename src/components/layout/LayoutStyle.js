import {makeStyles} from "@material-ui/core";

export const LayoutStyle = makeStyles((theme)=> ({
    root: {
        display:"flex",
    },
    children : {
        width:"100%",
        padding:"50px 20px 0 20px"
    },
    topbarWidth: theme.mixins.toolbar
}));
