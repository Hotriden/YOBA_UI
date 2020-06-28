import React from 'react';
import '../ComponentStyle.scss';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { MTablePagination } from 'material-table';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


function createDataTableOne(id, number, date, from, shipTo, article, amount, value) {
  return { id, number, date, from, shipTo, article, amount, value };
}

const rowsTableOne = [
  createDataTableOne(0, '000021', '16.03.20', 'WareHouse-3', 'WareHouse-1', '3444899', '1000', 3000.20),
  createDataTableOne(1, '000020', '16.03.20', 'Supplier-10', 'WareHouse-3', '11188', '255', 30.20),
  createDataTableOne(2, '000019', '16.03.20', 'WareHouse-1', 'Customer-3', '9995123', '3', 90.32),
  createDataTableOne(3, '000018', '16.03.20', 'Supplier-1', 'WareHouse-6', '4889952', '1110', 990.10),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
];

export default function MainTable() {
  return (
        <MaterialTable
          title="Recent operations"
          components={{
            Pagination: props => (
                <div className="pagination">
                  <MTablePagination {...props}/>
                </div>
            )
          }}
            icons={tableIcons}
            options={{
              sorting: true,
              search: true,
              selection: false,
              headerStyle: {
                zIndex: 0,
                backgroundColor: '#3f51b5',
                color: 'white',
              }
            }}
          columns={
            [
              { title: 'Number', field: 'number'},
              { title: 'Date', field: 'date' },
              { title: 'Article', field: 'article' },
              { title: 'From', field: 'from' },
              { title: 'To', field: 'shipTo' },
              { title: 'Value', field: 'value'}
            ]}
            data={rowsTableOne.map((row)=> (
            { number: row.number, article: row.article, date: row.date, from: row.from, shipTo: row.shipTo, value: row.value }
            ))
          }
        />
  );
        }