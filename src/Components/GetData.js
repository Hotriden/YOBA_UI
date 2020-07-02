import axios from 'axios';
import Cookies from 'universal-cookie';
    
const cookies = new Cookies();

export async function GetWareHouse() {
    var result =  await axios.get('http://apiyoba.pp.ua/api/WareHouse/GetAll', { headers: { 'Authorization': 'Bearer ' + cookies.get('_uc')}}
    );
    console.log(result.data);
    return result.data;
}

export async function GetSuppliers() {
    var result =  await axios.get('http://apiyoba.pp.ua/api/Supplier/GetAll', { headers: { 'Authorization': 'Bearer ' + cookies.get('_uc')}}
    );
    console.log(result.data);
    return result.data;
}