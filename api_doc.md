## Endpoints

List of Available Endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /users/verify/:uniqueStr`
- `GET /`
- `GET /:showId`
- `GET /search`
- `GET /rents/myrent`
- `POST /rents/:ShowId`
- `DELETE /rents/:id`

### GET /

#### Description

-Get all shows

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
       "id": Integer,
        "url": STRING,
        "name": STRING,
        "type": STRING,
        "language": STRING,
        "genres": [
            STRING
        ],
        "status": STRING,
        "runtime": INTEGER,
        "averageRuntime": INTEGER,
        "premiered": DATE,
        "ended": DATE,
        "officialSite": STRINGINTEGER,
        "schedule": {
            "time": DATE,
            "days": [
                STRING
            ]
        },
        "rating": {
            "average":INTEGER
        },
        "weight": INTEGER,
        "network": {
            "id": INTEGER,
            "name":STRING,
            "country": {
                "name": STRING,
                "code": STRING,
                "timezone": STRING
            },
            "officialSite": STRING
        },
        "webChannel": STRING,
        "dvdCountry":STRING,
        "externals": {
            "tvrage": INTEGER,
            "thetvdb": INTEGER,
            "imdb": STRING
        },
        "image": {
            "medium":STRING,
            "original": STRING
        },
        "summary": STRING,
        "updated": INTEGER,
        "_links": {
            "self": {
                "href": STRING
            },
            "previousepisode": {
                "href": STRING
            }
        }
        }
      }
      ...
    ]
  }
  ```

### GET /rents/myrent

#### Description

-Get all rented shows

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
       "id": Integer,
        "url": STRING,
        "name": STRING,
        "type": STRING,
        "language": STRING,
        "genres": [
            STRING
        ],
        "status": STRING,
        "runtime": INTEGER,
        "averageRuntime": INTEGER,
        "premiered": DATE,
        "ended": DATE,
        "officialSite": STRINGINTEGER,
        "schedule": {
            "time": DATE,
            "days": [
                STRING
            ]
        },
        "rating": {
            "average":INTEGER
        },
        "weight": INTEGER,
        "network": {
            "id": INTEGER,
            "name":STRING,
            "country": {
                "name": STRING,
                "code": STRING,
                "timezone": STRING
            },
            "officialSite": STRING
        },
        "webChannel": STRING,
        "dvdCountry":STRING,
        "externals": {
            "tvrage": INTEGER,
            "thetvdb": INTEGER,
            "imdb": STRING
        },
        "image": {
            "medium":STRING,
            "original": STRING
        },
        "summary": STRING,
        "updated": INTEGER,
        "_links": {
            "self": {
                "href": STRING
            },
            "previousepisode": {
                "href": STRING
            }
        }
        }
      }
      ...
    ]
  }
  ```

### DELETE /rents/:id

#### Description

- delete a rent data

#### Response

_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "data": {
          "message": String,
      }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```

### GET /:showId

#### Description

-Get show by id

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data":
      {
       "id": Integer,
        "url": STRING,
        "name": STRING,
        "type": STRING,
        "language": STRING,
        "genres": [
            STRING
        ],
        "status": STRING,
        "runtime": INTEGER,
        "averageRuntime": INTEGER,
        "premiered": DATE,
        "ended": DATE,
        "officialSite": STRINGINTEGER,
        "schedule": {
            "time": DATE,
            "days": [
                STRING
            ]
        },
        "rating": {
            "average":INTEGER
        },
        "weight": INTEGER,
        "network": {
            "id": INTEGER,
            "name":STRING,
            "country": {
                "name": STRING,
                "code": STRING,
                "timezone": STRING
            },
            "officialSite": STRING
        },
        "webChannel": STRING,
        "dvdCountry":STRING,
        "externals": {
            "tvrage": INTEGER,
            "thetvdb": INTEGER,
            "imdb": STRING
        },
        "image": {
            "medium":STRING,
            "original": STRING
        },
        "summary": STRING,
        "updated": INTEGER,
        "_links": {
            "self": {
                "href": STRING
            },
            "previousepisode": {
                "href": STRING
            }
        }
        }
      }
  }
  ```

### POST /users/register

#### Description

- add a user

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
      "username": String,
      "email": String,
      "password": String,
      "role": String,
      "phoneNumber": String,
      "address": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "data": {
        "id": Integer,
        "email": String
      }
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

  ### POST /users/login

#### Description

- log a user

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "password": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "data": {
          "access_token": String,
          "username": String,
          "email": String,
          "id": Integer,
      }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```

### GET /users/verify/:uniqueStr

#### Description

- verify a user

#### Response

_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "data": {
          "message": String,
      }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
