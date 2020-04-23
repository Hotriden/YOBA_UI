import React, { useEffect, useState } from 'react';
import WareHouse from "./WareHouse";

const WareHouseHook = () => {

  const [wareHouses, setWarehouses] = useState([]);

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = async () => {
    const url = await fetch('http://yobapp.pp.ua/api/warehouse', {mode: 'cors'});
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