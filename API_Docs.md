##API-Docs:
server:" https://nba-live.herokuapp.com"

## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`

Routes below need authentication:

- `GET /nba/live-score`
- `GET /nba/nba-league`
- `GET /nba/standings`
- `POST /nba/payment`
- `PATCH /nba/update`

## 1. POST /register

Request:

-body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "status": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "msg": "Register successful",
  "data": {
    "id": "integer",
    "username": "string",
    "email": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": [
        "user name is required"
    ]
}
OR
{
    "msg": [
        "Email must not empty",
        "Email is invalid"
    ]
}
OR
{
    "msg": [
        "password is required"
    ]
}
OR
{
    "msg": [
        "password min 5 characters"
    ]
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

_Response(200 - OK)_

```json
{
  "email": "string",
  "access_token": "string"
}
```

_Response(400 - Bad Request)_

```json
{
  "msg": "Invalid Email or Password"
}
```

## 3. POST /login-google

Request:

- body:

```json
{
  "email": "string"
}
```

_Response(200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "status": "string",
  "email": "string"
}
```

_Response(400 - Bad Request)_

```json
{
  "msg": "Invalid Email or Password"
}
```

## 4. GET /nba/live-score

Description:

- Get Data Live-score from API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response(200 - OK)_

```json
[
  {
    "date": "2022-11-10T00:00:00.000Z",
    "status": "In Play",
    "periods": {
      "current": 1,
      "total": 4,
      "endOfPeriod": false
    },
    "homeTeam": "Orlando Magic",
    "awayTeam": "Dallas Mavericks",
    "scoreHomeTeam": 14,
    "scoreAwayTeam": 15,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/b/bd/Orlando_Magic_logo_2010.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png"
  }
]
```

## 5. GET /nba/nba-league

Description:

- Get Data NBA league seasson 2022 from API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response(200 - OK)_

```json
[
  {
    "date": "2022-10-10T00:30:00.000Z",
    "status": "Finished",
    "periods": {
      "current": 4,
      "total": 4,
      "endOfPeriod": false
    },
    "arena": null,
    "city": null,
    "homeTeam": "Golden State Warriors",
    "awayTeam": "Los Angeles Lakers",
    "scoreHomeTeam": 121,
    "scoreAwayTeam": 124,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png"
  },
  {
    "date": "2022-10-10T01:00:00.000Z",
    "status": "Finished",
    "periods": {
      "current": 4,
      "total": 4,
      "endOfPeriod": false
    },
    "arena": null,
    "city": null,
    "homeTeam": "Sacramento Kings",
    "awayTeam": "Portland Trail Blazers",
    "scoreHomeTeam": 126,
    "scoreAwayTeam": 94,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/9/95/Kings_de_Sacramento_logo.svg/1200px-Kings_de_Sacramento_logo.svg.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Portland_Trail_Blazers_logo.svg/1200px-Portland_Trail_Blazers_logo.svg.png"
  },
  {
    "date": "2022-10-10T02:30:00.000Z",
    "status": "Finished",
    "periods": {
      "current": 4,
      "total": 4,
      "endOfPeriod": false
    },
    "arena": null,
    "city": null,
    "homeTeam": "LA Clippers",
    "awayTeam": "Minnesota Timberwolves",
    "scoreHomeTeam": 117,
    "scoreAwayTeam": 119,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/d/d6/Los_Angeles_Clippers_logo_2010.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d9/Timberwolves_du_Minnesota_logo_2017.png/200px-Timberwolves_du_Minnesota_logo_2017.png"
  },
  {
    "date": "2022-10-10T23:00:00.000Z",
    "status": "Finished",
    "periods": {
      "current": 4,
      "total": 4,
      "endOfPeriod": false
    },
    "arena": null,
    "city": null,
    "homeTeam": "Charlotte Hornets",
    "awayTeam": "Washington Wizards",
    "scoreHomeTeam": 107,
    "scoreAwayTeam": 116,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/archive/d/d6/20161212034849%21Wizards2015.png"
  },
  {
    "date": "2022-10-10T23:00:00.000Z",
    "status": "Finished",
    "periods": {
      "current": 4,
      "total": 4,
      "endOfPeriod": false
    },
    "arena": null,
    "city": null,
    "homeTeam": "Cleveland Cavaliers",
    "awayTeam": "Philadelphia 76ers",
    "scoreHomeTeam": 97,
    "scoreAwayTeam": 113,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/4/48/76ers_2016.png"
  },
  {
    "date": "2022-10-10T23:30:00.000Z",
    "status": "Finished",
    "periods": {
      "current": 4,
      "total": 4,
      "endOfPeriod": false
    },
    "arena": null,
    "city": null,
    "homeTeam": "Miami Heat",
    "awayTeam": "Houston Rockets",
    "scoreHomeTeam": 118,
    "scoreAwayTeam": 110,
    "homeTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png",
    "awayTeamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Houston_Rockets_logo_2003.png/330px-Houston_Rockets_logo_2003.png"
  }
]
```

## 6. GET /nba/standings

Description:

- Get Data Standings from API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response(200 - OK)_

```json
[
    {
        "team": "Boston Celtics",
        "teamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png",
        "conference": "east",
        "rank": 3,
        "totalWin": 7,
        "totalLoses": 3
    },
    {
        "team": "Toronto Raptors",
        "teamLogo": "https://upload.wikimedia.org/wikipedia/fr/8/89/Raptors2015.png",
        "conference": "east",
        "rank": 5,
        "totalWin": 6,
        "totalLoses": 5
    },
    {
        "team": "New York Knicks",
        "teamLogo": "https://upload.wikimedia.org/wikipedia/fr/3/34/Knicks_de_NY.png",
        "conference": "east",
        "rank": 7,
        "totalWin": 5,
        "totalLoses": 5
    },
    ...
]
```

## 7. POST /nba/payment

Description:

- POST payment from API using MIDTRANS

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response(200 - OK)_

```json
{
  "transactionToken": "86627d71-1072-45e4-b65e-f48d88fa4b51"
}
```

## 8. PATCH /nba/update

Description:

- Edit status user from Database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response(201 - Created)_

```json
{
  "msg": "Successfull Updated Status",
  "updated": {
    "id": 1,
    "status": "Premium"
  }
}
```

_Response(404 - Not Found)_

```json
{
  "msg": "User id is not found"
}
```

## Global Error

_Response(500 - Internal Server Error)_

```json
{
  "msg": "Internal Server Error"
}
```
