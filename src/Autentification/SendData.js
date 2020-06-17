import axios from 'axios';

export default async function SendRegistrationData(props) {
    var result = await axios.post('http://localhost:54889/api/register',  {
        email: props.email,
        password: props.password,
        FirstName: props.userName
    });
    return result.data;
    }
  
    
export function RecoverPassword(props) {
    axios.post('http://localhost:54889/api/recover/Recover',  {
        email: props.email
    });
}