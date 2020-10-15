import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setCountInStock(product.countInStock);
            }
        }
    }, [product, productId, dispatch, history, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock
            })
        );
    };

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
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
                                    type="text"
                                    placeholder="enter name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="enter price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter image url"
                                    onChange={(e) => setImage(e.target.value)}
                                    value={image}
                                ></Form.Control>
                                <Form.File
                                    id="image-file"
                                    label="Choose file"
                                    custom
                                    onChange={uploadFileHandler}
                                >
                                    {uploading && <Loader />}
                                </Form.File>
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter brand"
                                    onChange={(e) => setBrand(e.target.value)}
                                    value={brand}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="countInStock">
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="enter countInStock"
                                    onChange={(e) =>
                                        setCountInStock(e.target.value)
                                    }
                                    value={countInStock}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter category"
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                    value={category}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                ></Form.Control>
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

export default ProductEditScreen;
