import React, {useReducer} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Alert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = (props) => {

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

    let alert = null;

    const handleSubmit = e => {
        e.preventDefault();
        props.sign_up(formInput);
    };

    const handleInput = e => {
        const name = e.target.name;
        const newValue = e.target.value;
        setFormInput({ [name]: newValue });
    };


    if (props.error)
        alert = <Alert severity="error">{props.error}</Alert>;

    return (

        <Container component="main" maxWidth="xs">

            <CssBaseline />

            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <AddBoxOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                {/*if login fail*/}
                {alert}

                <form className={classes.form} onSubmit={handleSubmit}>

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
                        Sign Up
                    </Button>

                    <a href="/">
                        <Button fullWidth>
                            <ArrowBackIosIcon />
                        </Button>
                    </a>

                </form>

            </div>

        </Container>

    );
}

export default SignUp;