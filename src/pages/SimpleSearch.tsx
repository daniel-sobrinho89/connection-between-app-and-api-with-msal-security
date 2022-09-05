import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { 
    getOrders, 
    getOrdersByDate 
} from "../services/OrderService";
import DataGridWithDateTime from "../components/DataGridWithDateTime";
import { format } from "date-fns";

interface Props {
    getToken: any
}

const SimpleSearch: React.FC<Props> = ({getToken}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [rows, setordersData] = useState<Array<object>>([]);
    const [isSearching, setSearching] = useState(false);
    const { accounts } = useMsal();
    const name = accounts[0] && accounts[0].name;
    
    useEffect(() => {
        async function fetchData() {
            setSearching(true);

            getOrders(await getToken())
                .then(response => checkResponse(response))
                .catch((e) => {
                    setErrorMessage('Internal Error: ' + e);
                });
        }
        fetchData();
      }, []);

    async function requestOrdersByDate(startDate: Date | undefined, endDate: Date | undefined) {
        setordersData([]);
        setErrorMessage('');
        setSearching(true);

        getOrdersByDate(
            await getToken(),
            format(startDate || 0, "dd/MM/yyyy"), 
            format(endDate || 0, "dd/MM/yyyy")
        )
            .then(response => checkResponse(response))
            .catch((e) => {
                setErrorMessage('Internal Error: ' + e);
            });
    }

    function checkResponse(response: Response) {
        setSearching(false);
        
        if (response.status === 200) {
            new Promise<Array<object>>(resolve => {
                resolve(response.json());
            })
            .then(response => setordersData(response));
        } else if (response.status === 404) {
            setErrorMessage('No records found.');
        } else {
            response.text()
                    .then(text => {
                        setErrorMessage('API Error: ' + text);
                    });
        }
    }

    return (
        <>
            <div>
                <h5 className="card-title">Welcome {name}</h5>
            </div>

            {errorMessage && (
                <Alert key='danger' variant='danger'>
                    {errorMessage}
                </Alert>
            )}
            
            <DataGridWithDateTime 
                isSearching={isSearching} 
                rows={rows}
                callAPIFunction={requestOrdersByDate}
            />
        </>
    );
};

export default SimpleSearch;