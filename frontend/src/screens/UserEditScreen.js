import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { userLoginReducer } from '../reducers/userReducers';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, dispatch, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger"> {error}</Message>
                ) : (
                    <>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="enter name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="isadmin">
                                <Form.Check
                                    type="checkbox"
                                    label="Is Admin"
                                    checked={isAdmin}
                                    onChange={(e) =>
                                        setIsAdmin(e.target.checked)
                                    }
                                ></Form.Check>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                    </>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;