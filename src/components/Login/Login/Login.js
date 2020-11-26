import React, { useContext, useState } from 'react';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import firebase from 'firebase/app'
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import LoginBg from '../../../images/loginBg.png';
import { UserContext } from '../../../App';
import { Form } from 'react-bootstrap';
import './Login.css'



if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  //for login with username and password
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rewritePassword: ''
  })

  //for google login
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/dashboard/appointment" } };
  const [isAuth, setIsAuth] = useState(true)
  if(!isAuth){
      return <Redirect to="/"></Redirect>
  }

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      history.replace(from);
      storeAuthToken();
    }).catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }
  const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        history.replace(from);
      }).catch(function (error) {
        // Handle error
      });

  }

  //for email and password login method
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value;
      isFieldValid = isPasswordValid;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  //for sign out
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn: false,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          rewritePassword: '',
          error: '',
          success: false//showing successful msg after log in
        }
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
  }

  //handle submit
  const handleSubmission = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          //making the error message disappear after successful id creation
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          //showing success message
          newUserInfo.success = true;
          setUser(newUserInfo);
          alert(`User created successfully. Please log in to continue`);

        })
        .catch(error => {
          // Handle Errors here.
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ...
        });

    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          //making the error message disappear after successful id creation
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          //showing success message
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);//added this
          history.replace(from);
          console.log('sign in user info', res.user);
        })
        .catch(function (error) {
          // Handle Errors here.
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }
  // //updating user info 
  const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log('user name updated successfully');
      // Update successful.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  return (
    <div className="login-page container">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 shadow p-5">
          <div className="form-container">
            <Form onSubmit={handleSubmission}>
              <Form.Group controlId="formBasicEmail">
                {newUser && <h5>Create an account</h5>}
                {newUser && <label for="lastName">Name</label>}
                {newUser && <input type="text" onBlur={handleBlur} name="lastName" id="" placeholder="Name" required />}
                <label for="email">Username or Email</label>
                <input type="text" onBlur={handleBlur} name="email" id="" required placeholder="Email" />
                <label for="psw">Password</label>
                <input type="password" onBlur={handleBlur} name="password" id="" required placeholder="Password" />
              </Form.Group>
              <div className="checkBox">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group id="rememberMe" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label='Remember me' />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <a id="forgotPassword" href="#">Forgot Password</a>
                  </div>
                </div>
              </div>
              <input class="registerbtn" type="submit" value={newUser ? 'Sign up' : 'Sign in'} ></input>
              <p id="createAccount" name="newUser">Don't have an account?</p>
              <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser"></input>
              <label htmlFor="newUser" id="create-account">Create new account</label>
            </Form>
          </div>
          <div className="from-group mt-3">
            <button className="btn btn-brand" onClick={handleGoogleSignIn}> Sign in With Google</button>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block align-self-end">
          <img className="img-fluid" src={LoginBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;