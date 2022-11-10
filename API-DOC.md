# Makans - Customer API Documentation

## Endpoints:

List of Available Endpoints:

- `GET /register`
- `GET /login`
- `GET /products`
- `POST /products`
- `DELETE /cart/:ProductId`
- `GET /cart`
- `GET /cart/:ProductId`
- `POST /invoice`
- `GET /invoice`
- `POST /invoice/:invoiceId`
- `GET /city`
- `POST /cost`
- `POST /payment`

&nbsp;

## 1. GET /products

Description:

- Get all the products data

_Response (200 - OK)_

```json
{
  "count": 10,
  "rows": [
    {
      "id": 1,
      "name": "rinso",
      "price": "2000",
      "imageUrl": "https://cf.shopee.co.id/file/a405787b9c9705e804db00a6d060c240",
      "createdAt": "2022-11-09T23:30:38.157Z",
      "updatedAt": "2022-11-09T23:30:38.157Z"
    }
  ],
  "totalPage": 2,
  "currentPage": 1
}
```

&nbsp;

## 2. DELETE /cart/:ProductId

Description:

- Delete Product by id

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NjA4NzM4OX0.uYC8GmraEwdPReQ4zw9164dtzUMH5Bed-W0ik4eQVC8"
}
```

Request:

- params:

```json
{
  "ProductId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "data berhasil dihapus"
}
```

_Response (400 - Not Found)_

```json
{
  "message": "Product id: <id> not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login first"
}
```

&nbsp;

## 3. POST /register

Description:

- Create new user data

- headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
},
```

Request:

- body:

```json
{
  "email": "customer@customer.com",
  "password": "customer"
}
```

_Response (201 - OK)_

```json
{
  "id": 1,
  "email": "customer@customer.com"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [ "Username is required" ]
}
OR
{
    "message": ["Username has already used"]
}
OR
{
    "message": ["Email is required"]
}
OR
{
    "message": ["Email has already used"]
}
OR
{
    "message": ["Please enter valid email"]
}
OR
{
    "message": ["Password is required"]
}
OR
{
    "message": ["Password minimum 5 character"]
}
```

&nbsp;

## 4. POST /login

Description:

- Access user data

Request:

- body:

```json
{
  "email": "customer@customer.com",
  "password": "customer"
}
```

_Response (200 - OK)_

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzYzODY2MX0.FmOVBsVvIePbtq62udgvwgXYO7YZBPD2gBmZlHoFtlc"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
OR
{
  "message": "You have entered an invalid username or password
}
```

&nbsp;

## 5. GET /cart

Description:

- Get all product in cart

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 16,
        "quantity": 1,
        "price": 3200,
        "isPay": false,
        "UserId": 1,
        "ProductId": 4,
        "Product": {
            "name": "dancow",
            "price": "3200",
            "imageUrl": "https://cf.shopee.co.id/file/a405787b9c9705e804db00a6d060c240",
            "id": 4
        }
    },
[
```

&nbsp;

## 6. POST /cart/:ProductId

Description:

- Get user cart data

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

- params:

```json
{
  "ProductId": 1
}
```

- body:

```json
{
  "quantity": 1
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 18,
        "CustomerId": 1,
        "FoodId": 1,
        "quantity": 2,
        "totalPrice": 90000,
        "isPaid": false,
        "createdAt": "2022-11-09T10:16:11.558Z",
        "updatedAt": "2022-11-09T10:16:11.558Z",
        "Food": {
            "id": 1,
            "name": "Nasi Goreng Ayam",
            "imageUrl": "https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg",
            "price": 45000,
            "CategoryId": 1,
            "createdAt": "2022-11-09T07:06:00.443Z",
            "updatedAt": "2022-11-09T07:06:00.443Z",
            "Category": {
                "id": 1,
                "name": "Main Courses",
                "createdAt": "2022-11-09T07:06:00.443Z",
                "updatedAt": "2022-11-09T07:06:00.443Z"
            }
        }
    },
    ...,
[
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login first"
}
```

&nbsp;

## 7. POST /invoice

Description:

- create invoice

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

- body:

```json
{
  "ongkir": 9000,
  "url_payment": "dasdosahd",
  "token_payment": "rdasfgsa"
}
```

_Response (200 - OK)_

```json
{
  "message": "Transaksi berhasil dibuat"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login first"
}
```

&nbsp;

## 8. GET /city

Description:

- Get city data

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

_Response (200 - OK)_

```json
[
  {
    "city_id": "151",
    "province_id": "6",
    "province": "DKI Jakarta",
    "type": "Kota",
    "city_name": "Jakarta Barat",
    "postal_code": "11220"
  },
  {
    "city_id": "152",
    "province_id": "6",
    "province": "DKI Jakarta",
    "type": "Kota",
    "city_name": "Jakarta Pusat",
    "postal_code": "10540"
  },
  {
    "city_id": "153",
    "province_id": "6",
    "province": "DKI Jakarta",
    "type": "Kota",
    "city_name": "Jakarta Selatan",
    "postal_code": "12230"
  },
  {
    "city_id": "154",
    "province_id": "6",
    "province": "DKI Jakarta",
    "type": "Kota",
    "city_name": "Jakarta Timur",
    "postal_code": "13330"
  },
  {
    "city_id": "155",
    "province_id": "6",
    "province": "DKI Jakarta",
    "type": "Kota",
    "city_name": "Jakarta Utara",
    "postal_code": "14140"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login first"
}
```

&nbsp;

## 9. GET /cost

Description:

- Get user cart data

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

_Response (200 - OK)_

```json
[
  {
    9000
  }
[
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login first"
}
```

&nbsp;

## 10. GET /invoice

Description:

- Get last invoice

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

_Response (201 - OK)_

```json
{
  "message": "Invoice hass been create"
}
```

_Response (401 - NOT FOUND)_

```json
{
  "message": "Food Not Found"
}
```

\_

&nbsp;

## 11. POST /invoice/:invoiceId

Description:

- Update status invoice

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

Request:

- params:

```json
{
  "invoiceId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "invoice id:1 LUNAS"
}
```

&nbsp;

## 12. POST /payment

Description:

- Hit midrans

\_request:

- body

```json

gross_amount : 9000

```

_Response (200 - OK)_

```json
[
  {
    "id": 15,
    "CustomerId": 1,
    "FoodId": 5,
    "quantity": 1,
    "totalPrice": 9000,
    "isPaid": false,
    "createdAt": "2022-11-10T03:25:04.995Z",
    "updatedAt": "2022-11-10T03:25:04.995Z",
    "Food": {
      "id": 5,
      "name": "Bubur Ayam",
      "imageUrl": "https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/04/Resep-Bubur-Ayam.jpg?{
    "token": "a991413b-6f50-467c-a8fe-2376f4d7645a",
    "redirect_url": "https://app.midtrans.com/snap/v3/redirection/a991413b-6f50-467c-a8fe-2376f4d7645a"
},]
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
