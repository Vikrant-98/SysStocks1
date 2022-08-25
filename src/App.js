import './App.css';
import Form from "./Components/feildsRequired/SiginInSlide"
import Dashboard from "./Components/DashBoard/DashboardContent"
import PandetailsPage from "./Components/feildsRequired/PandetailsPage"
// import BodyContents from "./Components/Contents/BodyContents"


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          {/* <Route exact path="/" component={SignUp} /> */}
          <Route exact path="/" component={Form} />
          <Route exact path="/Dashboard" component={Dashboard} />
          {/* {/* <Route exact path="/VehicleDashboard" component={VehicleDashboard} /> */}
          <Route exact path="/Pan" component={PandetailsPage} /> 
          {/* <Route exact path="/BodyDashBoard" component={BodyContents} />  */}
          
         
        </Switch>
      </Router>
       
  </div>
  
  );
}

export default App;
