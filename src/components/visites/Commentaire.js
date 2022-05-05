import React, { useState } from 'react'
import {IconButton} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import VisiteStyle from './VisiteStyle';
import { Button, Grid } from '@mui/material';

const Commentaire = (props) => {
    
    const [showDialog, setShowDialog] = useState(false);

    const classes = VisiteStyle() 


    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setShowDialog(false)
    }

    return (
            <>
             <div className="Comment-text">
                {console.log(props)}
            </div>
            <DialogTitle variant="h4" className={classes.textTypo} style={{ color: "#FFFFFF", paddingLeft: "20px" }}>
            COMMENTAIRE
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    float: 'right'
                }}

                style={{ color: '#FFFFFF' }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle><hr style={{ borderTop: " 4px solid #F48322", width: "20%", float: "left", marginLeft: "15px" }} /><DialogContent>
                <Grid>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={15}
                        placeholder="comment"
                        style={{ width: 300, borderRadius: '5px' }} />
                </Grid>
                <DialogActions>
                    <Button
                        sx={{
                            backgroundColor: "#FF6600",
                            fontFamily: "Arial",
                            fontSize: "16px",
                            color: "#000000",
                            fontWeight: "bold",
                            right: "80px",
                            marginTop: "15px",
                            '&:hover': {
                                backgroundColor: "#FFFFFF",
                                pointer: "cursor",
                                color: "#000000"
                            }
                        }}
                    >
                        COMMENTER
                    </Button>
                </DialogActions>
                <div className={classes.comment}>
                    <p style={{ color: "#FFFFFF" }}>Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
                    <p style={{ color: "#FFFFFF" }}>Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
                    <p style={{ color: "#FFFFFF" }}>Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
                </div>
            </DialogContent></>
    )            
}

export default Commentaire
