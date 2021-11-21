import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import {SignIn} from "./components/Auth";
import {SignUp} from "./components/Auth";
import {Instructor} from "./components/Instructor";
import {Student} from "./components/Student";
const MainComponent=()=>{
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/instructor" component={Instructor}></Route>
            <Route path="/student" component={Student}></Route>

        </Switch>
        </BrowserRouter>
    )
}
export default  MainComponent;