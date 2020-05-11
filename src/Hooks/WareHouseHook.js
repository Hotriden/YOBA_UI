import React, { useEffect, useState } from 'react';
import WareHouse from "./WareHouse";

function WareHouseHook(props){

  const [wareHouses, setWarehouses] = useState([]);

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = async () => {
    var urlApi = "http://apiyoba.pp.ua/api/warehouse";
    const url = await fetch(urlApi, {mode: 'cors'});
    const data = await url.json();
    console.log(data)
    setWarehouses(data);
  }

  return(
    <span className={props}>
      {wareHouses.map(wareHouse => (
        <WareHouse
        key={wareHouse.id}
        createdBy={wareHouse.createdBy}
        wareHouseName={wareHouse.wareHouseName}
        address={wareHouse.address} />
      ))}
    </span>
  );
}

export default WareHouseHook;