# Makans - Customer API Documentation

## Endpoints:

List of Available Endpoints:

- `GET /pub/food`
- `GET /pub/food/:id`
- `POST /pub/register`
- `POST /pub/login`
- `GET /pub/categories`
- `GET /pub/cart`
- `PATCH /pub/cart`
- `GET /transaction`
- `GET /pub/city`
- `GET /pub/cost`
- `POST /pub/cart/:foodId`
- `DELETE /pub/cart/:foodId`
- `GET /pub/transaction`
- `POST /pub/transaction`

&nbsp;

## 1. GET /pub/food

Description:

- Get all the product data

_Response (200 - OK)_

```json
{
    "count": 10,
    "rows": [
        {
             "id": 4,
            "name": "Vanilla Cake Waffle",
            "imageUrl": "https://tottstore.com/recipes/wp-content/uploads/sites/2/2017/08/Vanilla-Waffle.jpg",
            "price": "27000",
            "CategoryId": 3,
            "createdAt": "2022-11-08T12:15:31.019Z",
            "updatedAt": "2022-11-08T12:15:31.019Z",
            "Category": {
                "id": 3,
                "name": "Desserts",
                "createdAt": "2022-11-08T12:15:31.019Z",
                "updatedAt": "2022-11-08T12:15:31.019Z"
            }
        },
        ...,
    ],
    "totalPage": 2,
    "currentPage": 1
}
```

&nbsp;

## 2. GET /pub/food/:id

Description:

- Get food by id

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Nasi Goreng Ayam",
  "imageUrl": "https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg",
  "price": "45000",
  "CategoryId": 1,
  "createdAt": "2022-11-08T08:44:54.378Z",
  "updatedAt": "2022-11-08T08:44:54.378Z",
  "Category": {
    "id": 1,
    "name": "Main Courses",
    "createdAt": "2022-11-08T08:44:54.378Z",
    "updatedAt": "2022-11-08T08:44:54.378Z"
  }
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

Description:

- Update product status by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NjA4NzM4OX0.uYC8GmraEwdPReQ4zw9164dtzUMH5Bed-W0ik4eQVC8"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update Product Status"
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

_Response (403 - Forbidden)_

```json
{
  "message": "You don't have an access"
}
```

&nbsp;

## 3. POST /pub/register

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
  "name": "customer",
  "email": "customer@customer.com",
  "password": "customer",
  "phoneNumber": "(298) 1256296",
  "address": "Jl. Customer 1"
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

## 4. POST /pub/login

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

Description:

- Access user data from Google aaccount

_Response (200 - OK)_

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJzdGFmZiIsInVzZXJuYW1lIjoiWW9zc3lBZGlydGEiLCJpYXQiOjE2NjYzMjQ4Nzl9.NurQwRrp43HFju-ig7RUXreJH2EOsDSFi0Q3Eg1TQlU",
  "id": 1,
  "username": "YossyAdirta"
}
```

&nbsp;

## 5. GET /pub/categories

Description:

- Get all categories data

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
        "id": 1,
        "name": "Menu Utama",
        "createdAt": "2022-11-09T20:39:30.820Z",
        "updatedAt": "2022-11-09T20:39:30.820Z"
    },
    ...,
[
```

&nbsp;

## 6. GET /pub/cart

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

## 7. PATCH /pub/cart

Description:

- Update cart items status user cart data

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lciIsImlhdCI6MTY2NzU0MjUzMH0.hFsh6d4THzbI8G0rj5w8zki-1W-yqkrcSPR0Aq2AuX0"
}
```

_Response (200 - OK)_

```json
{
  "message": "Transaction Paid"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login first"
}
```

&nbsp;

## 8. GET /pub/city

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

## 9. GET /pub/cost

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

## 10. POST /pub/cart/:foodId

Description:

- Add Food to cart

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
  "quantity": 1
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (201 - OK)_

```json
{
  "message": "You Added food to cart"
}
```

_Response (200 - OK)_

```json
{
  "message": "Quantity Food Updated"
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

## 11. DELETE /pub/cart/:foodId

Description:

- Delete Food from cart

- headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
},
```

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
  "message": "Success remove food"
}
```

_Response (200 - OK)_

