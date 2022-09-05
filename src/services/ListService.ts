import config from "./Config";
import Endpoint from "../shared/Endpoint";

export async function getFirstList(accessToken: string) {
    const  url = process.env.REACT_API_URL + config.FirstList;

    return Endpoint.Get(url, accessToken)
        .then(response => response);
}

export async function getSecondList(accessToken: string) {
    const  url = process.env.REACT_API_URL + config.SecondList;

    return Endpoint.Get(url, accessToken)
        .then(response => response);
}