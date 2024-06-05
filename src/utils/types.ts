export interface ISite {
  id: string
  clientId: string
  title: string
  createdAt: string
  updatedAt: string
  contacts: IContact
  address: IAddress
  images: string[]
  tags: string[]
}

export interface IContact {
  main: {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    jobTitle: string
    address: IAddress
  }
}

export interface IAddress {
  zipCode: string
  city: string
  street: string
  country: string
  state: string
}

export interface IClient {
  id: string
  givenName: string
  logo: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface IUser {
  id: string
  email: string
  username: string
  givenName: string
  locale: string
  avatar: string
}
