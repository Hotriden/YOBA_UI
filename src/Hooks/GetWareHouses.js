import React, { useState } from 'react';
import WareHouse from "./WareHouse";

function GetWareHouses() {

  const [wareHouses, setWarehouses] = useState([]);

  async function getWarehouses() {
    const url = await fetch("http://localhost:54889/api/warehouse", {mode: 'cors'});
    const data = await url;
    console.log(data)
    setWarehouses(data);
  }

  return(
    <button onClick={getWarehouses}>
        Click me
        <span className="WareHouseHook">
            {wareHouses.map(wareHouse => (
                <WareHouse
                key={wareHouse.id}
                createdBy={wareHouse.createdBy}
                wareHouseName={wareHouse.wareHouseName}
                address={wareHouse.address} />
            ))}
        </span>
    </button>
  );
}

export default GetWareHouses;