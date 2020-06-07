import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function GetJwt(props) {
        let b = axios.post('http://localhost:54889/api/login/signin',  {
            email: props.email,
            password: props.password
        }).then(res => cookies.set('_uc', res.data)).then(res=>cookies.set('_user', props.email));
        return b;
    }
  
  export default GetJwt;