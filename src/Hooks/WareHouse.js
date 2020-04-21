import React from 'react';

const WareHouse = ({createdBy, wareHouseName, address}) => {
    return(
        <span>
            <ul>
                <li>{createdBy}</li>
                <li>{wareHouseName}</li>
                <li>{address}</li>
            </ul>
        </span>
    );
};

export default WareHouse;