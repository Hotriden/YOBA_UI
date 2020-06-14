import axios from 'axios';
    
export default async function Recover(props) {
    let forReturn = '';
    await axios.post('http://localhost:54889/api/recover', { Email: props.email}).then(result => forReturn = result.data);
    return forReturn;
}