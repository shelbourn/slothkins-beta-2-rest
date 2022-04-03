const StockSocket = require('stocksocket');

const getCryptoPriceData = (request, response) => {
    const cryptoTicker = parseInt(request.params.ticker);

    StockSocket.addTicker(cryptoTicker, stockPriceChanged);

    const stockPriceChanged = (data) => {
        response.status(200).json(data);
    };
};

module.exports = {
    getCryptoPriceData
};
