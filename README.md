# p2-iproject-server
Individual Project - Server

List of Available Endpoints:
- `GET /pets`
- `GET /pets/id`
- `GET /types`
- `GET /rents`
- `GET /rents/recent`
- `GET /reviews`
- `POST /pets/id`
- `PUT /rents/:id`
- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`

## GET /pets
### Description
- get all pets data

### response
_200 - OK_

- Body
```json
{
    "animals": [
        {
            "id": 52506866,
            "organization_id": "NJ927",
            "url": "https://www.petfinder.com/cat/jimma-52506866/nj/toms-river/all-fur-one-pet-rescue-and-adoptions-inc-nj927/?referrer_id=08c1583b-3ed9-4941-8f88-1ca738c30f43",
            "type": "Cat",
            "species": "Cat",
            "breeds": {
                "primary": "Domestic Short Hair",
                "secondary": null,
                "mixed": false,
                "unknown": false
            },
            "colors": {
                "primary": "Black & White / Tuxedo",
                "secondary": null,
                "tertiary": null
            },
            "age": "Young",
            "gender": "Female",
            "size": "Small",
            "coat": null,
            "attributes": {
                "spayed_neutered": false,
                "house_trained": false,
                "declawed": false,
                "special_needs": false,
                "shots_current": false
            },
            "environment": {
                "children": true,
                "dogs": null,
                "cats": true
            },
            "tags": [
                "Social and Friendly"
            ],
            "name": "Jimma",
            "description": "The ultimate momma, Jimma, is a love bug! She is a part of the Ethiopia litter with her babes. Jimma...",
            "organization_animal_id": "19436",
            "photos": [
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/2/?bust=1667897730&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/2/?bust=1667897730&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/2/?bust=1667897730&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/2/?bust=1667897730"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/3/?bust=1667897731&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/3/?bust=1667897731&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/3/?bust=1667897731&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/3/?bust=1667897731"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/4/?bust=1667897720&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/4/?bust=1667897720&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/4/?bust=1667897720&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/4/?bust=1667897720"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/5/?bust=1667897730&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/5/?bust=1667897730&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/5/?bust=1667897730&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/5/?bust=1667897730"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/6/?bust=1667897729&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/6/?bust=1667897729&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/6/?bust=1667897729&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/6/?bust=1667897729"
                }
            ],
            "primary_photo_cropped": {
                "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751&width=300",
                "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751&width=450",
                "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751&width=600",
                "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52506866/1/?bust=1667975751"
            },
            "videos": [],
            "status": "adoptable",
            "status_changed_at": "2021-09-29T16:05:38+0000",
            "published_at": "2021-07-29T11:09:42+0000",
            "distance": null,
            "contact": {
                "email": "Adoptions@allfurone.org",
                "phone": "(732) 255-3871",
                "address": {
                    "address1": "1747 Hooper Avenue",
                    "address2": "Suite 11",
                    "city": "Toms River",
                    "state": "NJ",
                    "postcode": "08753",
                    "country": "US"
                }
            },
            "_links": {
                "self": {
                    "href": "/v2/animals/52506866"
                },
                "type": {
                    "href": "/v2/types/cat"
                },
                "organization": {
                    "href": "/v2/organizations/nj927"
                }
            }
        },
        ...
    ]
}
```

--------------------------------------------

## GET /pets/:id
### Description
- one pets data



### response
_200 - OK_

- Body
```json
{
    "id": 58788734,
    "organization_id": "TN478",
    "url": "https://www.petfinder.com/dog/hercules-58788734/tn/chattanooga/mckamey-animal-center-tn478/?referrer_id=08c1583b-3ed9-4941-8f88-1ca738c30f43",
    "type": "Dog",
    "species": "Dog",
    "breeds": {
        "primary": "Boxer",
        "secondary": null,
        "mixed": false,
        "unknown": false
    },
    "colors": {
        "primary": "Brindle",
        "secondary": null,
        "tertiary": null
    },
    "age": "Adult",
    "gender": "Male",
    "size": "Large",
    "coat": null,
    "attributes": {
        "spayed_neutered": true,
        "house_trained": false,
        "declawed": null,
        "special_needs": false,
        "shots_current": true
    },
    "environment": {
        "children": null,
        "dogs": false,
        "cats": null
    },
    "tags": [
        "Food Motivated",
        "Leash Walk Me",
        "Loves Squeaker Toys",
        "Loves Stuffed Toys",
        "Loves Tennis Balls",
        "Seems Housetrained",
        "Shy at First",
        "Single Dog Home"
    ],
    "name": "Hercules",
    "description": null,
    "organization_animal_id": "MACT-A-100114",
    "photos": [
        {
            "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532&width=100",
            "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532&width=300",
            "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532&width=600",
            "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532"
        },
        {
            "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/2/?bust=1667943932&width=100",
            "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/2/?bust=1667943932&width=300",
            "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/2/?bust=1667943932&width=600",
            "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/2/?bust=1667943932"
        },
        {
            "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/3/?bust=1667943933&width=100",
            "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/3/?bust=1667943933&width=300",
            "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/3/?bust=1667943933&width=600",
            "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/3/?bust=1667943933"
        },
        {
            "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/4/?bust=1667943931&width=100",
            "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/4/?bust=1667943931&width=300",
            "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/4/?bust=1667943931&width=600",
            "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/4/?bust=1667943931"
        },
        {
            "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/5/?bust=1667943931&width=100",
            "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/5/?bust=1667943931&width=300",
            "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/5/?bust=1667943931&width=600",
            "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/5/?bust=1667943931"
        }
    ],
    "primary_photo_cropped": {
        "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532&width=300",
        "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532&width=450",
        "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532&width=600",
        "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58788734/1/?bust=1667878532"
    },
    "videos": [],
    "status": "adoptable",
    "status_changed_at": "2022-11-08T03:25:22+0000",
    "published_at": "2022-11-08T03:25:22+0000",
    "distance": null,
    "contact": {
        "email": "adoptions@mckameyanimalcenter.org",
        "phone": "(423) 305-6514",
        "address": {
            "address1": "4500 N. Access Road",
            "address2": null,
            "city": "Chattanooga",
            "state": "TN",
            "postcode": "37415",
            "country": "US"
        }
    },
    "_links": {
        "self": {
            "href": "/v2/animals/58788734"
        },
        "type": {
            "href": "/v2/types/dog"
        },
        "organization": {
            "href": "/v2/organizations/tn478"
        }
    }
}
```
### response
_404 - Not found_

 Body
```json
{"msg":"Pet data not found!"}
```

--------------------------------------------

## GET /types
### Description
- get all types data

### response
_200 - OK_

- Body
```json
{
    "types": [
        {
            "name": "Dog",
            "coats": [
                "Hairless",
                "Short",
                "Medium",
                "Long",
                "Wire",
                "Curly"
            ],
            "colors": [
                "Apricot / Beige",
                "Bicolor",
                "Black",
                "Brindle",
                "Brown / Chocolate",
                "Golden",
                "Gray / Blue / Silver",
                "Harlequin",
                "Merle (Blue)",
                "Merle (Red)",
                "Red / Chestnut / Orange",
                "Sable",
                "Tricolor (Brown, Black, & White)",
                "White / Cream",
                "Yellow / Tan / Blond / Fawn"
            ],
            "genders": [
                "Male",
                "Female"
            ],
            "_links": {
                "self": {
                    "href": "/v2/types/dog"
                },
                "breeds": {
                    "href": "/v2/types/dog/breeds"
                }
            }
        },
        ...
    ]
}
```

--------------------------------------------
## GET /rents
### Description
- get all active rents data


### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTUwOTU3fQ.OdiX5FgUDEEB0dgOSCk0c7IDhz30oub73LS8hsEJVE4"}
```


