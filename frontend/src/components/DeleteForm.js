import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Alert from "@material-ui/lab/Alert";

function DeleteForm(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // clean any errors
        props.removeError();
        setOpen(false);
    };

    const handleDelete = () => {
        props.deleteUser(props.username)
    }

    let alert = null;
    if (props.error)
        alert = <Alert severity="error">{props.error}</Alert>;

    return (
        <div style={{display: "inline"}}>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                <HighlightOffIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    {alert}
                    <DialogContentText>
                        <h3>Are you sure you want to delete this user?</h3>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteForm;