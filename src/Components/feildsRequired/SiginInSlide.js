// import * as React from "react";
import React, { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { withFormik } from "formik";
import * as yup from "yup";
import { withStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Signin.css";
import { dataServices } from "../Dataservices/dataServices";
import { Toast } from "react-bootstrap";
import MainLoader from "../Loader/loader";
import Courosol from "../feildsRequired/Courosol"

// import "../../Assets/pic1.jpg"


const theme = createTheme();

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50,
  },
  container: {
    display: "Flex",
    justifyContent: "center",
  },
  actions: {
    float: "right",
  },
});
const SignInSide = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  const [firstpageSignup, setfirstpageSignup] = useState(true);
  const [ClientCode, setClientCode] = useState("");
  const [password, setpassword] = useState("");
  const [ClientCodeError, setClientCodeError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [toastIn, setToastIn] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [mgs, setMsg] = useState("");


  const toastClose = () => {
    setToastIn(false);
  };

  const HandleInputChange = (e) => {
    if (e.target.name === "ClientCode") {
      setClientCode(e.target.value)
      setClientCodeError(false)
      document.getElementById("ClientCode")?.classList.remove("validation_error");
    } else if (e.target.name === "password") {
      setpassword(e.target.value)
      setpasswordError(false)
      document.getElementById("password").classList.remove("validation_error");
    }

  };

  // const toastClose = () => {
  //   setToastIn(false);
  // };

  const IsTagFormValid = () => {
    debugger
    let isValid = true;
    if (ClientCode === null || ClientCode.length <= 0) {
      isValid = false;
      setClientCodeError(true)
      document.getElementById("ClientCode").classList.add("validation_error");
    }

    if (password == null || password.length <= 0) {
      isValid = false;
      setpasswordError(true)
      document.getElementById("password").classList.add("validation_error");
    }

    return isValid;
  };



  const onHandleNextSigninPage = (e) => {
    debugger
    e.preventDefault()
    let valid = IsTagFormValid()
   
    if (valid) {
      setLoader(true)
      let data = {
        "clientCode": ClientCode,
        "password": password
      }
      dataServices
        .ClientLogin(data)
        .then((data) => {
         
          // debugger
          if (data.status === true && data.data !== null) {
            setToastIn(true)
            setToastError(false)
            setMsg("Success")
            window.location = "/Pan"
            setLoader(false)
            localStorage.setItem("email", data.data.emailID);
            localStorage.setItem("token", data.token);

            localStorage.setItem("clientCode", data.data.clientCode);
            localStorage.setItem("firstName", data.data.firstName);
            localStorage.setItem("lastName", data.data.lastName);
           
          }
          else{
            setLoader(false)
            setToastIn(true)
            setToastError(true)
            setMsg("Something went Wrong !!")
          }
        })
        .catch((error) => {
          console.log("GetMenuItem Error : ", error);
          setLoader(false)
          setToastIn(true)
          setToastError(true)
          setMsg("Something went Wrong !!")
        });
    }
  }



  return (
    <>
    
      <ThemeProvider theme={theme}>
        <div>
      <Toast
          className=" m-1 toastPopup"
          bg={toastError ? "danger" : "success"}
          onClose={() => toastClose(false)}
          show={toastIn}
          autohide
        >
          <Toast.Header>
            {/* <img src={icon.ClixLogo.src} className="rounded me-2" alt="" /> */}
            <strong className="me-auto">
              {toastError ? "Error" : "Success"}
            </strong>
          </Toast.Header>
          <Toast.Body
            className={
              toastError ? "text-white bg-danger" : "text-white bg-success"
            }
          >
            {mgs}
          </Toast.Body>
        </Toast>
        </div>

        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}

          >
            <Courosol />
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {firstpageSignup &&
                <form onSubmit={handleSubmit}>
                  <Card className={classes.card}>
                    <CardContent>

                      <TextField
                        id="ClientCode"
                        label="Client Code"
                        value={ClientCode}
                        name="ClientCode"
                        onChange={(e) => HandleInputChange(e)}
                        margin="dense"
                        variant="outlined"
                        className="w-100"

                      />
                      <div>
                        {ClientCodeError ? (
                          <p className="text-danger">
                            Please enter valid ClientCode !
                          </p>
                        ) : null}
                      </div>


                      <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => HandleInputChange(e)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                      />
                      {passwordError ? (
                        <p className="text-danger">
                          Please enter valid password !
                        </p>
                      ) : null}
                      {/* <TextField
                    id="PanDetails"
                    label="Pan Card No"
                    type="password"
                    value={values.PanDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.PanDetails ? errors.PanDetails : ""}
                    error={touched.PanDetails && Boolean(errors.PanDetails)}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  /> */}
                    </CardContent>
                    {/* <CardActions className={classes.actions}> */}
                    <Button
                      type="submit"
                      fullWidth
                      className="buttonsubit"
                      varient="container"
                      onClick={(e) => onHandleNextSigninPage(e)}

                    >
                      Next {Loader &&
                        <>
                          <div class="spinner-border text-light" role="status">
                            <span class="sr-only"></span>
                          </div>
                        </>}
                    </Button>
                    {/* <Button color="secondary" onClick={handleReset}>
                  CLEAR
                </Button> */}
                    {/* </CardActions> */}
                  </Card>
                </form>}
              {

              }

            </Box>
          </Grid>
        </Grid>
      </ThemeProvider></>
  );
};


export default withStyles(styles)(SignInSide);
