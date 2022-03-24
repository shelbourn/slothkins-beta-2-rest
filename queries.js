const Pool = require('pg').Pool;
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL
        : connectionString,
    // TODO: Comment out SSL block for local
    ssl: {
        rejectUnauthorized: false
    }
});

/***
 * CRUD operations for Users
 */

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)',
        [name, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            response
                .status(201)
                .send(`User ${name} has been added successfully!`);
        }
    );
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response
                .status(200)
                .send(`User ${name} with ID: ${id} has been modified! `);
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User with ID: ${id} deleted!`);
    });
};

/***
 * Operations for retrieving crypto price data for use with K-means clustering
 */

const getAllCryptoNames = (request, response) => {
    pool.query(
        `SELECT ARRAY(SELECT "Currency Name" FROM "CurrencyNames")`,
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const getAllCryptoPrices = (request, response) => {
    const currencyName = request.query.currencyName;

    pool.query(
        `SELECT ARRAY(SELECT "${currencyName}" FROM "CurrencyPricesByDate")`,
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

module.exports = {
    pool,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllCryptoNames,
    getAllCryptoPrices
};
