// import * as React from "react";
import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Dashboard.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { fade, makeStyles } from "@material-ui/core/styles";
import * as icon from "../../Assets/index";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import PersonIcon from "@mui/icons-material/Person";
import HoldingPageDashboard from "./HoldingPage";
import Paginations from "@material-ui/lab/Pagination";

import { dataServices } from "../Dataservices/dataServices";
import "../../../src/style.css"
import BodyContent from "../Contents/BodyContents";
// import ".\node_modules\bootstrap\dist\css\bootstrap.min.css"


// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    "@media(maxWidth: 600px)": {
      marginLeft: "12px",
    },
  },
  searchIcon: {
    color: "grey",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  pop: {
    zIndex: "10000",
  },
  paper: {
    borderRadius: "3px",
    maxWidth: "146px",
    display: "flex",
    flexDirection: "column",
    flexFlow: "wrap",
    backgroundColor: "white",
    border: "1px solid grey",
  },
  PopContent: {
    width: "81px",
    cursor: "pointer",
    padding: "5px",
  },
  MuiToolbarRoot: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [holdingsData, setholdingsData] = useState(false);
  const [GetDashboard, setGetDashboard] = useState(true);
  const [Reports, setReports] = useState(false);
  const [avtarPopupShow, setavtarPopupShow] = useState(false);
  const [userProfile, setuserProfile] = useState(false);
  const [holdingDataMain, setholdingDataMain] = useState(false);
  const [perPage, setPerPage] = React.useState("2");
  const [currentPage, setCurrentPage] = React.useState("1");
  const [funding, setfunding] = React.useState("");
  const [stocksDetails, setstocksDetails] = React.useState([]);
  const [ReportsDetails, setReportsDetails] = React.useState([]);





  const toggleDrawer = () => {
    setOpen(!open);
  };



  const handleArrowupReports = () => {
    setholdingsData((holdingsData) => !holdingsData);
    setholdingDataMain(false);
    setGetDashboard(false);
    setReports(true);
    setuserProfile(false);
    GetReportData()
  };




  const handleMoreDetails = () => {
    setholdingsData(true);
    setholdingDataMain(true)
    setGetDashboard(false);
    setReports(false);
    setuserProfile(false);
    GetReportData()
  };

  const HandleHoldingData = () => {
    setholdingsData(true);
    setholdingDataMain(true);
    setGetDashboard(false);
    setReports(false);
    setuserProfile(false);
  };
  const handleLogout = () => {
    window.location = "/";
    localStorage.clear();
  };

  const handleDashboardSideBar = () => {
    setholdingsData(false);
    setGetDashboard(true);
    setReports(false);
    setuserProfile(false);
    setholdingDataMain(false);
  };
  const handleAvtarPopup = () => {
    setavtarPopupShow((avtarPopupShow) => !avtarPopupShow);
  };
  const handleProfileUser = () => {
    setGetDashboard(false);
    setReports(false);
    setuserProfile(true);
    setavtarPopupShow(false);
    // setholdingsData(false)
    setholdingDataMain(false);
  };
  const handleArrowupReportsData = () => {
    setholdingsData((holdingsData) => !holdingsData);
  };

  const LBook = currentPage * perPage;
  const FBook = LBook - perPage;
  const currentBooks = ReportsDetails.slice(FBook, LBook);

  const handlePagination = (e, newPages) => {
    // setPerPage(e.target.value);
    setCurrentPage(newPages);

  }
  useEffect(() => {
    // Update the document title using the browser API
    GetLedgerDetails()
    GetAllStocks()
  }, []);

  const GetLedgerDetails = () => {
    dataServices
      .GetLedger()
      .then((data) => {

        if (data.status === true) {
          setfunding(data.fund)

          this.setState({ OpenSnackBar: true });
        }
      })
      .catch((error) => {
        console.log("GetMenuItem Error : ", error);
      });
  }

  const pannumber = JSON.parse(localStorage.getItem('clientDetails'));
  console.log("pannumber", pannumber)
  const GetReportData = () => {


    dataServices
      .VerifyPAN(pannumber.panNumber)
      .then((data) => {

        if (data.status === true && data.data !== null) {

          setReportsDetails(data.clientDetails.details)

          this.setState({ OpenSnackBar: true });
        }
      })
      .catch((error) => {
        console.log("GetMenuItem Error : ", error);
      });

  }
  const GetAllStocks = () => {
    dataServices
      .GetAllStocks()
      .then((data) => {

        if (data.status === true && data.data != null) {
          setstocksDetails(data.data)

          this.setState({ OpenSnackBar: true });
        }
      })
      .catch((error) => {
        console.log("GetMenuItem Error : ", error);
      });
  }

  const sortAcending = (feild = "") => {
    debugger
    console.log(feild)
    if (feild === "id") {

      let sortData = [...stocksDetails].sort(function (a, b) {
        return a.id - b.id
      });
      setstocksDetails(sortData);
    }
    else if (feild === "name") {
      let sortData = [...stocksDetails].sort(function (a, b) {
        if (a.stockName < b.stockName) { return -1; }
        return 0;
      });
      setstocksDetails(sortData)
    }


  }

  const sortDecending = (feild) => {
    debugger
    if (feild === "id") {
      let sortData = [...stocksDetails].sort(function (a, b) {
        return b.id - a.id
      });
      setstocksDetails(sortData);
    }
    else if (feild === "name") {
      let sortData = [...stocksDetails].sort(function (a, b) {
        if (a.stockName > b.stockName) { return 1; }
        return 0;
      });
      setstocksDetails(sortData)
    }

  }
  return (
    <ThemeProvider theme={mdTheme}>
      <header id="header" class="mb-5 header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center">
            <img src="../../Assets/Image.png" alt="56" />

          </a>
          <i class="bi bi-list toggle-sidebar-btn"></i>
        </div>

      

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
              <a class="nav-link nav-icon search-bar-toggle " href="#">
                <i class="bi bi-search"></i>
              </a>
            </li>

            <li class="nav-item dropdown">

              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-bell"></i>
                <span class="badge bg-primary badge-number">4</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li class="dropdown-header">
                  You have 4 new notifications
                  <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li class="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>

              </ul>
            </li>

            <li class="nav-item dropdown">

              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-chat-left-text"></i>
                <span class="badge bg-success badge-number">3</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li class="dropdown-header">
                  You have 3 new messages
                  <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img src="assets/img/messages-1.jpg" alt="" class="rounded-circle" />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img src="assets/img/messages-2.jpg" alt="" class="rounded-circle" />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img src="assets/img/messages-3.jpg" alt="" class="rounded-circle" />
                    <div>
                      <h4>David Muldon</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>

              </ul>

            </li>

            <li class="nav-item dropdown pe-3">

              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" />
                <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
              </a>
              {/* 
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li class="dropdown-header">
          <h6>Kevin Anderson</h6>
          <span>Web Designer</span>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
            <i class="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
            <i class="bi bi-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
            <i class="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <i class="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>

      </ul> */}
            </li>

          </ul>
        </nav>

      </header>
      <header id="header" className=" mt-5 header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center">
            <img src="../../../src/Assets/Image.png" alt="56" />

          </a>
          <i class="bi bi-list toggle-sidebar-btn"></i>
        </div>

      

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
              <a class="nav-link nav-icon search-bar-toggle " href="#">
                <i class="bi bi-search"></i>
              </a>
            </li>

            <li class="nav-item dropdown">

              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-bell"></i>
                <span class="badge bg-primary badge-number">4</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li class="dropdown-header">
                  You have 4 new notifications
                  <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li class="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>

              </ul>
            </li>

            <li class="nav-item dropdown">

              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-chat-left-text"></i>
                <span class="badge bg-success badge-number">3</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li class="dropdown-header">
                  You have 3 new messages
                  <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img src="assets/img/messages-1.jpg" alt="" class="rounded-circle" />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img src="assets/img/messages-2.jpg" alt="" class="rounded-circle" />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img src="assets/img/messages-3.jpg" alt="" class="rounded-circle" />
                    <div>
                      <h4>David Muldon</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>

              </ul>

            </li>

            <li class="nav-item dropdown pe-3">

              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" />
                <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
              </a>
              {/* 
<ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
<li class="dropdown-header">
  <h6>Kevin Anderson</h6>
  <span>Web Designer</span>
</li>
<li>
  <hr class="dropdown-divider"/>
</li>

<li>
  <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
    <i class="bi bi-person"></i>
    <span>My Profile</span>
  </a>
</li>
<li>
  <hr class="dropdown-divider"/>
</li>

<li>
  <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
    <i class="bi bi-gear"></i>
    <span>Account Settings</span>
  </a>
</li>
<li>
  <hr class="dropdown-divider"/>
</li>

<li>
  <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
    <i class="bi bi-question-circle"></i>
    <span>Need Help?</span>
  </a>
</li>
<li>
  <hr class="dropdown-divider"/>
</li>

<li>
  <a class="dropdown-item d-flex align-items-center" href="#">
    <i class="bi bi-box-arrow-right"></i>
    <span>Sign Out</span>
  </a>
</li>

</ul> */}
            </li>

          </ul>
        </nav>

      </header>
      <div className="body-content-main"></div>
      <BodyContent />
      {/* <Box className="mt-5" sx={{ display: "flex" }}>

        <CssBaseline />
        <AppBar className="w-100" position="absolute" open={open}>
          <Toolbar
            className="d-flex justify-content-between"
          >
            <div>
              <img src="" alt="as" />
            </div>


            <IconButton color="inherit">
              <div>
                <PersonOutlineIcon onClick={() => handleAvtarPopup()} />
                <div className="username">{localStorage.getItem('firstName')}</div>
              </div>
              {avtarPopupShow && (
                <div className="avtarPopup">
                  <div className="logoutalign">
                    <div>Hii {localStorage.getItem('firstName')}</div>
                    <div className="logout_container">
                      <img
                        src={icon.logout.src}
                        alt="logo"
                        className="logout_icon"
                        onClick={() => handleLogout()}
                      />
                    </div>
                  </div>

                  <div className="topAvtar" onClick={() => handleProfileUser()}>
                    {" "}
                    <PersonIcon />
                    <div>Profile</div>
                  </div>
                </div>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        
      </Box> */}
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
