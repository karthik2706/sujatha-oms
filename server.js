const express = require("express");
const cors = require('cors');
const axios = require("axios");
const app = express();
const fetch = require("fetch");
const request = require('request');
const twilio = require('twilio');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post("/createOrder", (req, resp) => {
  const orderObj = req.body;

  const payloadObj = {
    pickup_location: { name: 'Sujatha Gold Covering' },
    shipments: [
      {
        "order": orderObj.ref,
        "phone": orderObj.mobile,
        "products_desc": "Artificial Jewellery",
        "cod_amount": "0",
        "name": orderObj.name,
        "country": orderObj.country,
        "order_date": new Date(),
        "total_amount": orderObj.price,
        "seller_add": "",
        "add": orderObj.address,
        "seller_name": orderObj.rname,
        "seller_inv": "",
        "pin": orderObj.pincode,
        "quantity": orderObj.qty,
        "payment_mode": "Prepaid",
        "state": orderObj.state,
        "city": orderObj.city
      }
    ]
  }

  const options = {
    url: 'https://track.delhivery.com/api/cmu/create.json',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Token 6e580e7983de1b44bd44797c38e97a5f0b540fdf',
      'Content-Type': 'application/json'
    },
    body: 'format=json&data='+JSON.stringify(payloadObj),
  };

  request(options, (err, res, body) => {
    if (err) {
        console.error(err);
        resp.send(err);
    } else {
        console.log(body);
        resp.send(body);
    }
});

  // console.log(options.body);
  // const order = axios.request(options)
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

  // res.send(orderObj);
});

app.post("/sendSMS", (req, resp) => {
    const orderObj = req.body;
      console.log(orderObj);
    // const sendSMS = (orderObj.phone, orderObjtrackingID) => {
      const accountSid = 'AC60f012a507431cce72ee32f7ed3406d1';
      const authToken = 'dad89101d8a9a5fc89ff7dfecca16a14';
      const client = twilio(accountSid, authToken);
  
      client.messages
          .create({
              body: 'Your Tracking id is - ' + orderObj.trackingID,
              messagingServiceSid: 'MG1e3650e5897466a69d34ee9f8b74987f',
              to: '+91 9948660666'//+orderObj.mobile,
          })
          .then(() => {
              console.log('SMS sent successfully');
              resp.send('SMS sent successfully');
          })
          .catch((error) => {
              console.log('Error sending SMS:', error);
          });
    // };

});


  

app.listen(3001, () => {
  console.log("Example app listening on port 3001");
});