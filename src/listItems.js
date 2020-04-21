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

export const supplyListItems = (
  <div>
    <ListSubheader inset>Supply</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
      <ListItemText primary="WareHouses" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SortIcon />
      </ListItemIcon>
      <ListItemText primary="Receipts" />
    </ListItem>
  </div>
);

export const salesListItems = (
  <div>
    <ListSubheader inset>Sales</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <CallIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Shipments" />
    </ListItem>
  </div>
);

export const financeListItems = (
  <div>
    <ListSubheader inset>Finances</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Incomes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MoneyOffIcon />
      </ListItemIcon>
      <ListItemText primary="Expences" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>
  </div>
);

export const staffListItems = (
  <div>
    <ListSubheader inset>Staff</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DeviceHubIcon />
      </ListItemIcon>
      <ListItemText primary="Branches" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventSeatIcon />
      </ListItemIcon>
      <ListItemText primary="Positions" />
    </ListItem>
  </div>
);