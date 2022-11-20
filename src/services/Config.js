const config = {
    Orders: "v1.0/orders",
    OrdersByDate: "v1/Orders/ByDate?startDate={dataIni}&endDate={dataFim}",
    OrdersCreate: "v1.0/orders/create",
    FirstList: "v1/ListService/FirstList",
    SecondList: "v1/ListService/SecondList",
    ThirdList: "v1/ParticipantService/ThirdList"
};

export const apiRequest = {
    scopes: ["api://{YOUR-SCOPE-ID}/.default"]
};

export default config;