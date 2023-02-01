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

const App = () => {
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
            <Route path="/" element={<NewOrdercComponent />} />
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