## Endpoints

List of Available Endpoints:

- `POST/ users/register`
- `POST/ users/login`
- `GET/ players`
- `GET/ positions`
- `POST/ positions`
- `GET/ api/premier`
- `GET/ api/search`

### POST /users/register

#### Description

- add a user

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
    {
      "id": Integer,
      "email": String
    }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "code": 400,
    "message": String
   }

  ```

### POST /users/login

#### Description

- add a user

#### Request

- Body
  ```json
  {
    "username": String,
    "password": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": String,
    "email": String,
    "username": String,
    "password": String
  }
  ```
  _400 - Bad Request_
- Body
  ```json
  {
    "code": 400,
    "message": String
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "code": 401,
    "message": String
  }
  ```

### GET /players

### Description

- view all availables player to use in my team

- Headers

```json
{
  "headers": "application/x-www-form-urlencoded"
}
```

- Body
  ```json
      {
        "id": Integer,
        "name": String,
        "imgUrl": String,
        "position": String,
        "updatedAt": Date,
        "updatedAt": Date
      },
      ...
  ```

### GET /positions

### Description

- view my team base on id

- Headers

```json
{
  "headers": "application/x-www-form-urlencoded"
}
```

_200 Ok_

- Body

  ```json
      {
        "id": Integer,
        "UserId": Integer,
        "PlayerId": Integer,
        "Position": String,
        "createdAt": Date,
        "updatedAt": Date,
        "Player": {
          "id": Integer,
          "name": String,
          "imgUrl": String,
          "createdAt": Date,
          "updatedAt": Date,

        }
      },
      ...
  ```

### POST /positions

### Description

- view my team base on id

- Headers

```json
{
  "headers": "application/x-www-form-urlencoded"
}
```

### Request

-body

```json
    {
      "GK": Integer,
      "LB": Integer,
      "LCB": Integer,
      "RCB": Integer,
      "RB": Integer,
      "LMF": Integer,
      "LCMF": Integer,
      "RCMF": Integer,
      "RMF": Integer,
      "SS": Integer,
      "ST": Integer
    }
```

### Response

_200 - Ok_

- Body
  ```json
  [
      {
        "id": Integer,
        "UserId": Integer,
        "PlayerId": Integer,
        "Position": String,
        "createdAt": Date,
        "updatedAt": Date,
        "Player": {
            "id": Integer,
            "name": String,
            "imgUrl": String,
            "position": String,
            "createdAt": String,
            "updatedAt": String
        }
    }
    ...
  ]
  ```

### GET /api/premier

### Description

- view premier league clubs data

- Headers

```json
{
  "headers": "application/x-www-form-urlencoded"
}
```

_200 - Ok_

- Body

  ```json
  [

      {
    "SeasonTeamId": Integer,
    "SeasonId": Integer,
    "TeamId": Integer,
    "TeamName": String,
    "Active": Boolean,
    "Gender": String,
    "Type": String,
    "Team": {
      "TeamId": Integer,
      "AreaId": Integer,
      "VenueId": Integer,
      "Key": String,
      "Name": String,
      "FullName": String,
      "Active": Boolean,
      "AreaName": String,
      "VenueName": String,
      "Gender": String,
      "Type": String,
      "Address": String,
      "City": String,
      "Zip": String,
      "Phone": String,
      "Fax": String,
      "Website": String,
      "Email": String,
      "Founded": Integer,
      "ClubColor1": String,
      "ClubColor2": String,
      "ClubColor3": String,
      "Nickname1": String,
      "Nickname2": String,
      "Nickname3": String,
      "WikipediaLogoUrl": String,
      "WikipediaWordMarkUrl": String,
      "GlobalTeamId": Integer
    }
  },
  ...
  ]
  ```

  ### GET /api/search

### Description

- search player by name

- Headers

```json
{
  "headers": "application/x-www-form-urlencoded"
}
```

_200 - Ok_

- Body

  ```json

      {
    "result": [
      {
      "abilities": Object,
      "age": Integer,
      "birth_date": String,
      "ca": Integer,
      "foot": Object,
      "game_info": Object,
      "name": String,
      "nationality": String,
      "pa": Integer,
      "player_id": Integer,
      "position": String,
      "position_detail": Object,
      "profile_img": String,
      "reputation": Integer,
      "profile_img": "https://df11img.s3-us-west-1.amazonaws.com/7458272.png",
      "reputation": 8750
      },
      ...
    ]
    }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "code": 500,
    "message": "Internal Server Error"
  }
  ```
