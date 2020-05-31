const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const userRepository = require('./repositories/userRepository');

//listing all the users
routes.get('/auth/signup', async (request, response) => {
    await userRepository.list(request, response);

    return response.json();
});

//user signup
routes.post('/auth/signup', async (request, response) => {
    console.log(request.body);

    await userRepository.save(request.body);

    return response.json();
});

//user login
routes.post('/auth/login', async (request, response) => {
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