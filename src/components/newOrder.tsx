import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { delhiveryApis } from '../delhiveryApis';
import { submitOrder } from "../databaseConnection";
import Cookies from 'js-cookie';


interface FormData {
    time: Date;
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
    time: new Date(),
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
    qty: '',
    weight: '100',
    trackingID: '',
    rname: '',
    rmobile: ''
};

interface PincodeDetails {
    pincode: string;
    city: string;
    state: string;
    country: string;
    isServiceable: boolean;
}

const initialPincodeDetails: PincodeDetails = {
    pincode: '',
    city: '',
    state: '',
    country: '',
    isServiceable: false,
};

const NewOrderComponent: React.FC = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [pincodeData, setPincodeData] = useState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        // You can add code here to send form data to the server or do other processing
        try {
            // delhiveryApis.createDelhiveryOrder(formData)
            // .then(result => {
            //     console.log(result);
            // }).catch(error => {
            //     console.error(error);
            // });
            submitOrder(formData).then(result => {
                console.log(result);
                setFormData(initialFormData);
            }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getTextBetweenParens = (str: string) => {
        const start = str.indexOf("(");
        const end = str.indexOf(")", start);
        return (start != -1 && end != -1) ? str.substring(start + 1, end) : "";
    }

    const handlePincodeBlur = async (pincode:string) => {
        try {
            const data = await delhiveryApis.getPincodeDetails(pincode);
            if(data) {
                setFormData((prevState) => ({ ...prevState, pincode: data.pin.toString(), city: data.city, state: getTextBetweenParens(data.inc) }));
            } else {
                console.log('Error in data');
                setFormData((prevState) => ({ ...prevState, city: '', state: '' }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
          //read cookie here
          const cookieValue = Cookies.get('userLoginSuccess');
          console.log(cookieValue);
          if(!cookieValue) {
            console.log('not logged in');
            document.location = '/login';
          }
        };
        checkLogin();
      }, []);    

    return (
        <>
            <br />
            <h2>New Order</h2>
            <hr />
            <Form onSubmit={handleSubmit} className='pt-3'>
                <Row>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                required
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                            />
                        </Form.Group>
                    </Col>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicvendor">
                            <Form.Label>Courier Service</Form.Label>
                            <Form.Control
                                as="select"
                                name="vendor"
                                required
                                onChange={handleChange}
                            >
                                <option value="">Select courier service</option>
                                <option value="fedex">Fedex</option>
                                <option value="dhl">DHL</option>
                                <option value="ups">UPS</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicPincode">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="text"
                                name="pincode"
                                onBlur={(e) => handlePincodeBlur(e.target.value)}
                                placeholder="Enter pincode"
                            />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                            />
                        </Form.Group>
                    </Col>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <FormControl 
                                as="textarea"  
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                            />
                        </Form.Group>
                    </Col>

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Enter state"
                            />
                        </Form.Group>
                    </Col>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Enter country"
                            />
                        </Form.Group>
                    </Col>
                    {/* <Col className='mb-3'>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                    </Col> */}
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicPickupLocation">
                            <Form.Label>Pickup Location</Form.Label>
                            <Form.Control
                                as="select"
                                name="pickupD"
                                required
                                onChange={handleChange}
                            >
                                <option value="">Select pickup location</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                                <option value="location3">Location 3</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasiccod">
                            <Form.Label>Is COD</Form.Label>
                            <Form.Control
                                as="select"
                                name="cod"
                                required
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className='mb-3'>
                        <Form.Group>
                            <Form.Label>Package Value</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                    <Col className='mb-3'>
                        <Form.Group>
                            <Form.Label>Reference Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="ref"
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                   

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicTotalItems">
                            <Form.Label>Total Items</Form.Label>
                            <Form.Control
                                type="text"
                                name="qty"
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="text"
                                name="weight"
                                required
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicTrackingId">
                            <Form.Label>Tracking Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="trackingID"
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                   

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicResellerName">
                            <Form.Label>Reseller Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="rname"
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicResellerMobile">
                            <Form.Label>Reseller Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                name="rmobile"
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>
                    <Col className='mb-3' />
                </Row>
                <hr />
                <Row>
                    <Col className='mb-3'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                    
                </Row>
            </Form>
        </>
    );
};

export default NewOrderComponent;