import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExportOrderComponent from './ExportOrders';
import { retrieveOrdersByDateRange, fetchAllOrders } from "../databaseConnection";


interface DataRow {
  mobile: string,
  name: string,
  pincode: string,
  ref: string,
  rname: string,
  time: string,
  trackingID: string
}

// interface orders {
//   mobile: string,
//   name: string,
//   pincode: string,
//   ref: string,
//   rname: string,
//   time: string,
//   tracking: string
// }

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    selector: row => row.name,
  },
  {
    name: 'Mobile',
    selector: row => row.mobile,
  },
  {
    name: 'Reference',
    selector: row => row.ref,
  },
  {
    name: 'Pincode',
    selector: row => row.pincode,
  },
  {
    name: 'Reseller',
    selector: row => row.rname,
  },
  {
    name: 'Tracking',
    selector: row => row.trackingID,
  },
];

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState([]);

  

  useEffect(() => {

    // Call the retrieveOrdersByDateRange function with the start and end dates
    fetchAllOrders().then((result: any) => {
      console.log(result);
      setOrders(result);
    }).catch(error => {
      console.error(error);
    });
    
  }, []); // The second argument [] ensures the useEffect hook is only called once on component mount

  return (
    <>
      <br />
      <h2>My Orders</h2>
      <hr />
      <ExportOrderComponent />
      <DataTable data={orders} columns={columns} />
    </>
  );
};

export default OrdersComponent;
