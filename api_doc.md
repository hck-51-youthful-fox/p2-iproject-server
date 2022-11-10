# Customer API Documentation

## Endpoints :

List of available endpoints:
user
- `POST /register`
- `POST /login`
- `POST /premium`
- `PATCH /premium`

public
- `GET /pub/videos/:id`
- `GET /pub/videos`

likes
- `GET /likes`
- `POST /likes/:videoId`

&nbsp;

## 1. POST /register

Description:
- register customer

Request:

- body:
```json
{
  "email": "string",
  "password": "string",
  "avatar": "string",
}
```

_Response (201 - OK)_

```json
{
  "id": "string",
	"email": "string",
  "avatar": "string",
}
```

_Response (400 - empty_email)_

```json
{
  "message": "Email is required"
}
```

_Response (400 - empty_password)_

```json
{
  "message": "Password is required"
}
```
_Response (400 - SequelizeUniqueConstraintError)_

```json
{
  "message": [
        "email must be unique"
    ]
}
```

_Response (400 - SequelizeValidationError)_
```json
{
  "message": ["Please type in valid email"]
}
OR
{
  "message": ["Password min length is 5"]
}
```

&nbsp;

## 2. POST /login

Description:
- login customer

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
    "access_token": "string", 
    "email": "string",
    "id": "integer",
    "isPremium": "boolean" ,
    "avatar": "boolstringean" 
}
```

_Response (401 - invalid_credentials)_

```json
{
  "message": "Invalid email or password"
}
```

_Response (401 - JsonWebTokenError)_

```json
{
  "message": "Please login first"
}
```

&nbsp;

## 3. POST /premium

Description:
- create payment transaction midtrans

Request:

- headers:

```json
{
  "access_token": "string",
}
```

_Response (201 - OK)_

```json
{
    "transactionToken": "string", 
}
```

&nbsp;

## 4. PATCH /premium

Description:
- Update status to premium account after payment

Request:

- headers:

```json
{
  "access_token": "string",
}
```

_Response (200 - OK)_
```json
{
    "message": "Successfully upgraded your account to Premium!""
}
```

&nbsp;

## 5. GET /videos/:id

Description:
- Get video detail (by videoId) from youtube - rapid API

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "avatarUrl": "string",
  "subscribers": "integer",
  "channel": "string",
  "description": "string",
  "thumbnails": "string",
  "videoId": "string",
  "title": "string",
  "keywords": "string",
  "publishedDate": "date",
  "commentsCount": "string",
  "likesCount": "integer",
  "viewsCount": "integer",
}
```

_Response (404 - data_not_found)_

```json
{
  "message": "cannot find video"
}
```

&nbsp;

## 6. GET /videos

Description:
- Get all videos based on keywords query, default keyword is youtube

Request:

- query: 

```json
{
  "keyword": "string"
}
```

_Response (200 - OK)_
```json
[
  {
    "avatarUrl": "string",
    "channel": "string",
    "views": "integer",
    "link": "string",
    "publishedDate": "string",
    "title": "string",
    "videoId": "string",
  },
  ...,
]
```

&nbsp;


## 7. POST /likes/:videoId

Description:
- Add new likes to database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "videoId": "integer (required)",
}
```

- body:

```json
{
  "title": "string",
  "link": "string",
  "avatarUrl": "string",
  "channel": "string",
  "views": "integer",
  "publishedDate": "date",
  "isVerified": "boolean"
}
```

_Response (201 - Created)_

```json
{
 "message": "Video has been added to your list!"
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Please login first"
}
```

_Response (403 - NOT_PREMIUM)_

```json
{
  "message": "Subscribe to our premium plan to access this page"
}
```

_Response (404 - data_not_found)_

```json
{
  "message": "Cannot find video"
}
```

&nbsp;

## 8. GET /likes

Description:
- Get all likes of certain user from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
  {
    "userId": "integer",
    "videoId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Video": {
      "avatarUrl": "string",
      "channel": "string",
      "views": "integer",
      "link": "string",
      "publishedDate": "string",
      "title": "string",
      "videoId": "string",
       "createdAt": "date",
       "updatedAt": "date",
    }
  }
  ...,
]
```

_Response (401 - unauthorized)_

```json
{
  "message": "Please login first"
}
```

&nbsp;


## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
