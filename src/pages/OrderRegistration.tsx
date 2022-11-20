import React, { useState } from "react";
import { Alert, Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import './css/SimpleForm.css'
import { postOrder } from "../services/OrderService";

interface Props {
    getToken: any
}

const OrderRegistration: React.FC<Props> = ({getToken}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const validateButtonStatus = () => description === '' || amount < 1 || isLoading;

    async function sendNewOrder(event: React.SyntheticEvent<HTMLFormElement>) {
        setErrorMessage('');
        setLoading(true);
        
        const order: Order = { description: description, amount: amount };

        postOrder(
            await getToken(),
            order
        )
            .then(response => checkResponse(response))
            .catch((e) => {
                setErrorMessage('Internal Error: ' + e);
            });

        event.preventDefault();
    }

    function checkResponse(response: Response) {
        setLoading(false);
        
        if (response.status === 200) {
            new Promise<string>(resolve => {
                resolve(response.json());
            })
            // .then(response => setordersData(response));
        } else if (response.status === 404) {
            setErrorMessage('Resource not found.');
        } else {
            response.text()
                    .then(text => {
                        setErrorMessage('API Error: ' + text);
                    });
        }
    }

    return (
        <div className="container">
            <div className="row">
                {errorMessage && (
                    <Alert key='danger' variant='danger'>
                        {errorMessage}
                    </Alert>
                )}
            </div>
            <Form 
                id="form" 
                className="row" 
                onSubmit={sendNewOrder}
            >
                <Card 
                    border="secondary"
                    style={{ width: '25rem' }}
                >
                    <Card.Body>
                        <div className="row mb-2 mt-4">
                            <div className="col">
                                <div className="form-row">
                                    <div className="col-sm-12 d-inline-block">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="description">Descrição</InputGroup.Text>
                                            <Form.Control
                                                minLength={5}
                                                placeholder="Description"
                                                aria-label="Description"
                                                aria-describedby="description"
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-row">
                                    <div className="col-sm-12 d-inline-block">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="amount">Valor R$</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                min={1}
                                                step={0.5}
                                                max={99999}
                                                placeholder="Amount"
                                                aria-label="Amount"
                                                aria-describedby="amount"
                                                value={amount}
                                                onChange={(event) => setAmount(parseFloat(event.target.value))}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <blockquote className="blockquote mt-4 mb-0">
                                <Button 
                                    type="submit" 
                                    variant="primary"
                                    disabled={validateButtonStatus()}
                                >
                                    <Spinner 
                                        animation="grow" 
                                        size="sm"
                                        hidden={!isLoading}
                                    />
                                    Submit Form
                                </Button>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Form>
        </div>
    );
};

export default OrderRegistration;