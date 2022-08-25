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
import Courosol from "../feildsRequired/Courosol"


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
const PandetailsPage = (props) => {


  const [Pandetails, setPandetails] = useState("");
  const [PandetailsError, setPandetailsError] = useState("");

  const [Loader, setLoader] = useState(false);
  const [toastIn, setToastIn] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [mgs, setMsg] = useState("");

  const toastClose = () => {
    setToastIn(false);
  };

  const HandleInputChange = (e) => {
    if (e.target.name === "Pandetails") {
      setPandetails(e.target.value)
      setPandetailsError(false)
      document.getElementById("Pandetails")?.classList.remove("validation_error");
    }

  };

  const IsTagFormValid = () => {
    debugger
    let isValid = true;
    if (Pandetails === null || Pandetails.length <= 0) {
      isValid = false;
      setPandetailsError(true)
      document.getElementById("Pandetails").classList.add("validation_error");
    }

    return isValid;
  };

  const handleSubmitButton = (e) => {
    e.preventDefault()
    let valid = IsTagFormValid()
    
    if (valid) {
      setLoader(true)
       dataServices
      .VerifyPAN(Pandetails)
      .then((data) => {

        if (data.status === true && data.data !== null) {
          console.log(data.clientDetails)
          setLoader(false)

          setToastIn(true)
          setToastError(false)
          setMsg("Success")
          localStorage.setItem("clientDetails", JSON.stringify(data.clientDetails))
          window.location = "/DashBoard"

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
        setToastError(false)
        setMsg("Something Went Wrong !!")
      });}
  };




  return (

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

            <form >
              <Card >
                <CardContent>

                  <TextField
                    id="Pandetails"
                    label="Pandetails"
                    type="Pandetails"
                    name="Pandetails"
                    value={Pandetails}
                    onChange={(e) => HandleInputChange(e)}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                  {PandetailsError ? (
                    <p className="text-danger">
                      Please enter valid Pandetails !
                    </p>
                  ) : null}
                </CardContent>
                {/* <CardActions className={classes.actions}> */}
                <Button
                  type="submit"
                  fullWidth
                  className="buttonsubit"

                  varient="container"
                  onClick={(e) => handleSubmitButton(e)}
                >
                  SUBMIT {Loader &&
                    <>
                      <div class="spinner-border text-light" role="status">
                        <span class="sr-only"></span>
                      </div>
                    </>}
                </Button>

              </Card>
            </form>
            {

            }

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};



export default withStyles(styles)(PandetailsPage);
