import React, {Component} from 'react';
import {getJwt} from './jwt';
import axios from 'axios';

class AutentificateComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if(!jwt){
            this.props.history.push('/Login');
        }

        axios.get('http://apiyoba.pp.ua/api/jwt', {headers: {Authorization: `Bearer ${jwt}`}, 'Content-Type': 'application/json'}).then(res => this.setState({
            user: res.data
        })).catch(err => {
            localStorage.removeItem('cool-jwt');
            this.props.history.push('/Login');
            console.log(jwt);
        });
    }
    render(){
        if(this.state.user == undefined){
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default AutentificateComponent; 
