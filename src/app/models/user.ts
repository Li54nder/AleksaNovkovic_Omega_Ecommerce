export interface UserLogin {
  "username": string,
  "password": string
}

export interface UserLoginResponse {
  "access_token": string,
  "token_type": string
}

export interface User {
  promoted_until: string | number | Date
  "id": number,
  "email": string,
  "active": boolean,
  "deactivated": boolean,
  "name": string,
  "phone_number": string,
  "created_on": string,
  "age": number,
  "biography": string,
  "avatar": string,
  "district__": object,
  "type__": string,
  "workerFree": boolean
}
