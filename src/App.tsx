import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewOrdercComponent from './components/newOrder';
import HeaderComponent from './components/headerComponent';
import OrdersComponent from './components/myOrders';

const App = () => (
  <Container>
    <>
      <HeaderComponent brandName='Sujatha Gold Covering' links={[
        { title: "New Order", path: "/" },
        { title: "My Orders", path: "/myOrders" },
      ]}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewOrdercComponent />} />
          <Route path="/myOrders" element={<OrdersComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  </Container>
);

export default App;