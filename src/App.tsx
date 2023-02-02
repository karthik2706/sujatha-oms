import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewOrdercComponent from './components/newOrder';
import HeaderComponent from './components/headerComponent';
import OrdersComponent from './components/myOrders';
import { Login, Register } from './components/login';
import { neo4jApis } from "./neo4jApis";
import Cookies from 'js-cookie';


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

const App = () => {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <Container>
      <>
        <HeaderComponent brandName='OMS' links={[
          { title: "New Order", path: "/" },
          { title: "My Orders", path: "/myOrders" },
        ]}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewOrdercComponent formData={formData} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myOrders" element={<OrdersComponent />} />
          </Routes>
        </BrowserRouter>
      </>
    </Container>
  );
};

export default App;