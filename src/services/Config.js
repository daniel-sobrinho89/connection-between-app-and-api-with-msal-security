const config = {
    Orders: "v1/OrderService/Orders",
    OrdersByDate: "v1/OrderService/OrdersByDate?dataIni={dataIni}&dataFim={dataFim}",
    FirstList: "v1/ListService/FirstList",
    SecondList: "v1/ListService/SecondList",
    ThirdList: "v1/ParticipantService/ThirdList"
};

export const apiRequest = {
    // scopes: ["api://{YOUR-SCOPE-ID}/.default"]
    scopes: ["api://5224beda-2672-474b-8556-94bb489bd5c6/.default"]
};

export default config;