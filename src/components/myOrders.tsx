import React, { useState } from 'react';
// import 'react-data-table-component/dist/react-data-table-component.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExportOrderComponent from './ExportOrders';


interface DataRow {
    mobile: string,
    name: string,
    pincode: string,
    ref: string,
    rname: string,
    time: string,
    tracking: string
  }

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
        selector: row => row.tracking,
      },
  ];

const OrdersComponent: React.FC<{ data: DataRow[] }> = ({ data }) => {
    return (
      <>
        <br />
        <h2>My Orders</h2>
        <hr />
        <ExportOrderComponent />
        <DataTable data={data} columns={columns} />
      </>
    );
  };

export default OrdersComponent;
