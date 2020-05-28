import React, { useState, Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function GetJwt(props) {
        let b = axios.post('http://localhost:54889/api/login/signin',  {
            email: props.email,
            password: props.password
        }).then(res => cookies.set('cool-jwt', res.data));
        return b;
    }
  
  export default GetJwt;

        /* const jwtIdentity = () => {
             axios.get('http://localhost:54889/api/login/GetUser');  */
