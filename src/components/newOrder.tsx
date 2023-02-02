import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { delhiveryApis } from '../delhiveryApis';
import { submitOrder } from "../databaseConnection";
import Cookies from 'js-cookie';


// interface FormData {
//     mobile: string;
//     vendor: string;
//     pincode: string;
//     name: string;
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     pickupD: string;
//     cod: string;
//     price: string;
//     ref: string;
//     qty: string;
//     weight: string;
//     trackingID: string;
//     rname: string;
//     rmobile: string;
// }

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


const NewOrderComponent: React.FC<{ formData: any }> = (props) => {
    
    const [formData, setFormData] = useState(props.formData);
    
    const [pincodeData, setPincodeData] = useState();

    const [addressResponse, setAddressResponse] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState: any) => ({ ...prevState, [name]: value }));
    };

    const fetchData = async () => {
        //dummy code
        formData.trackingID = 'Testing1232312';
        setFormData((prevState: any) => ({ ...prevState, trackingID: 'Testing1232312' }));
        orderSubmit();
        //Create order code
        // try {
        //     const res = await delhiveryApis.createDelhiveryOrder(formData);
        //     const orderDetails = JSON.parse(res);
        //     if(orderDetails.success === true) {
        //         const tracking = orderDetails.packages[0].waybill;
        //         formData.trackingID = tracking;
        //         setFormData((prevState) => ({ ...prevState, trackingID: tracking }));
        //         orderSubmit();
        //     } else {
        //         console.log('Order creation failed');
        //         alert('Order failed');
        //     }
        // } catch (error) {
        //     console.log(error);
        //     alert('Order Creation failed');
        // }
    };

    const orderSubmit = async () => {
        console.log(formData);
        submitOrder(formData).then(result => {
            console.log('Order created in OMS');
            setFormData(props.formData);
        }).catch(error => {
            console.error(error);
            alert('Order creation failed in OMS');
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData();
    };

    const getTextBetweenParens = (str: string) => {
        const start = str.indexOf("(");
        const end = str.indexOf(")", start);
        return (start != -1 && end != -1) ? str.substring(start + 1, end) : "";
    }

    const handlePincodeBlur = async (pincode: string) => {
        try {
            const data = await delhiveryApis.getPincodeDetails(pincode);
            if (data) {
                setFormData((prevState: any) => ({ ...prevState, pincode: data.pin.toString(), city: data.city, state: getTextBetweenParens(data.inc) }));
            } else {
                console.log('Error in data');
                setFormData((prevState: any) => ({ ...prevState, city: '', state: '' }));
            }
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
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
    }, []);

    return (
        <>
            <br />
            <h2>New Order</h2>
            <hr />
            <Form onSubmit={handleSubmit} className='pt-3 newOrderForm'>
            <div className="loading hide">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
                <Row>
                    <Col className='mb-3 col-4'>
                            <Form.Group controlId="formBasicvendor">
                                <Form.Label>Courier Service</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="vendor"
                                    value={Number(formData.vendor) || 1}
                                    required
                                    onChange={handleChange}
                                >
                                    <option value="0">Select courier service</option>
                                    <option value="1">Delhivery</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col className='mb-3 col-4'>
                        <Form.Group>
                            <Form.Label>Reference Number</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                name="ref"
                                value={formData.ref}
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                name="mobile"
                                required
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicPincode">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                onBlur={(e) => handlePincodeBlur(e.target.value)}
                                placeholder="Enter pincode"
                            />
                        </Form.Group>
                    </Col>

                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicTrackingId">
                            <Form.Label>Tracking Number</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                autoComplete='off'
                                onChange={handleChange}
                                name="trackingID"
                                value={formData.trackingID}
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
                                autoComplete='off'
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
                                autoComplete='off'
                                name="address"
                                value={formData.address}
                                required
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
                                autoComplete='off'
                                name="city"
                                readOnly
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
                                readOnly
                                autoComplete='off'
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
                                autoComplete='off'
                                name="country"
                                readOnly
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
                                autoComplete='off'
                                name="pickupD"
                                value={Number(formData.pickupD) || 1}
                                required
                                onChange={handleChange}
                            >
                                <option value="0">Select pickup location</option>
                                <option value="1">Sujatha Gold Covering</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>

                    <Col className='mb-3 col-4'>
                        <Form.Group controlId="formBasiccod">
                            <Form.Label>Is COD</Form.Label>
                            <Form.Control
                                as="select"
                                autoComplete='off'
                                name="cod"
                                value={Number(formData.cod) || 0}
                                required
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className='mb-3 col-4'>
                        <Form.Group>
                            <Form.Label>Package Value</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col>

                   

                </Row>

                <Row>


                    {/* <Col className='mb-3'>
                        <Form.Group controlId="formBasicTotalItems">
                            <Form.Label>Total Items</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                name="qty"
                                value={formData.qty}
                                required
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col> */}

                    {/* <Col className='mb-3'>
                        <Form.Group controlId="formBasicWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                name="weight"
                                required
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Form.Group>
                    </Col> */}

                    
                </Row>
                <hr />
                <Row>
                    <Col className='mb-3'>
                        <Form.Group controlId="formBasicResellerName">
                            <Form.Label>Reseller Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='off'
                                value={formData.rname}
                                name="rname"
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
                                autoComplete='off'
                                value={formData.rmobile}
                                name="rmobile"
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


