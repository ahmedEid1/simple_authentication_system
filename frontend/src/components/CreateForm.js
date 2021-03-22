import React, {useReducer} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from "@material-ui/icons/AddCircle";
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

function CreateForm(props) {
    const classes = useStyles();

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            username: "",
            password: "",
            password2: "",
            email: "",
        }
    );

    const handleInput = e => {
        const name = e.target.name;
        const newValue = e.target.value;
        setFormInput({ [name]: newValue });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.createUser(formInput);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    let alert = null;

    const handleClose = () => {
        props.removeError();
        alert = null;
        setOpen(false);
    };

    if (props.error === "added") {
        alert = <Alert severity="success">{props.error}</Alert>;
    }
    else if (props.error)
        alert = <Alert severity="error">{props.error}</Alert>;

    return (
        <div>
            <Button variant="contained" color="primary"  onClick={handleClickOpen}>
                <AddCircleIcon /> Create new user
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create New Users ^_^
                    </DialogContentText>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {alert}
                        <TextField
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

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInput}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Renter Password"
                            type="password"
                            id="password2"
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
                            <AddCircleIcon /> add user
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

export default CreateForm;