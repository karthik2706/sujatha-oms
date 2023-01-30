import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Form, FormControl, Button, InputGroup, Row, Col } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';


interface Props {
}

interface State {
  startDate: Date;
  endDate: Date;
  selectedOption: string;
}

class DateRangePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      selectedOption: ''
    };
  }

  handleStartDateChange = (date: Date) => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = (date: Date) => {
    this.setState({ endDate: date });
  };

  handleOptionChange = (vendor: string) => {
    this.setState({ selectedOption: vendor });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Start Date:', this.state.startDate);
    console.log('End Date:', this.state.endDate);
    console.log('Selected Option:', this.state.selectedOption);
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit} className='pt-3'>
        <Row>
          <Col className='mb-3 col-3'>
            <Form.Group controlId="formBasicCourierService">
              <Form.Label>Courier Service</Form.Label>
              <Form.Control
                onChange={(e) => this.handleOptionChange(e.target.value)}
                as="select"
                name="vendor"
                required
              >
                <option value="">Select courier service</option>
                <option value="fedex">Fedex</option>
                <option value="dhl">DHL</option>
                <option value="ups">UPS</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className='mb-3 col-3'>
            <Form.Group controlId="formBasicPincode">
              <Form.Label>Date From</Form.Label>
              <DatePicker className='form-control'
                selected={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
            </Form.Group>
          </Col>
          <Col className='mb-3 col-3'>
            <Form.Group controlId="formBasicPincode">
              <Form.Label>Date To</Form.Label>
              <DatePicker className='form-control'
                selected={this.state.endDate}
                onChange={this.handleEndDateChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className='mb-3'>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
        <hr />
      </Form>
    );
  }
}

export default DateRangePicker;
