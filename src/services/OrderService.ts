import config from "./Config";
import Endpoint from "../shared/Endpoint";

export async function getOrders(accessToken: string) {
    const  url = process.env.REACT_APP_API_URL + config.Orders;

    return Endpoint.Get(url, accessToken)
        .then(response => response);
}

export async function getOrdersByDate(accessToken: string, startDate: string, endDate: string) {
    const  url = process.env.REACT_APP_API_URL + config.OrdersByDate
        .replace("{dataIni}", startDate)
        .replace("{dataFim}", endDate);

    return Endpoint.Get(url, accessToken)
        .then(response => response);
}

export async function postOrder(accessToken: string, order: Order) {
    const  url = process.env.REACT_APP_API_URL + config.OrdersCreate;

    return Endpoint.Post(url, accessToken, order)
        .then(response => response);
}