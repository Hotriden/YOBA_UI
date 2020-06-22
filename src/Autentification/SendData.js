import axios from 'axios';
import Cookies from 'universal-cookie';
    
const cookies = new Cookies();

export async function Recover(props) {
    var result =  await axios.post('http://localhost:54889/api/Recover',  {
        Email: props.email
    });
    return result;
}

export async function CreatePassword(props) {
    var result = await axios.post('http://localhost:54889/api/ResetPassword', {
         Password: props.newPassword, Token: props.token, Email: props.email, ConfirmPassword: props.confirmPassword });
    return result;
}

export async function GetJwt(props) {
    let result = await axios.post('http://localhost:54889/api/login/signin',  {
        email: props.email,
        password: props.password
    })
    .then(res => cookies.set('_uc', res.data))
    return result;
}

export async function Registration(props) {
    var result = await axios.post('http://localhost:54889/api/register',  {
        email: props.email,
        password: props.password,
        FirstName: props.userName
    });
    return result;
}
