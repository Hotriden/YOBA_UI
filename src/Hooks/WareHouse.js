import React from 'react';

const WareHouse = ({createdBy, wareHouseName, address}) => {
    return(
            <ul>
                <li>{createdBy}</li>
                <li>{wareHouseName}</li>
                <li>{address}</li>
            </ul>
    );
};

export default WareHouse;