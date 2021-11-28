import * as React from 'react';
//import AppBar from '@mui/material/AppBar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import CameraIcon from '@material-ui/core/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
//import Stack from '@material-ui/core/Stack';
import Stack from '@mui/material/Stack';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import axios from "axios";
//import {Component} from 'react'
//import Modal from "react-responsive-modal";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { blue } from '@mui/material/colors';
import VideoPlayer from "./VideoPlayer";
import {useHistory} from "react-router-dom";
import "./index.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

function Copyright(){
    return (
        <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

// const OpenInNewTab = (video) => {
//   const history=useHistory();
//   const data = {'video' : video};
//   history.push({
//     pathname: '/player',
//     state: data
//   });
//   // const xml = {Player}(data);
//   // const newWindow = window.open(xml, '_blank', 'noopener,noreferrer')
//   // if (newWindow) newWindow.opener = null
// }

//Then add to your onClick


export const Instructor = props=>{
    const location = useLocation();
    const {name,id} = props.location.state;
    const baseURL = "http://localhost:5000/retrieve";
    //baseURL += '?id=' + id.toString();

    const [videolinks, setLinks] = React.useState(null);
    React.useEffect(() => {
    axios.get(baseURL,{params : {id}}).then((response) => {
      setLinks(response.data);
    });
  }, [id]);

  if (!videolinks) return null;
  var i = 1;

  return (

    <Box>
    <div>
    <Container sx={{ py: 8 }} maxWidth="md">
    <Grid item xs={12} sm={6} md={4}>
        {videolinks.urls.map((video) => (
            <Typography>

                {/* <ReactPlayer url = {video}
                light = {true}
                playing
                controls/> */}
                <span> {i++} </span>
                {/* <Link
              to='/player'
              state={{name:'hal'}}
                >
            View
          </Link> */}
      {/* <Router>
      <Route path="/player" component={Player}  /> */}
      {/* render={props => 
<Player {...props} />} */}
      <Link
        to={{
          pathname: "/player",
          state: { video: video} }}
          //component={Player}
        
      >
        View
      </Link>
      {/* </Router> */}

                {/* <Router>
          
                <Switch>
                  <Route exact path="/player" 
                      component={Player}>
                  </Route> 
                  <Button color = {blue[500]} onClick={() => OpenInNewTab(video) } variant="contained">View video</Button>
                </Switch>
              </Router> */}

            </Typography>
        ))
        }
    </Grid>
    </Container>
    </div>
    </Box> 
  );
}

//import "./App.scss";

// export const Instructor=()=>{
  
//   const [modal, setModal] = useState(false);
//   const Toggle = () => setModal(!modal);
  
//   return (
//     <div className="App">
//       <button className="clickme" onClick={() => Toggle()}>
//         Modal
//       </button>
//     </div>
//   );
// }
