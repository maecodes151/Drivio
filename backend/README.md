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
