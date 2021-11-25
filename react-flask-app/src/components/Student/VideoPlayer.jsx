import React from "react";
import { useLocation, withRouter } from "react-router-dom";
//import ReactPlayer from 'react-player';
import { Player, ControlBar } from 'video-react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import "../../../node_modules/video-react/dist/video-react.css"
import "../../../node_modules/react-chat-elements/dist/main.css"
import { MessageBox, Button, Input } from 'react-chat-elements';
import "./index.css"
import List from "@material-ui/core/List";
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
    
    ],
    comments : [],
    flag : true,
    player : ""
    
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
    //this.player.seek(2);

    x.style.display = "none";
    let messages = [...this.state.messages, this.state.value,this.state.duration];
        // console.log("MESSAGES", time, this.state.value);
    const data = new FormData();
    data.append('url', this.props.location.state.video);
    data.append('timestamp', time);
    data.append('comment', this.state.value);
    var object = {};
    object["comment"] = this.state.value;
    object["timestamp"] = time;
    object["answers"] = [];
    var c = this.state.comments;
    c.push(JSON.stringify(object));
    console.log(c);
    this.setState({comments : c});
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

  handleSeek = (val,state) => {
    this.player.seek(val);
    this.player.pause();
  }
  // handleProgress = state => {
  //   console.log('onProgress', state)

  //   // We only want to update time slider if we are not currently seeking
  //   if (!this.state.seeking) {
  //     this.setState(state)
  //   }
  // }


  render(){
  const video = this.props.location.state.video;

  const data = new FormData();
  data.append('url', video);

  fetch('http://localhost:5000/retrieveAnnotations', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
      var arr = [];
      body.comments.forEach((item) => {
        if(item.comment){
          arr.push(JSON.stringify(item));
        }
      });
      if(this.state.flag){
        this.setState({comments : arr});
        this.setState({flag : false});
    }
    });
  });
  console.log(this.state.comments);
  var t;
  
  return (

    <Grid container spacing={0} style={{"overflow" : "scroll"}}>
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
    <Grid item xs={12} md={2} >
    <Item style={{"overflow-y" : "scroll", "height" : "86vh"}}>
      <div ref={this.chatContainer}>
        {/* <div className="content"> */}
        {/* <List className="comment-list"> */}
        {this.state.comments.map(message => (
          <>
          
          {/* {t=JSON.parse(message).comment}; */}
          <MessageBox
          title="question"
          position={'left'}
          type={'text'}
          text={JSON.parse(message).comment}
          date= ""
          titleColor = "red"
          onClick = {() => this.handleSeek(JSON.parse(message).time)}
          />
          {/* <button onClick={() => this.handleSeek(JSON.parse(message).time)} style={{"background-color" : "#97bcf7", "width" : "100%"}}>{JSON.parse(message).comment}</button> */}
          {JSON.parse(message).answers.map(answer =>
            <>
              {/* <p style={{backgroundColor : "#9fd6a4", color : "black"}}>{answer}</p> */}
              <MessageBox
              title="answer"
              position={'left'}
              type={'text'}
              text={answer}
              date= ""
              titleColor = "green"
              // onClick = {() => this.handleSeek(JSON.parse(message).time)}
              />
            </>
          )}
          <p> </p>
          </>
        ))}
        {/* </List> */}
      {/* </div> */}
      </div>
      </Item>
      <Button text = "Comment" onClick={this.addComment}>COMMENT</Button>
      <div id = "comment" style = {{display:'none'}}>
        <Input 
        value={this.state.value} 
        onChange={this.handleChange}    
        // inputStyle={{border : "black"}}
        multiline= {true}
        // rightButtons={
        // <Button
        //     color='white'
        //     backgroundColor='black'
        //     text='Send'
        //     onClick={this.sendMessage}
        // />
        // }
        />
        <Button text = " Send" onClick={this.sendMessage}>SEND</Button>
      </div>
      

      </Grid>
    </Grid>
    
  );
}
  
  //const {videos} = props.location.state;
  }

export default withRouter(VideoPlayer);