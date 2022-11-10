# p2-iproject-server
Individual Project - Server

List of Available Endpoints:
- `GET /movies`
- `GET /movies/:id`
- `POST /movies`
- `DELETE /movies/:id`
- `GET /genres`
- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`

## GET /movies
### Description
- get all movies data

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```

### response
_200 - OK_

- Body
```json
[
    {
        "id": 1,
        "title": "Kara No Kyokai: Paradox Bridge",
        "synopsis": "Illidge",
        "trailerUrl": "https://www.youtube.com/watch?v=_OeIWIkDXvk",
        "imgUrl": "https://cdn.myanimelist.net/images/anime/1574/112838.jpg",
        "rating": 9,
        "authorId": 5,
        "genreId": 2,
        "createdAt": "2022-10-17T11:05:42.151Z",
        "updatedAt": "2022-10-17T11:05:42.151Z",
        "Genre": {
            "id": 2,
            "name": "Adventure",
            "createdAt": "2022-10-17T11:05:40.026Z",
            "updatedAt": "2022-10-17T11:05:40.026Z"
        },
        "User": {
            "id": 5,
            "username": "awelbrock4",
            "email": "rloughrey4@usatoday.com",
            "role": "staff",
            "phoneNumber": "582-393-1190",
            "address": "5 Gerald Parkway",
            "createdAt": "2022-10-17T11:05:41.123Z",
            "updatedAt": "2022-10-17T11:05:41.123Z"
        }
    },
    ...
]
```

--------------------------------------------

## GET /movies/:id
### Description
- one movie data

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```

### response
_200 - OK_

- Body
```json
{
    "id": 1,
    "title": "Kara No Kyokai: Paradox Bridge",
    "synopsis": "Illidge",
    "trailerUrl": "https://www.youtube.com/watch?v=_OeIWIkDXvk",
    "imgUrl": "https://cdn.myanimelist.net/images/anime/1574/112838.jpg",
    "rating": 4,
    "authorId": 5,
    "genreId": 2,
    "createdAt": "2022-10-17T09:02:42.577Z",
    "updatedAt": "2022-10-17T09:02:42.577Z",
    "Genre": {
        "name": "Adventure"
    },
    "User": {
        "username": "awelbrock4"
    }
}
```
### response
_404 - Not found_

 Body
```json
{"msg":"Movie data not found!"}
```

--------------------------------------------

## POST /movies
### Description
- add movie

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```

-body
```json
{
    "title": "Dragon Ball Super: Broly",
        "synopsis": "BROLLLYYYYYYYY",
        "trailerUrl": "https://www.youtube.com/watch?v=nv5FD7NLHCc",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/en/1/13/DB_THE_MOVIE_NO._20.jpg",
        "rating": 9,
        "genreId": 10,
        "authorId": 2
}
```

### response
_201 - Created_

- Body
```json
{
    "msg": "Movie has been created",
    "data": {
        "id": 4,
        "title": "Dragon Ball Super: Broly",
        "synopsis": "BROLLLYYYYYYYY",
        "trailerUrl": "https://www.youtube.com/watch?v=nv5FD7NLHCc",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/en/1/13/DB_THE_MOVIE_NO._20.jpg",
        "rating": 9,
        "genreId": 10,
        "authorId": 2,
        "updatedAt": "2022-10-17T12:03:00.567Z",
        "createdAt": "2022-10-17T12:03:00.567Z"
    }
}
```
### response
_400 - Bad Request_

 Body
```json
{"msg":"Input must be completed!"}
```
### response
_400 - Bad Request_

 Body
```json
{"msg":"Data must be unique!"}
```
--------------------------------------------

## DELETE /movies/:id (DEPRECATED)
```
THIS FUNCTION HAS BEEN DEPRECATED AND UNAVAILABLE IN THE WEBSITE SINCE THE PUT AND PATCH FUNCTION
```
### Description
- delete movie

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```

### response
_200 - OK_

- Body
```json
{
    "msg": "Movie with the name Dragon Ball Super: Broly has been deleted."
}
```

### response
_403 - Forbidden_

 Body
```json
{"msg":"You are forbidden to do this action!"}
```

### response
_404 - Not found_

 Body
```json
{"msg":"User data not found!"}
```
### response
_404 - Not found_

 Body
```json
{"msg":"Movie data not found!"}
```

--------------------------------------------

## PUT /movies/:id
### Description
- edit movie

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```
- Body
```json
{
        "title": "DBS BROLY",
        "synopsis": "BROLLLYYYYYYYY",
        "trailerUrl": "https://www.youtube.com/watch?v=nv5FD7NLHCc",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/en/1/13/DB_THE_MOVIE_NO._20.jpg",
        "rating": 10,
        "genreId": 10
}
```

### response
_200 - OK_

- Body
```json
{
    "msg": "Movie with the name DBS BROLY has been updated."
}
```

### response
_403 - Forbidden_

 Body
```json
{"msg":"You are forbidden to do this action!"}
```

### response
_404 - Not found_

 Body
```json
{"msg":"User data not found!"}
```

--------------------------------------------

