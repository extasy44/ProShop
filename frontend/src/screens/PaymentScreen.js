import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Form } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Label as="legend">Select Method</Form.Label>
                <Form.Group>
                    <Col className="py-3 mb-3">
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Stripe / Not available"
                            id="stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            disabled
                        ></Form.Check>
                    </Col>
                    <Button type="submit" variant="primary">
                        {' '}
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
