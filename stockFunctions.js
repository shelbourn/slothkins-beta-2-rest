const StockSocket = require('stocksocket');

const getCryptoPriceData = (request, response) => {
    const cryptoTicker = parseInt(request.params.ticker);

    StockSocket.addTicker(cryptoTicker, stockPriceChanged);

    const stockPriceChanged = (data) => {
        response.json(data);
    };
};

module.exports = {
    getCryptoPriceData
};
