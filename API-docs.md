endpoint

- `POST/register`
- `POST/login`
- `POST/payment`
- `PATCH/payment/:id`
- `GET/notes`
- `POST/notes`
- `DELETE/notes/:id`
- `PATCH/notes/:id`

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "status": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "status": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password min 5"
}
OR
{
  "message": "Username must be unique"
}
OR
{
  "message": "Email must be unique"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "code": "integer",
  "access_token": "string",
  "id": "integer",
  "status": "string",
  "username": "string",
  "message": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3.POST/payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

## 4. PATCH/payment/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "status": "premium"
}
```

## 5. GET/notes

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "date": "date"
}
```

## 6 POST/notes

Request:

- body:

```json
{
  "title": "string",
  "description": "string",
  "date": "date",
  "categoryId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "data successfully added"
}
```

## 7 DELETE/notes/:id

Request:

- body:

```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "data successfull to delete"
}
```

## 8 PATCH/notes/:id

Request:

- body:

```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success update notes"
}
```
