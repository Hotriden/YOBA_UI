import axios from 'axios';

function SendRegistrationData(props) {
        axios.post('http://localhost:54889/api/register',  {
            email: props.email,
            password: props.password,
            userName: props.userName
        });
    }
  
  export default SendRegistrationData;