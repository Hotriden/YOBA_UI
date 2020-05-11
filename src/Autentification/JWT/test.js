import React, {Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import AutentificateComponent from './AutentificateComponent';

class Test extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/Login" component={Login}/>
                    <Route path="/" exact component={Home}/>
                    <AutentificateComponent>
                        <Route path="/Protected" component={Protected}/>
                    </AutentificateComponent>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Test; 