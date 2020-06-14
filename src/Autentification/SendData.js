import axios from 'axios';

export default function SendRegistrationData(props) {
    axios.post('http://localhost:54889/api/register',  {
        email: props.email,
        password: props.password,
        userName: props.userName
    });
    }
  
    
export function RecoverPassword(props) {
    axios.post('http://localhost:54889/api/recover/Recover',  {
        email: props.email
    });
}