## PATCH /movies/:id
### Description
- change movie status

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```
- Body
```json
{
        "status": "Archived"
}
```

### response
_200 - OK_

- Body
```json
{
    "msg": "Kara No Kyokai: Paradox Bridge status has been changed from Active to Archived."
}
```

### response
_403 - Forbidden_

 Body
```json
{"msg":"You are forbidden to do this action!"}
```

### response
_404 - Not found_

 Body
```json
{"msg":"User data not found!"}
```



--------------------------------------------

## GET /genres

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```
### Description
- get all genres data

### response
_200 - OK_

- Body
```json
[
    {
        "id": 1,
        "name": "Action",
        "createdAt": "2022-10-17T11:05:40.026Z",
        "updatedAt": "2022-10-17T11:05:40.026Z"
    },
    ...
]
```
--------------------------------------------

## POST /users/register
### Description
- register new user

### request
- body
```json
{
    "username":"Cooler_asandon7","email":"cyarrell72@woothemes.com","password":"guekeren501","phoneNumber":"165-470-1250","address":"8 Manitowish Circle"
}
```

### response
_201 - Created_

- Body
```json
{
    "msg": "Account has been created",
    "id": 14,
    "username": "Cooler_asandon7"
}
```
### response
_400 - Bad Request_

 Body
```json
{"msg":"Input must be completed!"}
```
### response
_400 - Bad Request_

 Body
```json
{"msg":"Data must be unique!"}
```
--------------------------------------------

## GET /logs

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```
### Description
- get all logs data

### response
_200 - OK_

- Body
```json
[
    {
        "id": 6,
        "title": "DBS BROLY",
        "description": "Movie with the name DBS BROLY has been updated.",
        "updatedBy": "abertot0",
        "createdAt": "2022-10-25T10:03:16.667Z",
        "updatedAt": "2022-10-25T10:03:16.667Z"
    },
    ...
]
```

--------------------------------------------
## POST /users/login
### Description
- user login

### request
- body
```json
{
    "email":"hahahihi@gmail.net","password":"404gaknanya"
}
```

### response
_200 - OK_

- Body
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE",
    "email": "hahahihi@gmail.net",
    "username": "hahahihi",
    "role": "admin"
}
```
### response
_400 - Bad request_

 Body
```json
{"msg":"Please input email and password for login"}
```

### response
_401 - Unauthorized_

 Body
```json
{"msg":"Invalid email or password!"}
```

## POST /users/google-login
### Description
- user google login

### request
- body
```json
{
    "google_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMWI5Zjg4Y2ZlMzE1MWRkZDI4NGE2MWJmOGNlY2Y2NTliMTMwY2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjYyNjc0MTIsImF1ZCI6IjM3NjA2MDk3NzAxMi1ubG0wYXE2YjgzdmFxaGNzMWdkazQxanM3dXJhcWhxYS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzc3MjIyNDI2MTY2ODY0MjcwMCIsImVtYWlsIjoiYWRqaXVncm9ob3Nlbm9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjM3NjA2MDk3NzAxMi1ubG0wYXE2YjgzdmFxaGNzMWdkazQxanM3dXJhcWhxYS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJhZGppIHVncm9obyBzZW5vIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTNBUVJRcXA1MlNnanJqRWJrbnQ0cktPVUR5aWdveGxILUNQNi05a2c9czk2LWMiLCJnaXZlbl9uYW1lIjoiYWRqaSB1Z3JvaG8iLCJmYW1pbHlfbmFtZSI6InNlbm8iLCJpYXQiOjE2NjYyNjc3MTIsImV4cCI6MTY2NjI3MTMxMiwianRpIjoiMzkzYjMxZWE1NDM0MDQyNjYxZDJiZjYxODI4MjA4YTg4MDRhMzk4MyJ9.Uv-j4yIwtaQnDVKwk4OX-zUJMEm5j9ukd4o6UHH_tNxm6RBFUXQdNx2aZkmrw892ZUgJ4WXEm9xh26So8nF-mBFyK-nShZZQGlco8UyRznS07v-1GdO4lo9seexcxg134ec8hOlSHsBpj68nmc_KPNax-HVXPdOy1IHqKSkb22XmWEf0UCQOweQjD4vOkGFvFvUEymiIwn6ZMth9FtZaGFjmGa8mfxSinpIXN3ag_35NVJm77I7_BNDZ9meTmF8Xc0JO1Z7Y8igLgzioHc3Yf1rPIkalGJgE_ZfydR0jOrJuxkqjCB34PXBXqJitwTivZgCgsuhW72kZbYQlP7AIuQ"
}
```

### response
_200 - OK_

- Body
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY2NjI2NzcxMn0.OpObCMXc1k-vT_FupbOxlzsm3VwTwN07Jb2Ov0XF5I4",
    "email": "adjiugrohoseno@gmail.com",
    "username": "adji ugroho",
    "role": "staff"
}
```

## Global error
_401 - Unauthorized_

 Body
```json
{"msg":"Invalid access token"}
```

_500 - Server error_

 Body
```json
{"msg":"Internal server error!"}
```
