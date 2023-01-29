import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewOrdercComponent from './components/newOrder';
import HeaderComponent from './components/headerComponent';
import OrdersComponent from './components/myOrders';

interface Data {
  mobile: string,
  name: string,
  pincode: string,
  ref: string,
  rname: string,
  time: string,
  tracking: string
}

const ordersData: Data[] = [
  {
    "mobile": "9492413765",
    "name": "B.Bhagya Lakshmi",
    "pincode": "522006",
    "ref": "3765URG",
    "rname": "",
    "time": "28-01-2023",
    "tracking": "4225610951801",
  },
  {
    "mobile": "9492413765",
    "name": "B.Bhagya Lakshmi",
    "pincode": "522006",
    "ref": "3765URG",
    "rname": "",
    "time": "28-01-2023",
    "tracking": "4225610951801",
  },
  {
    "mobile": "9492413765",
    "name": "B.Bhagya Lakshmi",
    "pincode": "522006",
    "ref": "3765URG",
    "rname": "",
    "time": "28-01-2023",
    "tracking": "4225610951801",
  }
];

const App = () => (
  <Container>
    <>
      <HeaderComponent brandName='Sujatha Gold Covering' links={[
        { title: "New Order", path: "/" },
        { title: "Orders", path: "/myOrders" },
        { title: "Export Orders", path: "/export" },
      ]}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewOrdercComponent />} />
          <Route path="/myOrders" element={<OrdersComponent data={ordersData} />} />
        </Routes>
      </BrowserRouter>
    </>
  </Container>
);

export default App;

// ReactDOM.render(<App />, document.getElementById('root'));