```json
{
  "message": "Quantity Food Updated"
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

## 12. GET /pub/transaction

Description:

- Get all the transaction data

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
      "imageUrl": "https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/04/Resep-Bubur-Ayam.jpg?fit=1536%2C1536&ssl=1",
      "price": 9000,
      "CategoryId": 1,
      "createdAt": "2022-11-09T20:39:30.820Z",
      "updatedAt": "2022-11-09T20:39:30.820Z",
      "Category": {
        "id": 1,
        "name": "Menu Utama",
        "createdAt": "2022-11-09T20:39:30.820Z",
        "updatedAt": "2022-11-09T20:39:30.820Z"
      }
    }
  },
  {
    "id": 14,
    "CustomerId": 1,
    "FoodId": 18,
    "quantity": 4,
    "totalPrice": 32000,
    "isPaid": false,
    "createdAt": "2022-11-10T03:01:08.939Z",
    "updatedAt": "2022-11-10T03:04:51.127Z",
    "Food": {
      "id": 18,
      "name": "Roti Bakar",
      "imageUrl": "https://awsimages.detik.net.id/community/media/visual/2020/10/05/roti-bakar-1.jpeg?w=700&q=90",
      "price": 8000,
      "CategoryId": 4,
      "createdAt": "2022-11-09T20:39:30.820Z",
      "updatedAt": "2022-11-09T20:39:30.820Z",
      "Category": {
        "id": 4,
        "name": "Cemilan",
        "createdAt": "2022-11-09T20:39:30.820Z",
        "updatedAt": "2022-11-09T20:39:30.820Z"
      }
    }
  },
  {
    "id": 13,
    "CustomerId": 1,
    "FoodId": 16,
    "quantity": 5,
    "totalPrice": 95000,
    "isPaid": false,
    "createdAt": "2022-11-10T03:01:04.214Z",
    "updatedAt": "2022-11-10T03:05:17.461Z",
    "Food": {
      "id": 16,
      "name": "Kulit Crispy",
      "imageUrl": "https://www.masakapahariini.com/wp-content/uploads/2020/11/kulit-ayam-goreng-tepung-1024x678.jpg",
      "price": 19000,
      "CategoryId": 4,
      "createdAt": "2022-11-09T20:39:30.820Z",
      "updatedAt": "2022-11-09T20:39:30.820Z",
      "Category": {
        "id": 4,
        "name": "Cemilan",
        "createdAt": "2022-11-09T20:39:30.820Z",
        "updatedAt": "2022-11-09T20:39:30.820Z"
      }
    }
  },
  {
    "id": 12,
    "CustomerId": 1,
    "FoodId": 17,
    "quantity": 1,
    "totalPrice": 11000,
    "isPaid": false,
    "createdAt": "2022-11-10T02:59:45.490Z",
    "updatedAt": "2022-11-10T03:03:18.022Z",
    "Food": {
      "id": 17,
      "name": "Siomay Ratagob",
      "imageUrl": "https://cdn0-production-images-kly.akamaized.net/juLWEgEdJ_3wfIVe9qaBUX6MChc=/1200x900/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/824632/original/070745900_1425891327-siomay.jpg",
      "price": 11000,
      "CategoryId": 4,
      "createdAt": "2022-11-09T20:39:30.820Z",
      "updatedAt": "2022-11-09T20:39:30.820Z",
      "Category": {
        "id": 4,
        "name": "Cemilan",
        "createdAt": "2022-11-09T20:39:30.820Z",
        "updatedAt": "2022-11-09T20:39:30.820Z"
      }
    }
  },
  {
    "id": 11,
    "CustomerId": 1,
    "FoodId": 19,
    "quantity": 1,
    "totalPrice": 5000,
    "isPaid": false,
    "createdAt": "2022-11-10T02:59:35.987Z",
    "updatedAt": "2022-11-10T03:03:15.732Z",
    "Food": {
      "id": 19,
      "name": "Kue Klepon",
      "imageUrl": "https://harianresep.com/wp-content/uploads/2022/01/resep-klepon-ketan-gula-jawa.jpg",
      "price": 5000,
      "CategoryId": 4,
      "createdAt": "2022-11-09T20:39:30.820Z",
      "updatedAt": "2022-11-09T20:39:30.820Z",
      "Category": {
        "id": 4,
        "name": "Cemilan",
        "createdAt": "2022-11-09T20:39:30.820Z",
        "updatedAt": "2022-11-09T20:39:30.820Z"
      }
    }
  }
]
```

&nbsp;

## 13. POST /pub/transaction/

Description:

- Get food by id

Request:

- body:

```json
{
  "shippingCost": 20000
}
```

_Response (201 - OK)_

```json
{
  "transaction": {
    "id": 12,
    "totalPrice": 66000,
    "shippingCost": 20000,
    "cartInformation": [
      {
        "name": "Rawon Ayam",
        "quantity": 2,
        "totalPrice": 66000
      }
    ],
    "CustomerId": 1,
    "updatedAt": "2022-11-09T09:45:16.430Z",
    "createdAt": "2022-11-09T09:45:16.430Z"
  },
  "data": {
    "token": "b5737f5d-62d3-4ba5-b6c0-51fc8a7319c2",
    "redirect_url": "https://app.midtrans.com/snap/v3/redirection/b5737f5d-62d3-4ba5-b6c0-51fc8a7319c2"
  },
  "order_id": "ORDER-2112-6728566840"
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

Description:

- Update product status by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NjA4NzM4OX0.uYC8GmraEwdPReQ4zw9164dtzUMH5Bed-W0ik4eQVC8"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update Product Status"
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

_Response (403 - Forbidden)_

```json
{
  "message": "You don't have an access"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
