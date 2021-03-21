import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// import DataTable from "./DataTable";

import CreateForm from "./CreateForm";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function HomePage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const create_user = () => {

    }

    return (
        <div>
            <Button style={{marginBottom: "10"}} variant="outlined" color="primary" onClick={handleClickOpen}>
                access admin panel
            </Button>

            <Button variant="outlined" color="secondary" onClick={props.signOut}>
                Sign Out
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Users
                        </Typography>
                        <Button autoFocus color="inherit" onClick={create_user}>

                        </Button>
                        <CreateForm createUser={props.createUser} error={props.error} removeError={props.removeError}/>
                    </Toolbar>
                </AppBar>
                {/*<DataTable rows={props.rows}/>*/}

            </Dialog>
        </div>
    );
}

export default HomePage;