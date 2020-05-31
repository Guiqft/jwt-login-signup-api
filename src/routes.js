const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//to validate inputs
const { check, validationResult } = require('express-validator')

const routes = express.Router();

const userRepository = require('./repositories/userRepository');

//validating the inputs
const validationRules = [
    check('name').isAlphanumeric(),
    check('surname').isAlphanumeric(),
    //checking if email is already in use 
    check('email').isEmail().custom(value => {
        return userRepository.getUserByEmail(value).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }
        })
    }),
    check('password').isLength({ min: 8 }),
    check('type').isAlphanumeric()
]   

// Options route used for preflight request to the login POST route (cors)
routes.options("/*", (request, response) => {
    response.header('access-control-allow-origin', '*');
    response.header('access-control-allow-methods', 'POST');
    response.header('access-control-allow-headers', ' Accept, access-control-allow-origin, Content-Type');
    response.sendStatus(204);
});

//listing all the users
routes.get('/auth/signup', async (request, response) => {
    await userRepository.list(request, response);

    return response.json();
});

//user signup
routes.post('/auth/signup', validationRules, async (request, response) => {
    console.log(request.body);

    //validating the results
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    await userRepository.save(request.body);

    return response.json();
});

//user login
routes.post('/auth/login', async (request, response) => {
    response.header('access-control-allow-origin', '*');

    const user = await userRepository.getUserByEmail(request.body.email);
    console.log(user);

    //comparing the passwords
    const isPasswordCorrect = await bcrypt.compare(request.body.password, user.password);

    if (isPasswordCorrect) {
        const token = jwt.sign({ user }, 'secretKey');
        return response.send(JSON.stringify({ authorization: token }));
    }
    return response.sendStatus(500);;
});

module.exports = routes;