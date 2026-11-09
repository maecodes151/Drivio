# Drivio Backend API

## Register a User

Creates a new user account and returns an authentication token.

- **Method:** `POST`
- **Endpoint:** `/users/register`
- **Content-Type:** `application/json`

### Request Body

Send the following JSON data:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

### Required Fields

| Field | Type | Requirements |
|---|---|---|
| `fullname.firstname` | String | Required, minimum 3 characters |
| `fullname.lastname` | String | Required, minimum 3 characters |
| `email` | String | Required, valid email address |
| `password` | String | Required, minimum 6 characters |

### Success Response

**`201 Created`** — User registered successfully.

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
  }
}
```

The example above shows the recommended response format. Ensure your controller excludes the password hash from the returned user object.

### Error Responses

**`400 Bad Request`** — Request validation failed.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**`500 Internal Server Error`** — An unexpected server or database error occurred, if handled by your error-handling middleware.

### Example Request Using cURL

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Doe"},"email":"jane.doe@example.com","password":"secret123"}'
```

**Note:** The complete URL depends on the router mount path configured in `app.js`. The example assumes the server runs on port `4000` and the router is mounted at `/users`.

## Log In a User

Authenticates an existing user and returns an authentication token.

- **Method:** `POST`
- **Endpoint:** `/users/login`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

| Field | Type | Requirements |
|---|---|---|
| `email` | String | Required, valid email address |
| `password` | String | Required, minimum 6 characters |

### Success Response

**`200 OK`** — Credentials are valid.

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
  }
}
```

The password (including its stored hash) should not be included in the returned `user`.

### Error Responses

**`401 Unauthorized`** — The email address or password is incorrect.

```json
{
  "message": "Invalid email or password"
}
```

The route also validates the email format and requires a password of at least 6 characters. The login controller currently has a typo in its validation-error response (`res.staus`); invalid request bodies may therefore fail instead of returning the intended `400 Bad Request`.

### Example Request Using cURL

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"secret123"}'
```

The example assumes the router is mounted at `/users` and the server is running on port `4000`. `server.js` defaults to port `3000` only when the `PORT` environment variable is not set.

## Get the Current User Profile

Returns the authenticated user's profile.

- **Method:** `GET`
- **Endpoint:** `/users/profile`
- **Authentication:** Required. Send the JWT in the `token` cookie or in the `Authorization` header using the JWT authentication scheme.

### Success Response

**`200 OK`** — The authenticated user's profile.

```json
{
  "_id": "<user-id>",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "<stored-password-hash>",
  "socketId": "<socket-id>"
}
```

The response is the serialized user document; `socketId` may be absent. The current model also serializes the password hash; the placeholder above illustrates that field, which should be excluded before returning this response.

### Error Response

**`401 Unauthorized`** — The token is missing, invalid, expired, or has been logged out.

```json
{
  "message": "Unauthorized"
}
```

### Example Request Using cURL

```bash
curl http://localhost:4000/users/profile \
  -b "token=<jwt-token>"
```

## Log Out a User

Logs out the authenticated user by clearing the `token` cookie and adding the JWT to the token blacklist. The authentication middleware checks this blacklist on protected requests, so the logged-out JWT can no longer be used. The JWT may be supplied in the `token` cookie or as the second space-separated value in the `Authorization` header.

- **Method:** `GET`
- **Endpoint:** `/users/logout`
- **Authentication:** Required. Send the JWT in the `token` cookie or as the second space-separated value in the `Authorization` header.

### Success Response

**`200 OK`** — The token was blacklisted.

```json
{
  "message": "logout out"
}
```

After logout, the token is rejected by authenticated routes whether it was supplied through the cookie or the Authorization header.

### Error Response

**`401 Unauthorized`** — The token is missing, invalid, expired, or has already been logged out.

```json
{
  "message": "Unauthorized"
}
```

## Captain API

The captain API routes are mounted at `/captains` in `app.js`.

### Register a Captain

Creates a captain profile and, on success, returns a JWT and the new profile.
Registration does not require an existing authentication token.

- **Method:** `POST`
- **Endpoint:** `/captains/register`
- **Content-Type:** `application/json`

#### Request body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

All fields are required. The endpoint validates the request as follows:

| Field | Type | Requirements |
|---|---|---|
| `fullname.firstname` | String | At least 3 characters |
| `fullname.lastname` | String | At least 3 characters |
| `email` | String | Valid email address |
| `password` | String | At least 6 characters |
| `vehicle.color` | String | At least 3 characters |
| `vehicle.plate` | String | At least 3 characters |
| `vehicle.capacity` | Integer | At least 1 |
| `vehicle.vehicleType` | String | `car`, `motorcycle`, or `auto` |

Name, email, color, and plate values are trimmed before validation. Passwords
are hashed before storage and are not included in the response. A newly
registered captain has an `inactive` status by default. The JWT expires after
24 hours; configure `JWT_SECRET` and `DB_CONNECT` in the backend environment.

#### Success response

**`201 Created`**

```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

Optional fields such as the captain's socket ID and location are omitted until
set. The serialized captain document may also contain its MongoDB `__v`
version field.

#### Error responses

**`400 Bad Request`** — One or more fields failed validation.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**`409 Conflict`** — A captain with the submitted email already exists.

```json
{
  "message": "Captain already exists"
}
```

**`500 Internal Server Error`** — An unexpected server or database error
occurred.

#### Example request using cURL

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Doe"},"email":"jane.doe@example.com","password":"secret123","vehicle":{"color":"blue","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```

The example assumes port `4000`. The server uses the configured `PORT` value
or falls back to port `3000` when `PORT` is not set.

### Log In a Captain

Authenticates a captain and returns a JWT. The token is also set in the
`token` cookie.

- **Method:** `POST`
- **Endpoint:** `/captains/login`
- **Content-Type:** `application/json`

#### Request body

```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

The email must be valid and the password must contain at least 6 characters.

#### Success response

**`200 OK`**

```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "<stored-password-hash>",
    "status": "inactive",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "__v": 0
  }
}
```

The current login controller includes the stored password hash in `captain`.
Do not expose this field; it should be removed before returning the captain
object.

#### Error responses

**`400 Bad Request`** — Email or password validation failed. The response
contains an `errors` array.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**`401 Unauthorized`** — The email or password is incorrect.

```json
{
  "message": "Invalid email or password"
}
```

### Get the Captain Profile

Returns the profile belonging to the authenticated captain.

- **Method:** `GET`
- **Endpoint:** `/captains/profile`
- **Request body:** None
- **Authentication:** Required. Send the JWT in the `token` cookie or an
  `Authorization: Bearer <jwt-token>` header.

#### Success response

**`200 OK`**

```json
{
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "__v": 0
  }
}
```

Optional fields such as `socketId` and `location` are present only when set.
The password is excluded from this response by the captain model.

#### Error response

**`401 Unauthorized`** — The token is missing, invalid, expired, or logged out.

```json
{
  "message": "Unauthorized"
}
```

### Log Out a Captain

Blacklists the authenticated captain's JWT and clears the `token` cookie.

- **Method:** `POST`
- **Endpoint:** `/captains/logout`
- **Authentication:** Required. Send the JWT in the `token` cookie or an
  `Authorization: Bearer <jwt-token>` header.
- **Request body:** None

#### Success response

**`200 OK`**

```json
{
  "message": "Logged out successfully"
}
```

#### Error response

**`401 Unauthorized`** — The token is missing, invalid, expired, or logged out.

```json
{
  "message": "Unauthorized"
}
```
