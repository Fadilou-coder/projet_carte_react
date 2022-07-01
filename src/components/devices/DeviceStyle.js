import { makeStyles } from "@material-ui/core";

const DeviceStyle = makeStyles((theme) => ({

    DevicePage: {
        width: "100%",
    },
    DeviceDiv: {
        display: "flex",
        gap: "100px",
        width: "100%",
        flexWrap: 'wrap',
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column-reverse",
            gap:"30px"
        },

    },
    contentDiv: {
        width: "42%",
        [theme.breakpoints.down('sm')]: {
            width: "100%",

        },
    }

}));

export default DeviceStyle;
