const config = {
    Orders: "v1/OrderService/Orders",
    OrdersByDate: "v1/OrderService/OrdersByDate?dataIni={dataIni}&dataFim={dataFim}",
    FirstList: "v1/ListService/FirstList",
    SecondList: "v1/ListService/SecondList",
    ThirdList: "v1/ParticipantService/ThirdList"
};

export const apiRequest = {
    scopes: ["api://{YOUR-SCOPE-ID}/.default"]
};

export default config;