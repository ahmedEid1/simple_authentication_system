import React, {useReducer} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function EditForm(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // clean any errors
        props.removeError();
        setOpen(false);
        // update to the user values
        setFormInput({username: props.user.username, email: props.user.email})
    };

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            username: props.user.username,
            email: props.user.email,
        }
    );

    const handleInput = e => {
        const name = e.target.name;
        const newValue = e.target.value;
        setFormInput({ [name]: newValue });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.editUser(props.user.username, formInput);
    }

    let alert = null;
    if (props.error)
        alert = <Alert severity="error">{props.error}</Alert>;

    return (
        <div style={{display: "inline", margin: '5px'}}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h3>Edit User</h3>
                    </DialogContentText>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        {alert}
                        <TextField
                            defaultValue={props.user.username}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleInput}
                        />

                        <TextField
                            defaultValue={props.user.email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="email"
                            type="email"
                            id="email"
                            autoComplete="current-password"
                            onChange={handleInput}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Edit
                        </Button>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditForm;