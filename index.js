// TODO: IT... FUCKING... WORKS!!!

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const db = require('./queries');
const port = 3000;

// app.use(cors);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (request, response) => {
    response.json({
        info: 'You are a dick, and have always at least been a penis!'
    });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${port}.`);
});
