import React, {Component} from "react";
import  {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SignIn from "./components/SignInForm";
import SignUp from "./components/SingUpForm";
import axios from "axios";
import HomePage from "./components/HomePage";

class App extends Component{

  state = {
    // the user is authorized
    authorized: false,
    // jwt token
    token: "",
    // the signIn form
    sign_in: false,
    // the signUp form
    sign_up: false,
    error: ''
  }

  singUpThenLogIn = (formInput) => {

    if (formInput.password !== formInput.password2) {
      this.setState({error: "make sure that the two passwords matches"});
      return;
    }
    else if (formInput.password.length < 6 || formInput.password.length > 40) {
      this.setState({error: "the length of the password must be between 6 and 40"});
      return;
    }

    axios.post(this.api_url + `auth/signup`, {
      "username": formInput.username,
      "password": formInput.password,
      "email": formInput.email
    })
    .then(
        (res) => {
          this.getAll();
          this.log_in(formInput);
          console.log(res)
          this.setState({error: ''})
        }
    )
    .catch(
        (error) => {
          console.log(error.response.data)
          this.setState({error: error.response.data.message})}
    )
  }

  log_in = (formInput) => {

    axios.post(this.api_url + `auth/signin`, {
      "username": formInput.username,
      "password": formInput.password
    })
        .then(res => {
          if (res.status === 200) {
            const accessToken = res.data.accessToken;
            this.saveToken(accessToken);
            this.authorize();
            this.setState({error: ''})

          } else {
            this.setState({error: "the user name or the password is wrong!"})
          }

        }).catch(
          (res) => this.setState({error: "the user name or the password is wrong!"})

    )

  }
  // authorize the user
  authorize = () => {
    this.setState({authorized: true, sign_in: false, sign_up: false})
  }
  // called after singIn request to store the token
  saveToken = (token) => {
    this.setState({token: token})
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`
    }
    this.getAll();
  }

  api_url = 'http://127.0.0.1:8080/api/';

  // display the SignIn form
  signIn = () => {
    this.setState({sign_in: true, sign_up: false, authorized: false, token: ''})
  }
  // display the SignUp form
  signUp = () => {
    this.setState({sign_up: true, sign_in: false, authorized: false, token: ''})
  }

  // signOut the user
  signOut = () => {
    this.setState({authorized: false, sign_in: false, sign_up: false, token: ''})
  }


  // gets all the users if the user is loged_in and set the authorization token in the header
  getAll = () => {
      console.log("called")
    if (this.state.token === '')
      return null;

    axios.get(this.api_url + `admin/user/`
    ).then(
        (res) => {
          this.setState({users: res.data})
          console.log(this.state.users)
        }
    ).catch(
        () => console.log("sever error")
    )
  }

  // get one user using ID
  getOne = (id) => {
    if (this.state.token === '')
      return null;

    axios.get(this.api_url + `admin/user/${id}/`
    ).then(
        // send the user list to the dataGrid through the dialog
        (res) => console.log(res)
    )
  }

  createUser = (formInput) => {

    if (formInput.password !== formInput.password2) {
      this.setState({error: "make sure that the two passwords matches"});
      return;
    }
    else if (formInput.password.length < 6 || formInput.password.length > 40) {
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
    ).then(
        (res) => {
          this.setState({error: 'added'})
          this.getAll();
          console.log(this.state.users)
        }
    )
        .catch(
            (error) => {
              console.log(error.response.data)
              this.setState({error: error.response.data.message})}
        )
  }

  editUser = (oldName, user) => {
    console.log(user)
    axios.put(
        this.api_url + `admin/user/edit/${oldName}`,
        {
            "username": user.username,
            "email": user.email
        }
    ).then(
        // send the user list to the dataGrid through the dialog
        (res) => {
          this.getAll();
        }
    ) .catch(
        (error) => this.setState({error: error.response.data.message})
    )
  }

  deleteUser = (username) => {
    axios.delete(this.api_url + `admin/user/delete/${username}/`)
        .then(
            res => {
              this.getAll();
            }
        ).catch((error) => console.log(error))
  }

  removeError = () => {
    this.setState({error: ""})
  }

  render() {

    let body = null;
    if (this.state.authorized) {
      body = <HomePage editUser={this.editUser} deleteUser={this.deleteUser} createUser={this.createUser} signOut={this.signOut} getAll={this.getAll} users={this.state.users} error={this.state.error} removeError={this.removeError} />;
    }
    else if (this.state.sign_in) {
      body = <SignIn log_in={this.log_in} saveToken={this.saveToken} error={this.state.error}/>
    }
    else if (this.state.sign_up) {
      body = <SignUp sign_up={this.singUpThenLogIn} saveToken={this.saveToken} error={this.state.error}/>
    }
    else {
      body =
          <Box m={2} p={5} width={1/2}>
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
              style={{ minHeight: '100vh' }}
          >
            {body}
          </Grid>
        </div>

    )
  }


}

export default App;
