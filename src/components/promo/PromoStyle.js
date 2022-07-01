import { makeStyles } from "@material-ui/core";

const PromoStyle = makeStyles((theme) => ({

    content: {
        width: "100%",
    },
    item: {
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
    container: {
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            width: "100%",

        },
    },
    SearchAndAdd: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            // backgroundColor: 'green',
            display: "block",

        },
    },
    tableau: {
            boxShadow: 1, 
            borderRadius: "10px", 
            paddingBottom: "20px",
            marginTop: '20px',
            '& .super-app-theme--header': {
                backgroundColor: '#696969',
                color: "#FFFFFF",
                fontWeight: "bold",
                textTransform: "uppercase"
            },
    },
    lineHr:{
        borderTop: " 4px solid #FF6600", 
        width: "20%", 
        float: "left", 
        marginLeft: "15px"
    },
    formError:{
        color: 'red'
    }
}));

export default PromoStyle;
