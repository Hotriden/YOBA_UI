import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import CallIcon from '@material-ui/icons/Call';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import MoneyIcon from '@material-ui/icons/Money';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HouseIcon from '@material-ui/icons/House';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import SortIcon from '@material-ui/icons/Sort';
import { Link } from 'react-router-dom';

const style = {
  textDecoration: 'none',
  color: 'black',
}

export const supplyListItems = (
    <div>
      <ListSubheader inset>Supply</ListSubheader>
      <Link style={style} to="/WareHouse">
        <ListItem button>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <ListItemText primary="WareHouse"  />
        </ListItem>
      </Link>
      <Link style={style} to="/Supplier">
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Suppliers"  />
      </ListItem>
      </Link>
      <Link style={style} to="/Receipt">
      <ListItem button>
        <ListItemIcon>
          <SortIcon />
        </ListItemIcon>
        <ListItemText primary="Receipts" />
      </ListItem>
      </Link>
    </div>
  );
  
export const salesListItems = (
  <div>
    <ListSubheader inset>Sales</ListSubheader>
    <Link style={style} to="/Order">
    <ListItem button>
      <ListItemIcon>
        <CallIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    </Link>
    <Link style={style} to="/Customer">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    </Link>
    <Link style={style} to="/Shipment">
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Shipments" />
    </ListItem>
    </Link>
  </div>
);

export const financeListItems = (
  <div>
    <ListSubheader inset>Finances</ListSubheader>
    <Link style={style} to="/Income">
    <ListItem button>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Incomes" />
    </ListItem>
    </Link>
    <Link style={style} to="/Expence">
    <ListItem button>
      <ListItemIcon>
        <MoneyOffIcon />
      </ListItemIcon>
      <ListItemText primary="Expences" />
    </ListItem>
    </Link>
    <Link style={style} to="/Payment">
    <ListItem button>
      <ListItemIcon>
        <MoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>
    </Link>
  </div>
);

export const staffListItems = (
  <div>
    <ListSubheader inset>Staff</ListSubheader>
    <Link style={style} to="/Branch">
    <ListItem button>
      <ListItemIcon>
        <DeviceHubIcon />
      </ListItemIcon>
      <ListItemText primary="Branches" />
    </ListItem>
    </Link>
    <Link style={style} to="/Employee">
    <ListItem button>
      <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    </Link>
    <Link style={style} to="/Position">
    <ListItem button>
      <ListItemIcon>
        <EventSeatIcon />
      </ListItemIcon>
      <ListItemText primary="Positions" />
    </ListItem>
    </Link>
  </div>
);

