import React, { useEffect, useState } from 'react';
import WareHouse from "./WareHouse";

const WareHouseHook = () => {

  const [wareHouses, setWarehouses] = useState([]);

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = async () => {
    var urlApi = "//apiyoba.pp.ua/api/warehouse";
    const url = await fetch(urlApi, {mode: 'cors'});
    const data = await url.json();
    console.log(data)
    setWarehouses(data);
  }

  return(
    <span className="WareHouseHook">
      {wareHouses.map(wareHouse => (
        <WareHouse
        createdBy={wareHouse.createdBy}
        wareHouseName={wareHouse.wareHouseName}
        address={wareHouse.address} />
      ))}
    </span>
  );
}

export default WareHouseHook;