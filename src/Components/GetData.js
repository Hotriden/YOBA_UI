import axios from 'axios';
import Cookies from 'universal-cookie';
    
const cookies = new Cookies();

export async function GetWareHouse(props) {
    var result =  await axios.get('http://localhost:54889/api/WareHouse/GetAll', { headers: { 'Authorization': 'Bearer ' + cookies.get('_uc')}}
    );
    console.log(result);
    return result;
}
