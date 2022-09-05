import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import Select from 'react-select';
import { 
    getFirstList, 
    getSecondList 
} from "../services/ListService";
import { getThirdList } from "../services/ParticipantService";
import './css/SimpleForm.css'

interface Props {
    getToken: any
}

const SimpleForm: React.FC<Props> = ({getToken}) => {
    interface Option {
        value: string;
        label: string;
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [firstList, setFirstList] = useState<Array<string>>([]);
    const [secondList, setSecondList] = useState<Array<string>>([]);
    const [thirdList, setThirdList] = useState<Array<string>>([]);
    const [firstListSelectedValue, setFirstListSelectedValue] = useState<string | null>('');
    const [secondListSelectedValue, setSecondListSelectedValue] = useState<string | null>('');
    const [thirdListSelectedValue, setThirdListSelectedValue] = useState<string | null>('');
    const validateFirstListStatus: boolean | null = firstList.length === 0;
    const validateSecondListStatus: boolean | null = secondList.length === 0;
    const validateThirdListStatus: boolean | null = thirdList.length === 0;

    useEffect(() => {
        requestParameters();
    }, []);

    async function requestParameters() {
        setFirstList([]);
        setSecondList([]);
        setThirdList([]);
        setErrorMessage('');

        getFirstList(await getToken())
            .then(response => checkResponse(response, setFirstList))
            .catch((e) => {
                setErrorMessage('Internal Error: ' + e);
            });

        getSecondList(await getToken())
            .then(response => checkResponse(response, setSecondList))
            .catch((e) => {
                setErrorMessage('Internal Error: ' + e);
            });

        getThirdList(await getToken())
            .then(response => checkAndConvertThirdListResponse(response))
            .catch((e) => {
                setErrorMessage('Internal Error: ' + e);
            });
    }

    function checkResponse(response: Response, typeOfData: React.Dispatch<React.SetStateAction<string[]>>) {
        if (response.status === 200) {
            new Promise<Array<string>>(resolve => {
                resolve(response.json());
            })
            .then(response => typeOfData(response));
        } else if (response.status === 404) {
            setErrorMessage('No records found.');
        } else {
            response.text()
                    .then(text => {
                        setErrorMessage('API Error: ' + text);
                    });
        }
    }

    function checkAndConvertThirdListResponse(response: Response) {
        interface Item {
            id: string,
            companyName: string
        }

        if (response.status === 200) {
            new Promise<Array<Item>>(resolve => {
                resolve(response.json());
            })
            .then(response => {
                const items = Object.keys(response).map(index => {
                    let item = response[parseInt(index)];
                    var option: any = { value: item.id, label: `(${item.id}) ${item.companyName}` };

                    return option;
                });

                setThirdList(items);
            });
        } else if (response.status === 404) {
            setErrorMessage('No records found.');
        } else {
            response.text()
                    .then(text => {
                        setErrorMessage('API Error: ' + text);
                    });
        }
    }

    function handleChangeFirstList(event: any) {
        let option: Option = event;
        setFirstListSelectedValue(option.value);
    }

    function handleChangeSecondList(event: any) {
        let option: Option = event;
        setSecondListSelectedValue(option.value);
    }

    function handleChangeThirdList(event: any) {
        let option: Option = event;
        setThirdListSelectedValue(option.value);
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        alert(firstListSelectedValue + ' - ' + secondListSelectedValue + ' - ' + thirdListSelectedValue);
        event.preventDefault();
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
                onSubmit={handleSubmit}
            >
                <Card 
                    border="secondary"
                    style={{ width: '25rem' }}
                >
                    <Card.Body>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-row">
                                    <label className="col d-inline-block">First List</label>
                                    <div className="col-sm-12 d-inline-block">
                                        <Select
                                            defaultValue={firstListSelectedValue}
                                            onChange={(event) => event && handleChangeFirstList(event)}
                                            options={firstList}
                                            isDisabled={validateFirstListStatus} 
                                            isLoading={validateFirstListStatus} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-row">
                                    <label className="col d-inline-block">Second List</label>
                                    <div className="col-sm-12 d-inline-block">
                                        <Select 
                                            defaultValue={secondListSelectedValue}
                                            onChange={(event) => event && handleChangeSecondList(event)}
                                            options={secondList}
                                            isDisabled={validateSecondListStatus} 
                                            isLoading={validateSecondListStatus} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-row">
                                    <label className="col d-inline-block">Third List</label>
                                    <div className="col-sm-12 d-inline-block">
                                        <Select 
                                            defaultValue={thirdListSelectedValue}
                                            onChange={(event) => event && handleChangeThirdList(event)}
                                            options={thirdList} 
                                            isDisabled={validateThirdListStatus} 
                                            isLoading={validateThirdListStatus} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-row">
                                    <div className="col-sm-12 d-inline-block">
                                        <Form.Check 
                                            type="switch"
                                            id="hasTracking"
                                            label="Has Tracking"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-row">
                                    <div className="col-sm-12 d-inline-block">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="parameter">Parameter</InputGroup.Text>
                                            <Form.Control
                                                placeholder="ID"
                                                aria-label="ID"
                                                aria-describedby="parameter"
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
                                            <InputGroup.Text id="url">Website URL</InputGroup.Text>
                                            <Form.Control
                                                placeholder="URL"
                                                aria-label="URL"
                                                aria-describedby="url"
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <blockquote className="blockquote mt-4 mb-0">
                                <Button variant="primary" type="submit">
                                    Submit Form
                                </Button>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Form>
        </div>
    );
};

export default SimpleForm;