## Endpoints

List of Available Endpoints:

Users:

- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`
- `GET /users/details`
- `PUT /users/details`
- `PATCH /users/details/verify`

Games:

- `GET /games`
- `GET /games/explore`
- `GET /games/:id`

Genres:

- `GET /genres`

Reviews:

- `GET /reviews/:GameId`
- `POST /reviews/:GameId`

&nbsp;

# Users

## POST /users/register

### Description

- Add/register new user.

### Request

- Headers

  ```json
  {
  	"Content-Type": "application/x-www-form-urlencoded"
  }
  ```

- Body
  ```json
  {
      "username": STRING,
      "email": STRING,
      "password": STRING
  }
  ```

### Response

_201 - Created_

- Body
  ```json
  {
  		"id": INTEGER,
  		"email": STRING
  }
  ```

&nbsp;

## POST /users/login

### Description

- Login with email and password.

### Request

- Headers

  ```json
  {
  	"Content-Type": "application/x-www-form-urlencoded"
  }
  ```

- Body
  ```json
  {
      "email": STRING,
      "password": STRING
  }
  ```

### Response

_200 - Ok_

- Body
  ```json
  {
    "access_token" : STRING,
    "username" : STRING,
    "verified" :  STRING
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message" : "Email and Password is required"
  }
  OR
  {
    "message" : "Email is required"
  }
  OR
  {
    "message" : "Password is required"
  }
  ```

&nbsp;

## POST /users/google-login

### Description

- Login with google account.

### Request

- Headers
  ```json
  {
  	"google_token": STRING
  }
  ```

### Response

_200 - Ok_

- Body
  ```json
  {
    "access_token" : STRING,
    "username" : STRING,
    "verified" :  STRING
  }
  ```

&nbsp;

## GET /users/details

### Description

- Get logged user details.

### Request

- Headers
  ```json
  {
    "access_token" : STRING
  }
  ```

### Response

_200 - Ok_

- Body
  ```json
  {
    "firstName" : STRING,
    "lastName" : STRING,
    "birthDate" :  DATE
  }
  ```

&nbsp;

## PUT /users/details

### Description

- Update logged user details.

### Request

- Headers

  ```json
  {
    "access_token" : STRING,
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```

- Body
  ```json
  {
    "firstName" : STRING,
    "lastName" : STRING,
    "birthDate" :  DATE
  }
  ```

### Response

_200 - Ok_

- Body
  ```json
  {
  	"message": "Edit user detail successful!"
  }
  ```

&nbsp;

## PATCH /users/details

### Description

- Update logged user Verified status, verified using Third-Party API (E-mail check).
- https://rapidapi.com/Top-Rated/api/e-mail-check-invalid-or-disposable-domain/

### Request

- Headers

  ```json
  {
    "access_token" : STRING,
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```

- Body
  ```json
  {
    "firstName" : STRING,
    "lastName" : STRING,
    "birthDate" :  DATE
  }
  ```

### Response

_200 - Ok_

- Body
  ```json
  {
  	"message": "Email verification successful!"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message" : "Verification rejected! <reason>!"
  }
  OR
  {
    "message" : "User already verified!"
  }
  OR
  {
    "message" : "Please fill in your user details first!"
  }
  ```

&nbsp;

# Games

## GET /games

### Description

- Get all games data.

### Response

_200 - OK_

- Body
  ```json
    {
        "totalGame": INTEGER,
        "currentPage": INTEGER,
        "games":
        [
            {
                "id" : INTEGER,
                "name" : STRING,
                "imageUrl" : STRING,
                "rating" : INTEGER,
                "Genres" : [
                    {
                        "id" : INTEGER,
                        "name" : STRING
                    },
                    ...
                ]
            },
            ...
        ]
    }
  ```

&nbsp;

## GET /games/explore

### Description

- Get game data from Third-Party API (rawg.io) and integrates it into database.
- https://rawg.io/apidocs

### Request

- Headers
  ```json
  {
    "access_token": STRING
  }
  ```

### Response

_200 - OK_

- Body
  ```json
    {
        "next" : STRING,
        "games":
            [
                {
                    "id" : INTEGER,
                    "name" : STRING,
                    "imageUrl" : STRING,
                    "rating" : INTEGER,
                },
                ...
            ]
    }
  ```

&nbsp;

## GET /games/:GameId

### Description

- Get game id detail and its reviews.

### Response

_200 - OK_

- Body

  ```json
    {
        "id" : INTEGER,
        "name" : STRING,
        "imageUrl" : STRING,
        "rating" : INTEGER,
        "Genres" : [
            {
                "id" : INTEGER,
                "name" : STRING
            },
            ...
        ],
        "UserReview" : [
            {
                "id" : INTEGER,
                "review" : TEXT,
                "score" : INTEGER,
                "GameId" : INTEGER,
                "UserId" : INTEGER,
                "User" : {
                    "username" : STRING
                }
            },
            ...
        ]
    }
  ```

  _404 - Not Found_

- Body
  ```json
  {
  	"message": "Game with id ${error.id} not found!"
  }
  ```

&nbsp;

# Genres

## GET /genres

### Description

- Get all genres data.

### Request

- Headers

  ```json
  {
    "access_token": STRING
  }
  ```

- Body
  ```json
  {
      "review": TEXT,
      "score": INTEGER
  }
  ```

### Response

_201 - Created_

- Body
  ```json
  {
  	"message": "Review posted succesfull!"
  }
  ```

&nbsp;

# Reviews

## POST /reviews/:GameId

### Description

- Post a review of game with GameId, by logged user, before review is posted to database, it's checked by Third-Party API (Purgo Malum).
- https://rapidapi.com/community/api/purgomalum-1/

### Request

- Headers
  ```json
  {
    "access_token": STRING,
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
    [
      {
        "id": INTEGER,
        "title": STRING,
        "description": STRING,
        "updatedBy": STRING,
        "createdAt": DATE,
        "updatedAt": DATE
      },
      ...
    ]
  ```

&nbsp;

# Global Error

### Response

_500 - Internal Server Error_

- Body
  ```json
  {
  	"message": "Internal Server Error"
  }
  ```

&nbsp;

_401 - Unauthorized_

- Body
  ```json
  {
  	"message": "Invalid email or password"
  }
  ```
  &nbsp;

_403 - Forbidden_

- Body

  ```json
  {
  	"message": "Invalid Access!"
  }
  ```
