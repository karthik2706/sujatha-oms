import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExportOrderComponent from './ExportOrders';
import { retrieveOrdersByDateRange, fetchAllOrders, retrieveOrderData } from "../databaseConnection";
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import CreateOrderComponent from './newOrder';
import { Container } from 'react-bootstrap';



interface DataRow {
  id: string;
  elementId: string,
  modifiedData: string,
  mobile: string,
  name: string,
  pincode: string,
  ref: string,
  rname: string,
  time: string,
  trackingID: string
}

interface FormData {
  mobile: string;
  vendor: string;
  pincode: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pickupD: string;
  cod: string;
  price: string;
  ref: string;
  qty: string;
  weight: string;
  trackingID: string;
  rname: string;
  rmobile: string;
}


const initialFormData: FormData = {
  mobile: '',
  vendor: '',
  pincode: '',
  name: '',
  address: '',
  city: '',
  state: '',
  country: 'India',
  pickupD: '',
  cod: '',
  price: '5000',
  ref: '',
  qty: '1',
  weight: '100',
  trackingID: '',
  rname: '',
  rmobile: ''
};

const customStyles = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// interface OrderComp {
//   createOrderComponent: JSX.IntrinsicElements
// }

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
  const [formData, setFormData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = ({ selectedRows:[] }) => {
    setSelectedRows(selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  }

  const handleOpenModal = async (order: any) => {
    const data = await retrieveOrderData(order);
    console.log(data)
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    
    // Call the retrieveOrdersByDateRange function with the start and end dates
    fetchAllOrders().then((result: any) => {
      // console.log(result);
      const orderObj = result.map((item: { elementId: any; properties: any; }) => ({
        id: item.elementId,
        ...item.properties
      }));
      setOrders(orderObj);
    }).catch(error => {
      console.error(error);
    });
    

    const checkLogin = async () => {
      //read cookie here
      const cookieValue = Cookies.get('userLoginSuccess');
      console.log(cookieValue);
      if (!cookieValue) {
        console.log('not logged in');
        document.location = '/login';
      }
    };
    checkLogin();

  }, []); // The second argument [] ensures the useEffect hook is only called once on component mount

  return (
    <>
      <br />
      <h2>My Orders</h2>
      <hr />
      <ExportOrderComponent />
      <button className="btn btn-secondary" onClick={handleClearRows}>
        Clear Selected Rows
      </button>
      <DataTable 
        data={orders} 
        columns={columns}
        highlightOnHover
        pointerOnHover
        onRowClicked={(row) => {
          handleOpenModal(row.ref);
        }}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggledClearRows} 
        pagination
        />
          <Modal
            isOpen={isModalOpen}
            style={customStyles} 
            onRequestClose={() => {
              handleCloseModal()
            }
          }
          >
            <CreateOrderComponent formData = {formData}  />
            <button className='btn btn-secondary' onClick={() => handleCloseModal()}>Close</button>
          </Modal>
    </>
  );
};

export default OrdersComponent;
