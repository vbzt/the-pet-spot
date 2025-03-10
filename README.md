#  The pet spot
> The pet spot is an application for managing an animal adoption center
>> This project is unfinished and discountinued

## Developers
- Fullstack
	- Vitor Buzato, [Github](https://github.com/vbzt)

## Technologies
- Backend
	- Node.js | React.js (Vite) | MongoDB | JWT
## Docs
### Backend

### How to run the api

To run the backend api you need:
- Node.js
- MongoDB

First, clone the project using:

```bash 
  git clone https://github.com/vbzt/the-pet-spot.git
```

After cloning the repo, run the following commands:

```bash
cd backend
npm i

cd ../frontend
npm i
```


Then create and <code>.env-local</code> archive in the frontend root folder and add these variables:
```JSON
VITE_API="YOUR_API_ADDRESS"
```
To run the application

```bash
cd backend
npm start

cd ../frontend
npm run dev
```

### API Functions

### Auth

#### Register user
- Route: <code>/users/register</code>
- Method: <code>POST</code>
- Files: <code>Optional user pfp (PNG/JPG)</code>
- Body:
```JSON
{
  "name": "test",
  "email": "test@test.com",
  "phone": "11999999999",
  "password": "test1234",
  "confirmpassword": "test1234"
}
```
- Response:
	- Status: <code>200</code>
	```JSON
    {
    "message": "você esta autenticado",
    "token": "YOUR-JWT-TOKEN",
    "userId": "671598cbd0438951485970ae"
  } 
	```

#### Login
- Route: <code>/users/login</code>
- Method: <code>POST</code>
- Body:
```JSON
{
  "email": "test@test.com",
  "password": "test1234",
}
```
- Response:
	- Status: <code>200</code>
	```JSON
    {
    "message": "você esta autenticado",
    "token": "YOUR-JWT-TOKEN",
    "userId": "671598cbd0438951485970ae"
  }
	```


### Users

#### Check user
- Route: <code>/users/method/data</code>
- Method: <code>GET</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Response:
	- Status: <code>200</code>
	```JSON
    {
    "_id": "671598cbd0438951485970ae",
    "name": "test",
    "email": "test@test.com",
    "phone": "11999999999",
    "createdAt": "2024-10-20T23:56:59.353Z",
    "updatedAt": "2024-10-20T23:56:59.353Z",
    "__v": 0
  }
  ```
#### User profile
- Route: <code>/users/:id</code>
- Method: <code>GET</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Response:
	- Status: <code>200</code>
	```JSON
    {
    "_id": "671598cbd0438951485970ae",
    "name": "test",
    "email": "test@test.com",
    "phone": "11999999999",
    "createdAt": "2024-10-20T23:56:59.353Z",
    "updatedAt": "2024-10-20T23:56:59.353Z",
    "__v": 0
  }
  ```
#### Edit User 
- Route: <code>/users/edit/:id</code>
- Method: <code>PATCH</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Files: <code>Optional user pfp (PNG/JPG)</code>
- Response:
	- Status: <code>200</code>
	```JSON
    "message": "Usuário atualizado com sucesso"
  ```

### Pets

#### Create pet
- Route: <code>/pets/create</code>
- Method: <code>POST</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Files: <code>Pet's photo is required (Can be multiple)</code>
- Body:
```JSON
{
  "name": "Tigrão",
  "age": 9,
  "weight": 9,
  "color": "Branco",
  "image": "dog.png, dog2.jpeg" 
}
```
- Response:
	- Status: <code>200</code>
	```JSON
    {
    "message": "Pet cadastrado com sucesso",
    "newPet": {
        "name": "Tigrão",
        "color": "Branco",
        "age": 9,
        "weight": 9,
        "images": [
            "17294706408852878.png"
        ],
        "available": true,
        "user": {
            "_id": "671598cbd0438951485970ae",
            "name": "test",
            "phone": "11999999999"
        },
        "_id": "6715a0b09c368a5d971af659",
        "createdAt": "2024-10-21T00:30:40.912Z",
        "updatedAt": "2024-10-21T00:30:40.912Z",
        "__v": 0
    }
  }
  ```

#### Get all pets
- Route: <code>/pets</code>
- Method: <code>GET</code>
- Body:
- Response:
	- Status: <code>200</code>
	```JSON
    {
    "pets": [
        {
            "_id": "6715a0b09c368a5d971af659",
            "name": "Tigrão",
            "color": "Branco",
            "age": 9,
            "weight": 9,
            "images": [
                "17294706408852878.png"
            ],
            "available": true,
            "user": {
                "_id": "671598cbd0438951485970ae",
                "name": "test",
                "phone": "11999999999"
            },
            "createdAt": "2024-10-21T00:30:40.912Z",
            "updatedAt": "2024-10-21T00:30:40.912Z",
            "__v": 0
        }
    ]
  }
  ```


	


#### Get all user's adoptions
- Route: <code>/pets/myadoptions</code>
- Method: <code>GET</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Body:
- Response:
	- Status: <code>200</code>
	```JSON
    {
      "message": "Todas as adoções do usuário: test",
      "pets": []
    }
  ```


	



#### Get pet by id
- Route: <code>/pets/:id</code>
- Method: <code>GET</code>
- Body:
- Response:
	- Status: <code>200</code>
	```JSON
    {
      "pet": {
          "_id": "6715a0b09c368a5d971af659",
          "name": "Tigrão",
          "color": "Branco",
          "age": 9,
          "weight": 9,
          "images": [
              "17294706408852878.png"
          ],
          "available": true,
          "user": {
              "_id": "671598cbd0438951485970ae",
              "name": "test",
              "phone": "11999999999"
          },
          "createdAt": "2024-10-21T00:30:40.912Z",
          "updatedAt": "2024-10-21T00:30:40.912Z",
          "__v": 0
      }
  }
  ```


#### Edit pet
- Route: <code>/pets/:id</code>
- Method: <code>PATCH</code>
- Files: <code>Pet's photo is required (Can be multiple)</code>
- Body:
```JSON
{
  "name": "Tigrão att",
  "age": 10,
  "weight": 10,
  "color": "Branco",
  "image": "dog3.png, dog4.jpeg" ,
  "available": true
}
```
- Response:
	- Status: <code>200</code>
	```JSON
  {
    "message": "Pet atualizado com sucesso"
  } 
  ```


#### Schedule visit to pet's owner
- Route: <code>/pets/:id</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Method: <code>PATCH</code>
- Response:
	- Status: <code>200</code>
	```JSON
  {
    "message": "A visita foi agendada com sucesso, entre em contato com vitor2 pelo telefone 11999999999 para mais detalhes"
  }
  ```

  #### Conclude pet's adoption 
- Route: <code>/pets/conclude/:id</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Method: <code>PATCH</code>
- Response:
	- Status: <code>200</code>
	```JSON
  {
    "message": "Pet adotado com sucesso!"
  }
  ```

  #### Delete a pet
- Route: <code>/pets/:id</code>
- Authorization: <code>BEARER TOKEN: YOUR-JWT-TOKEN</code>
- Method: <code>DELETE</code>
- Response:
	- Status: <code>200</code>
	```JSON
  {
    "message": "Pet removido com sucesso!"
  }
  ```
## License
This project is under [MIT License](LICENSE). See [LICENSE](LICENSE)   
for more details.

