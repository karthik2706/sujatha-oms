import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter } from "react-router-dom";

import { Container } from 'react-bootstrap';
import HeaderComponent from './components/headerComponent';

import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';


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

interface IProps {
  children: React.ReactNode;
}

import NewOrdercComponent from './components/newOrder';
import OrdersComponent from './components/myOrders';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);


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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NewOrdercComponent formData={initialFormData} />}>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      <Route path="/myOrders" element={<OrdersComponent />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Container>
      <>
        <HeaderComponent brandName='OMS' links={[
          { title: "New Order", path: "/" },
          { title: "My Orders", path: "/myOrders" },
        ]}
        />
        <Router>
          <Switch>
            <Route exact path="/" component={<NewOrdercComponent formData={initialFormData} />} />
            <Route exact path="/myOrders" component={<OrdersComponent />} />
          </Switch>
      </Router>
        {/* <RouterProvider>
          <App />
        </RouterProvider> */}
      </>
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
