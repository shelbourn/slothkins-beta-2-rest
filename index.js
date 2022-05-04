const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (request, response) => {
    response.json({
        info: 'Server health check succeeded'
    });
});

app.get('/users', cors(), db.getUsers);
app.get('/users/:id', cors(), db.getUserById);
app.post('/users', cors(), db.createUser);
app.put('/users/:id', cors(), db.updateUser);
app.delete('/users/:id', cors(), db.deleteUser);
app.get('/crypto-names', cors(), db.getAllCryptoNames);
app.get('/all-crypto-prices', cors(), db.getAllCryptoPrices);
app.get('/detailed-crypto-data', cors(), db.getDetailedCryptoData);
app.post('/add-crypto-price-data', cors(), db.addCryptoPriceData);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${port}.`);
});
