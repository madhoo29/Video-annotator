import React from 'react';
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
import { useLocation, withRouter } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {
    Redirect
 } from "react-router-dom";
import { blue } from '@mui/material/colors';
//import VideoPlayer from "./VideoPlayer";
import {useHistory} from "react-router-dom";
import "./instructor.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { BuildOutlined, ThreeSixtySharp } from '@material-ui/icons';
import VideoPlayer from "./VideoPlayer.jsx";


class Instructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      urls : [],
      flag : true,
      queries : []
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    const {name,id} = this.props.location.state;
    console.log("ID : ", id, "Name :", name);

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    data.append('id', id);
    data.append('name', name);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:5000/${body.file}` });
      });
    });
  }
//   handleClick = value => () => {
//     console.log("hiiiii",value);
//      return <Redirect to={{
//         pathname: '/player',
//         state: { video: value }
//     }}
// />
      
  addUploadVideo(){
    var y = document.getElementById("view-videos");
    y.style.display = "none";
    var z = document.getElementById("upload-video");
    z.style.display = "block";
    var x = document.getElementById("my-query");
    x.style.display = "none";
  }

  addListVideos(){
    var y = document.getElementById("view-videos");
    y.style.display = "block";
    var z = document.getElementById("upload-video");
    z.style.display = "none";
    var x = document.getElementById("my-query");
    x.style.display = "none";
  } 

  addQueryVideos(){
    var y = document.getElementById("view-videos");
    y.style.display = "none";
    var z = document.getElementById("upload-video");
    z.style.display = "none";
    var x = document.getElementById("my-query");
    x.style.display = "block";
  }
  
  render() {
    
    const {name,id} = this.props.location.state;
    const baseURL = "http://localhost:5000/retrieve";
    const data = new FormData();
    data.append('id', id);

    fetch('http://localhost:5000/retrieveTeacher', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        var arr = [];
        body.urls.forEach((item) => {
            arr.push(item);
        });
        var arr2 = [];
        body.comments.forEach((item) => {
            arr2.push(item);
        });
        if(this.state.flag){
            this.setState({urls : arr});
            this.setState({queries : arr2});
            this.setState({flag : false});
        }
      });
    });
    console.log(this.state.queries);

    //this.setState({flag : true});
    var i = 1;
    const videolinks = this.state.urls;
    const queries = this.state.queries;

    return (
        <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav pull-right">
                <li class="nav-item">
                    <button class="btn btn-dark" onClick= {() => this.addListVideos()} type="button" aria-current="page" href="#">My videos</button>
                </li>

                <li class="nav-item">
                    <button class="btn btn-dark" onClick= {() => this.addQueryVideos()} type="button" aria-current="page" href="#">My queries</button>
                </li>

                <li class="nav-item">
                    <button class="btn btn-dark" onClick= {() => this.addUploadVideo()} type="button" aria-current="page" href="#">Upload video</button>
                </li>

                <li class="nav-item">
                    <button class="btn btn-dark" type="button" aria-current="page" onClick={()=>this.props.history.push("/")}>Logout</button>
                </li>
            </ul>
          </div>
        </div>
    </nav>

    <div class="banner">
        <div class="banner-child-header" style={{"fontFamily" : "revert"}}>
            <h1>YOUR PROFILE : </h1>
            {/* <p>Name : {name}</p> */}
            <p>ID : {id}</p>
        </div>
    </div>

    <div class="list-group" id="my-query" style={{display : "none"}}>
        <li class="list-group-item" style={{background: "#212529", color: "white", "font-size": "15pt"}}>
              <div class="title-div">
                  My queries: 
              </div>
        </li>
        <>
        {queries.map((query) => (
            <li class="list-group-item">
            <div class="flex-container">
                <div class="flex-child-1" style={{"vertical-align": "middle"}}>
                    {query.title}
                </div>
                <div class="flex-child-2">
                    {query.name}
                </div>
                <div class="flex-child-3">
                    <button class="btn btn-dark" id="btn-pos" type="button" aria-current="page" onClick={() => this.props.history.push('/answer', {query : query})} style={{"fontFamily": "sans-serif", "boxShadow": "0px 8px 15px rgba(0, 0, 0, 0.1)"}}> Answer </button>
                </div>
            </div>
        </li>
        ))}
        </>
    </div>

    <div class="form-flex" id="upload-video">
        <div class="form-title">
            Upload a video: 
        </div>
        <form onSubmit={this.handleUploadImage} class="form-class">
          <div class="mb-3" style={{left : "42%"}}>
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <div class="input-group mb-3" style={{left : "38%"}}>
            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
          </div>
          <br />
          <div class="btn-form">
            <button>Upload</button>
          </div>
          <img src={this.state.imageURL}/>
      </form>
    </div>

    <ul class="list-group" id="view-videos">
        
        <li class="list-group-item" style={{background: "#212529", color: "white", "font-size": "15pt"}}>
            <div class="title-div">
                Lecture videos: 
            </div>
        </li>
        <>
        {videolinks.map((video) => (
            <li class="list-group-item">
            <div class="flex-container">
                <div class="flex-child-1" style={{"vertical-align": "middle"}}>
                    {video.title}
                </div>
                <div class="flex-child-2">
                    {video.name}
                </div>
                <div class="flex-child-3">
                    <button class="btn btn-dark" id="btn-pos" type="button" aria-current="page" onClick={() => this.props.history.push('/player', {video : video.url})}> Watch </button>
                </div>
            </div>
        </li>
        ))}
        </>

    </ul>

      {/* <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form> */}
      </>
    
    );
  }
}

export default withRouter(Instructor);

