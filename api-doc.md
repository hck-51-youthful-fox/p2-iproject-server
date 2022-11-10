# PCPeeker API Documentation

## Endpoints :

List of available endpoints:

- `POST /news`
- `GET /thread`
- `POST /login`
- `POST /register`
- `POST /add`
- `POST /comments`
- `POST /login-google`

&nbsp;

## 1. GET /news

Description:

- Get all news from API

_Response (200 - OK)_

```json
{
    "topVGA": [
        {
            "merk": "Nvidia",
            "type": "Nvidia RTX 3090",
            "ranking": "1",
            "bechmark": "84304",
            "source": "https://gpu.userbenchmark.com/Nvidia-RTX-3090/Rating/4081"
        },...
        ],
    "news": [
        {
            "author": "VR Putra",
            "title": "Vivo Y22, Handphone Mewah Harga Cuma 2 Jutaan Aja, Siap-siap Jadi Incaran - ruber.id",
            "description": "BERITA GADTECH, ruber.id - Kali ini kami akan review produk terbaru keluaran Vivo, yaitu Vivo Y22 handphone mewah namun harganya cuma 2 jutaan",
            "url": "https://ruber.id/vivo-y22-handphone-mewah-harga-cuma-2-jutaan-aja-siap-siap-jadi-incaran/",
            "urlToImage": "https://ruber.id/wp-content/uploads/2022/11/Vivo-Y22-Handphone-Mewah-Harga-Cuma-2-Jutaan-Aja-Siap-siap-Jadi-Incaran.jpg",
            "publishedAt": "2022-11-08T21:37:00Z",
            "content": "BERITA GADTECH, ruber.id – Kali ini kami akan review produk terbaru keluaran Vivo, yaitu Vivo Y22 handphone mewah namun harganya cuma 2 jutaan aja.\r\nSejak pertama kali dipasarkan, HP ini sudah banyak… [+1893 chars]"
        },...
}
```

## 2. GET /thread

Description:

- Create new user to database

Request:

- query

```json
{
  "page": integer,
  "search": string
}'
```

_Response (200 - OK)_

```json
{
    "count": 21,
    "rows": [
        {
            "id": 21,
            "name": "aaaa",
            "rating": 5,
            "thread": "asdasdasdsadasdasdasdasd",
            "like": 0,
            "createdAt": "2022-11-09T15:53:45.517Z",
            "updatedAt": "2022-11-09T15:53:45.517Z",
            "Comments": [
                {
                    "id": 32,
                    "UserId": 2,
                    "ThreadId": 21,
                    "comment": "itu kan memang sudah sekali",
                    "imgUrl": "-",
                    "createdAt": "2022-11-09T16:20:17.504Z",
                    "updatedAt": "2022-11-09T16:20:17.504Z"
                }
            ]
        },...
    ]
    "totalPages": 4
}
```

## 3. POST /login

Description:

- Get username and password

Request:

- headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

_Response (200 - OK)_

```json
{
  "access_token" : String
}
```

## 4. POST /register

Description:

- Create new user to database

Request:

- headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

-body

```json
{
  "username": String,
  "email": String,
  "password": String,
  }
```

_Response (201 - Created)_

```json
{
  "id": 8,
  "email": "test123@test.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 5. POST /add

Description:

- Create new thread

Request:

- headers

```json
{
  "access_token": "string"
}
```

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

-body

```json
{
  "name": String,
  "rating": Integer,
  "thread": Text
  }
```

_Response (201 - Created)_

```json
{
  "data": {
    "id": 12,
    "comment": "Intel X3 F4",
    "ThreadId": 1,
    "UserId": 1,
    "updatedAt": "2022-11-09T10:05:20.977Z",
    "createdAt": "2022-11-09T10:05:20.977Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Comment cannot blank"
}
```

## 6. POST /comments

Description:

- Create new comment

Request:

- headers

```json
{
  "access_token": "string"
}
```

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

-body

```json
{
  "comment": String
}
```

_Response (201 - Created)_

```json
{
  "data": {
    "id": 12,
    "name": "Intel X3 F4",
    "rating": 5,
    "thread": "Tidak sesuai yang ada",
    "like": 0,
    "updatedAt": "2022-11-09T10:05:20.977Z",
    "createdAt": "2022-11-09T10:05:20.977Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Topic is required"
}
OR
{
  "message": "Rating is required"
}
OR
{
  "message": "Thread is required"
}
```

## 7. POST /login-google

Description:

- Get new account form login with google

Request:

- headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

_Response (200 - OK)_

```json
{
  "access_token" : String
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
