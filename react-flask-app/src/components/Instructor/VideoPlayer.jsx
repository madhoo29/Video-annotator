import React from "react";
import { useLocation, withRouter } from "react-router-dom";
//import ReactPlayer from 'react-player';
import { Player, ControlBar } from 'video-react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import "../../../node_modules/video-react/dist/video-react.css"
// First simple component with heading tag
// import "/Users/madhoolikag/react-flask-app/node_modules/video-react/dist/video-react.css";




const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
class VideoPlayer extends React.Component
{
  
  chatContainer = React.createRef();
  constructor(props) {
    super(props);
    this.player = React.createRef();
    //this.pause = this.pause.bind(this);

  }
  state = {
    value: "",
    duration:"",
    messages: [
    
    ]
    
  };
  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  handleChange = ({ target: { value ,duration} }) => {
    this.setState({
      value,
      duration
    });
  };

  sendMessage = (ev) => {
    ev.preventDefault();
    var x = document.getElementById("comment");
    var time = this.player.getState().player.currentTime;
    x.style.display = "none";
    let messages = [...this.state.messages, this.state.value,this.state.duration];

    // console.log("MESSAGES", time, this.state.value);
    const data = new FormData();
    data.append('url', this.props.location.state.video);
    data.append('timestamp', time);
    data.append('comment', this.state.value);
    this.setState(
      {
        messages
      },
      // () => this.scrollToMyRef()
    );


    fetch('http://localhost:5000/comment', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        //this.setState({ imageURL: `http://localhost:5000/${body.file}` });
      });
    });
  };

  // scrollToMyRef = () => {
  //   const scroll =
  //     this.chatContainer.current.scrollHeight -
  //     this.chatContainer.current.clientHeight;
  // this.chatContainer.current.scrollTo(0, scroll);
  // };

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  addComment = (state) => {
    var x = document.getElementById("comment");
    x.style.display = "block";
    this.player.pause();

  }

  handlePause = (state) => {
    console.log('onProgress', state)
    
    console.log('onPause')
    this.player.pause();
    //this.setState({ playing: false })
  }
  // handleProgress = state => {
  //   console.log('onProgress', state)

  //   // We only want to update time slider if we are not currently seeking
  //   if (!this.state.seeking) {
  //     this.setState(state)
  //   }
  // }


  render(){
  //const location = useLocation();
  const video = this.props.location.state.video;
  console.log(video);

  const data = new FormData();
  data.append('url', video);

  fetch('http://localhost:5000/retrieveAnnotations', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
      console.log(body);
    });
  });
  
  return (

    <Grid container spacing={0}>
    {/* <Paper style={{height: '100%'}}></Paper> */}
    <Grid item xs={12} md={10}> 
      <Item>
      <div style={{height:"100%", width:"100%"}}>
      <Player
      classname="player"
          ref={player => {
            this.player = player;
          }}
          
          
      // url = {video}
      // videoId = {video}
      // light = {true}
      // playing
      // controls
      // autoPlay
      // onProgress={this.handleProgress}
      fluid="false"
      playsInline
      width="100%"
      height="100%"
      aspectRatio="4:2.6"
      >
      <source src={video} />
      <ControlBar autoHide={false} />
      </Player>
      </div>
    </Item>
    </Grid>
    <Grid item xs={12} md={2}>
    <Item>
      <div ref={this.chatContainer} className="Chat">
        {this.state.messages.map(message => (
          <div>{message}</div>
        ))}
      </div>
      <button onClick={this.addComment}>COMMENT</button>
      <div id = "comment" style = {{display:'none'}}>
        <input value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.sendMessage}>SEND</button>
      </div>
      
      </Item>
      </Grid>
    </Grid>
    
  );
}
  
  //const {videos} = props.location.state;
  }

export default withRouter(VideoPlayer);