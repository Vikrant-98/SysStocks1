// import * as React from "react";
import React, { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { withFormik, Formik } from "formik";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CustomSelect from './CustomSelect';
import { dataServices } from "../Dataservices/dataServices";
import "./Dashboard.css";
import { Toast } from "react-bootstrap";
import MainLoader from "../Loader/loader";




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

const validationSchema = yup.object().shape({

  BranchName: yup.string().required("Required"),
})

const HoldingPage = (props) => {
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

  const [brandtable, setbrandtable] = useState(false);
  const [brandData, setbrandData] = useState([]);
  const [clientData, setclientData] = useState([]);
  const [toastIn, setToastIn] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [mgs, setMsg] = useState("");
  const [isLoading, SetisLoading] = useState(false);





  // const handleSubmitButton = (e) => {
  //   // let isvalid = setSubmitting(true)
  //   // if(isvalid)
  //   e.preventDefault();
  //   window.location ="/Dashboard"
  // };

  useEffect(() => {
    // Update the document title using the browser API
    GetBrand()
  }, []);


  const GetBrand = () => {
    dataServices
      .GetBrand()
      .then((data) => {

        if (data.status === true && data.data != null) {
          setbrandData(data.data)

          this.setState({ OpenSnackBar: true });
        }
      })
      .catch((error) => {
        console.log("GetMenuItem Error : ", error);
      });
  }
  const toastClose = () => {
    setToastIn(false);
  };


  console.log(props)
  return (
    <div>
       {isLoading && <MainLoader />}
       {
        <Toast
          className="d-inline-block m-1"
          bg={toastError ? "danger" : "success"}
          onClose={toastClose}
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
      }
    <ThemeProvider theme={theme}>
       
      <Grid container component="main" sx={{ height: "100vh" }}>

        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         
      

          <Formik
            initialValues={{
           
              BranchName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              SetisLoading(true);
              dataServices
                .BranchandStockDetails(values.BranchName)
                .then((data) => {
                  // debugger
                  if (data.status === true && data.data !== null) {
                    setclientData(data.data)
                    setTimeout(() => {
                      // submit to the server
                      
                      actions.setSubmitting(false);
                      setbrandtable(true)
                      SetisLoading(false)
  
                      
                    }, 1000);
                  
                  

                  }
                  else{
                    SetisLoading(false)
                  }
                })
                .catch((error) => {
                  SetisLoading(false)
                  console.log("GetMenuItem Error : ", error);
                });
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit} >
                <Card className={classes.card}>
                  <CardContent>

                    {/* <TextField
                      id="ClientCode"
                      label="Client Code"
                      type="text"
                      value={props.values.ClientCode}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={props.touched.ClientCode ? props.errors.ClientCode : ""}
                      error={props.touched.ClientCode && Boolean(props.errors.ClientCode)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id="Date"
                      label="Date"
                      type="Date"
                      value={props.values.Date}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={props.touched.Date ? props.errors.Date : ""}
                      error={props.touched.Date && Boolean(props.errors.Date)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    /> */}
                    <CustomSelect
                      // label="Job Type"
                      className="customselect"
                      name="BranchName"
                      placeholder="Branch Code"
                      fullWidth
                    >
                      <option disabled value="">Select</option>
                      {brandData.map((ele, ind) => {
                        return (
                          <>
                            {/* <option disabled value="">Select</option> */}
                            <option value={ele.branchCode}>{ele.branchName}</option>

                          </>)
                      })}

                    </CustomSelect>
                  </CardContent>
                  {/* <CardActions className={classes.actions}> */}
                  <Button
                    type="submit"
                    fullWidth
                    className="buttonsubit"
                    //   color="primary"
                    disabled={props.isSubmitting}
                    varient="container"
                  // onClick={(e) => handleSubmitButton()}
                  >
                    SUBMIT
                  </Button>
                  {/* <Button color="secondary" onClick={handleReset}>
                  CLEAR
                </Button> */}
                  {/* </CardActions> */}
                </Card>
              </form>
            )}
          </Formik>




        </Box>
        {brandtable &&
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
            >
              <div className="SubdataShowtable">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Client Code</TableCell>
                      <TableCell>Symballs</TableCell>
                      <TableCell>ISIN </TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell >Rate</TableCell>
                      <TableCell >Value</TableCell>
                      <TableCell >BranchName</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientData.map((row) => (
                    <TableRow >
                      <TableCell>{row.clientCode}</TableCell>
                      <TableCell>{row.symbol}</TableCell>
                      <TableCell>{row.isin}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell >{row.rate}</TableCell>
                      <TableCell >{row.value}</TableCell>
                      <TableCell >{row.branchName}</TableCell>
                    </TableRow>
                   ))} 
                  </TableBody>
                </Table>
              </div>

            </Paper>
          </Grid>
        }
      </Grid>
    </ThemeProvider></div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ ClientCode, Date, BranchName }) => {
    return {
      ClientCode: ClientCode || "",
      Date: Date || "",

      BranchName: BranchName || "",
    };
  },

  validationSchema: yup.object().shape({
    ClientCode: yup.string().required("Required"),
    Date: yup.string().required("Required"),
    BranchName: yup.string().required("Required"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    dataServices
      .BranchandStockDetails(values.BranchName)
      .then((data) => {
        // debugger
        if (data.status === true && data.data !== null) {

          setTimeout(() => {
            // submit to the server
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);

          // setbrandtable(true)

        }
      })
      .catch((error) => {
        console.log("GetMenuItem Error : ", error);
      });
  },
})(HoldingPage);

export default withStyles(styles)(Form);
