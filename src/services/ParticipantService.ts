import config from "./Config";
import Endpoint from "../shared/Endpoint";

export async function getThirdList(accessToken: string) {
    const  url = process.env.REACT_API_URL + config.ThirdList;

    return Endpoint.Get(url, accessToken)
        .then(response => response);
}