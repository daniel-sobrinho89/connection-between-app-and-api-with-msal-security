import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Spinner } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import './css/DataGridWithDateTime.css';

const columns = [
    { field: 'campanha', headerName: 'Campanha', width: 250 },
    { field: 'projectId', headerName: 'CampanhaId', width: 150 },
    { field: 'orderQuantity', headerName: 'Total de Pedidos', width: 150 },
    { field: 'insertDate', headerName: 'Data', width: 200 }
];

interface Props {
    isSearching: boolean
    rows: Array<object>
    callAPIFunction: any
}

const DataGridWithDateTime: React.FC<Props> = ({isSearching, rows, callAPIFunction}) => {
    const [startDate, setStartDate] = useState<Date>();
    const [startDateInputValue, setStartDateInputValue] = useState('');
    const [endDate, setEndDate] = useState<Date>();
    const [endDateInputValue, setEndDateInputValue] = useState('');
    const validDate = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);
    const validateButtonStatus = () => !validDate.test(startDateInputValue) || !validDate.test(endDateInputValue) || isSearching;
    const validateStartDatePickerStatus = () => isSearching;
    const validateEndDatePickerStatus = () => startDate === null || isSearching;
    const changeStartDateValue = (date: Date | undefined) => { date !== undefined && setStartDateInputValue(format(date, "dd/MM/yyyy")) }
    const changeEndDateValue = (date: Date | undefined) => { date !== undefined && setEndDateInputValue(format(date, "dd/MM/yyyy")) }
    const checkEndDateValue = (value: string | undefined) => { value !== undefined && setEndDateInputValue(formatDateValue(value)) }

    function checkStartDateValue(value: string) {
        if(value !== undefined) {
            setEndDate(undefined);
            setEndDateInputValue('');
            setStartDateInputValue(formatDateValue(value));
        }
    }

    function formatDateValue(value: string) {
        value = value.replace(/[^0-9]/g, "");

        switch (value.length) {
            case 2:
                value = value.slice(0,2) + '/';
                break;
            case 3:
                value = value.slice(0,2) + '/' + value.slice(2);
                break;
            case 4:
                value = value.slice(0,2) + '/' + value.slice(2,4) + '/';
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                value = value.slice(0,2) + '/' + value.slice(2,4) + '/' + value.slice(4);
        }

        return value
    }
    
    function changeStartDate(date: Date | null) {
        if(date === null)
            setStartDateInputValue('');

        setStartDate(date || undefined);
    }

    function changeEndDate(date: Date | null) {
        if(date === null)
            setEndDateInputValue('');

        setEndDate(date || undefined);
    }

    return (
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="form-row">
                            <label className="col-sm-4 d-inline-block">Período de:</label>
                            <div className="col-sm-8 d-inline-block">
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={startDate}
                                    onChange={(date: Date | null) => changeStartDate(date)}
                                    onChangeRaw={(event) => checkStartDateValue(event.target.value)}
                                    onSelect={(date) => changeStartDateValue(date)}
                                    value={startDateInputValue}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    isClearable={true}
                                    disabled={validateStartDatePickerStatus()}
                                />   
                            </div>
                        </div>    
                    </div>
                    <div className="col-md-3 ms-2">
                        <div className="form-row">
                            <label className="col-sm-2 d-inline-block">Até:</label>
                            <div className="col-sm-10 d-inline-block">
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={endDate}
                                    onChange={(date) => changeEndDate(date)}
                                    onChangeRaw={(event) => checkEndDateValue(event.target.value)}
                                    onSelect={(date) => changeEndDateValue(date)}
                                    value={endDateInputValue}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    isClearable={true}
                                    disabled={validateEndDatePickerStatus()}
                                />
                            </div>
                        </div>    
                    </div>
                    <div className="col-md-5">
                        <Button 
                            variant="primary" 
                            disabled={validateButtonStatus()}
                            onClick={() => callAPIFunction(startDate, endDate)}
                        >
                            {isSearching &&
                                <Spinner
                                    className="me-2"
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                            Obter Pedidos
                        </Button>
                    </div>
                </div>
                <div className="row" style={{ height: 300 }}>
                    <div className="col-md">
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                </div>
            </div>
    );
}

export default DataGridWithDateTime;