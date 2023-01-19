import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, Grid } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};
interface ModalI {
    name: String,
    cb: any,
    setOpen: any,
}
const Modal: React.FC<ModalI> = ({ name, cb, setOpen }) => {
    const handleCancel = () => {
        setOpen(false);
    }
    const handleDelete = () => {
        cb()
    }

    return (
        <Card >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirm the action
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
                    {`Do you really want to delete the ${name}?`}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12} >
                        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Button variant="contained" onClick={handleDelete} sx={{ background: "red" }}>Delete</Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
export default Modal;