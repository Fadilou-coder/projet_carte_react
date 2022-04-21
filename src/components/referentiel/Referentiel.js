import React from 'react'
import Typography from "@mui/material/Typography";
import Layout from "../layout/Layout";

const Referentiel = () => {
    
    return (
        <Layout>
            <Typography variant="h1">Referentiel</Typography>


            <div>

                <Typography
                    variant='h5'
                    style={{
                        marginBottom: "20px",
                        borderLeft: "6px solid #000000",
                        color: "#000000",
                        paddingLeft: "20px",
                        fontWeight: "bolder"
                    }}>
                    LISTE DES STRUCTURES
                </Typography>



            </div>
        </Layout>
    )



}



export default Referentiel
