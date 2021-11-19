import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import {SignIn} from "./Auth";

const MainComponent=()=>{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" component={SignIn}></Route>
        </Switch>
        </BrowserRouter>
    )
}
export default  MainComponent;