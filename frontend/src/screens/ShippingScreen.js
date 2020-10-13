import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="address"
                        placeholder="enter address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="city"
                        placeholder="enter city"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="postalCode"
                        placeholder="enter postalCode"
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="country"
                        placeholder="enter country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    {' '}
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
