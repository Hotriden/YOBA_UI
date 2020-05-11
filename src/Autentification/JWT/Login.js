import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            wareHouseName: '',
            address:  ''
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit(e){
        e.preventDefault();
        axios.post('http://apiyoba.pp.ua/api/warehouse',  {
            wareHouseName : this.state.wareHouseName,
            address: this.state.address
        }).then(res => localStorage.setItem('cool-jwt', res.data))
    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.submit(e)}>
                    <label>email</label><input type="text" name="wareHouseName" onChange={e => this.change(e)} value={this.state.email}></input>
                    <label>password</label><input type="text" name="address" onChange={e=> this.change(e)} value={this.state.password}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;