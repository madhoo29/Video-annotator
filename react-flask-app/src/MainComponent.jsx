import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import {SignIn} from "./components/Auth";
import {SignUp} from "./components/Auth";
import {Instructor} from "./components/Instructor";
import VideoPlayer from "./components/Student/VideoPlayer";
import Student from "./components/Student/Student";
const MainComponent=()=>{
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/instructor" component={Instructor}></Route>
            <Route path="/student" component={Student}></Route>
            <Route path="/player" component={VideoPlayer}></Route>
        </Switch>
        </BrowserRouter>
    )
}
export default  MainComponent;