# JWT Authentication with NodeJS
This is a API to make signup and authentication using JWT.

## Routes

### POST /auth/signup

Route to register a new user.

The body must have: 
- `name`: The user name
- `surname`: The user surname
- `email`: The user email
- `password`: The user password
- `type`: The user type (admin, moderator, etc)

It returns the following:
```json
{
    acess_token = {jwt}
}
```
The `access_token` is signed with the secretKey located at the `config.json` file.

### POST /auth/login

Route to log a user in.

The body must have:
- `email`: The user email
- `password`: The user password

It returns the following:
```json
{
    acess_token = {jwt}
}
```
The `access_token` is signed with the secretKey located at the `config.json` file.

### GET /user
Route to retrieve user data.


The JWT - `access_token` must be sent on the `Authorization` header as follows: `authorization: {jwt}`

It returns the following:
```json
{
  "authData": {
    "user": {
      "id": "userId",
      "createdAt": "dateWhenWasCreated",
      "updatedAt": null,
      "deletedAt": null,
      "name": "userName",
      "surname": "userSurname",
      "email": "userEmail",
      "password": "userEncryptedPassword",
      "type": "userType"
    }
  }
}
```

## Running it

Just clone the repository, run `npm install` and then `npm start`.

If you want to run it on another port, just change  the `app.listen(PORT)` on index.js.

