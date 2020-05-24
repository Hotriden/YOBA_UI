import React, {Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Post from './Post';

class Test extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/PostWareHouse" component={Post}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Test; 