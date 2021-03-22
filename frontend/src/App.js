import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SignIn from "./components/SignInForm";
import SignUp from "./components/SingUpForm";
import axios from "axios";
import HomePage from "./components/HomePage";

class App extends Component {
    api_url = 'http://127.0.0.1:8080/api/';

    state = {
        authorized: false,
        token: "",
        sign_in: false,
        sign_up: false,
        error: '',
        users: [],
    }

    singUpThenLogIn = (formInput) => {

        if (formInput.password !== formInput.password2) {
            this.setState({error: "make sure that the two passwords matches"});
            return;
        } else if (formInput.password.length < 6 || formInput.password.length > 40) {
            this.setState({error: "the length of the password must be between 6 and 40"});
            return;
        }

        axios.post(this.api_url + `auth/signup`, {
            "username": formInput.username,
            "password": formInput.password,
            "email": formInput.email
        })
            .then(
                () => {
                    // log the user in
                    this.log_in(formInput);
                    // clear any errors
                    this.setState({error: ''})
                }
            )
            .catch(
                (error) => this.setState({error: error.response.data.message})
            )
    }

    log_in = (formInput) => {
        axios.post(this.api_url + `auth/signin`, {
            "username": formInput.username,
            "password": formInput.password
        })
        .then(
            res => {
                // store the token
                this.saveToken(res.data.accessToken);
                // set authorised to true
                this.authorize();
                // clean any errors
                this.setState({error: ''})

                // get all list of all the users
                this.getAll();
            }
        ).catch(
            (error) => this.setState({error: error.response.data.message})
        )
    }

    authorize = () => {
        this.setState({authorized: true, sign_in: false, sign_up: false})
    }

    saveToken = (token) => {
        // store the token (TODO: properly do not it in the state anymore)
        this.setState({token: token})

        // added the token to the headers
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.state.token}`
        }
    }


    // display the SignIn form and logout if a user is signed in
    signIn = () => {
        this.setState({sign_in: true, sign_up: false, authorized: false, token: ''})
    }
    // display the SignUp form and logout if a user is signed in
    signUp = () => {
        this.setState({sign_up: true, sign_in: false, authorized: false, token: ''})
    }

    // signOut the user
    signOut = () => {
        this.setState({authorized: false, sign_in: false, sign_up: false, token: ''})
    }

    removeError = () => {
        this.setState({error: ""})
    }

    // gets all the users if the user is loged_in
    getAll = () => {
        if (this.state.token === '')
            return null;

        axios.get(this.api_url + `admin/user/`)
        .then(
            (res) => this.setState({users: res.data})
        )
        .catch(
            (error) => console.log(error.response.data.message)
        )
    }

    // creating a user from the admin panel
    createUser = (formInput) => {

        if (formInput.password !== formInput.password2) {
            this.setState({error: "make sure that the two passwords matches"});
            return;
        } else if (formInput.password.length < 6 || formInput.password.length > 40) {
            this.setState({error: "the length of the password must be between 6 and 40"});
            return;
        }

        axios.post(
            this.api_url + `admin/user/create/`,
            {
                "username": formInput.username,
                "password": formInput.password,
                "email": formInput.email
            }
        )
        .then(
            () => {
                this.setState({error: 'added'})
                // update the users table
                this.getAll();
            }
        )
        .catch(
            (error) => {
                console.log(error.response.data)
                this.setState({error: error.response.data.message})
            }
        )
    }

    editUser = (oldName, user) => {
        axios.put(
            this.api_url + `admin/user/edit/${oldName}`,
            {
                "username": user.username,
                "email": user.email
            }
        ).then(
            // update the users table
            () => this.getAll()
        )
        .catch(
            (error) => this.setState({error: error.response.data.message})
        )
    }

    deleteUser = (username) => {
        axios.delete(this.api_url + `admin/user/delete/${username}/`)
        .then(
            () => {
                this.getAll();
            }
        )
        .catch(
            (error) => console.log(error)
        )
    }

    render() {
        let body;
        if (this.state.authorized)
            body = <HomePage
                        createUser={this.createUser} editUser={this.editUser} deleteUser={this.deleteUser}
                        getAll={this.getAll} signOut={this.signOut}  users={this.state.users}
                        error={this.state.error} removeError={this.removeError}
            />;
        else if (this.state.sign_in)
            body = <SignIn log_in={this.log_in} saveToken={this.saveToken} error={this.state.error}/>
        else if (this.state.sign_up)
            body = <SignUp sign_up={this.singUpThenLogIn} saveToken={this.saveToken} error={this.state.error}/>
        else {
            body =
                <Box m={2} p={5} width={1 / 2}>
                    <Box height="100%">
                        <Paper elevation={10}>
                            <Box p={1} pt={5} textAlign="center">
                                <h3>already a user?</h3>
                                <Button variant="outlined" color="primary" onClick={this.signIn}>Sing in</Button>
                            </Box>
                            <Box p={1} pb={5} textAlign="center">
                                <h3>Not a user?</h3>
                                <Button variant="outlined" color="primary" onClick={this.signUp}>signup</Button>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
        }

        return (
            <div className="App">
                {/*the grid to center the body*/}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: '100vh'}}
                >
                    {body}
                </Grid>
            </div>
        )
    }


}

export default App;