### response
_200 - OK_

- Body
```json
[
    {
        "id": 9,
        "name": "Remy ",
        "imgUrl": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56519063/2/?bust=1659576621&width=300",
        "content": null,
        "rating": null,
        "rented": true,
        "rentEnd": null,
        "PetId": 56519063,
        "UserId": 1,
        "createdAt": "2022-11-10T04:24:18.402Z"
    }
]
```
--------------------------------------------
## GET /rents/recent
### Description
- get recent rents data


### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTUwOTU3fQ.OdiX5FgUDEEB0dgOSCk0c7IDhz30oub73LS8hsEJVE4"}
```


### response
_200 - OK_

- Body
```json
[
    {
        "id": 1,
        "name": "Holly",
        "imgUrl": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/58797522/2/?bust=1667950195&width=300",
        "content": "lucuuukk bangeettt",
        "rating": 4,
        "rented": false,
        "rentEnd": "2022-11-08T23:49:23.566Z",
        "PetId": 58797522,
        "UserId": 1,
        "createdAt": "2022-11-08T23:46:00.048Z"
    }, ...
]
```

## POST /pets/:id
### Description
- add pet to rent

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTUwOTU3fQ.OdiX5FgUDEEB0dgOSCk0c7IDhz30oub73LS8hsEJVE4"}
```


### response
_201 - Created_

- Body
```json
{
    "msg": "You are now renting Remy "
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

## PUT /rents/:id
### Description
- stop renting and add review

### request
- headers
```json
{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY2NjIzODkxM30.aMQLfrvMGA56nW3amkms4DY-8-54jekjzTZtDPhBaFE"}
```
- Body
```json
{
        "rating": 4,
        "comment": "uwaw",
}
```

### response
_200 - OK_

- Body
```json
{
    "msg": "Review posted"
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
