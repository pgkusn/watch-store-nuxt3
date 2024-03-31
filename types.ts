export type OrNull<Type> = Type | null

export interface FetchError {
  statusCode: number
  data: {
    error: {
      message: string
    }
  }
}

export interface RawProducts {
  [key: string]: {
    brand: string
    description: string
    discount: number
    fullBrand: string
    name: string
    price: number
    url: string
  }
}

export interface Products {
  id: string
  brand: string
  description: string
  discount: number
  fullBrand: string
  name: string
  price: number
  url: string
  amount: number
}

export interface Product {
  id: string
  description: string
  imageUrl: string[]
  name: string
  price: number
}

export interface States {
  favorite: Products[]
  cart: Products[]
}

export interface LoginInfo {
  kind: string
  localId: string
  email: string
  displayName?: string
  idToken: string
  registered?: boolean
  refreshToken: string
  expiresIn: string
}

export interface SignUpData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface Profile {
  name: string
  gender: string
  cellPhone: string
  edm: boolean
  email?: string
  address: {
    contact: {
      country: string
      city: string
      area: string
      other: string
    }
    delivery: {
      country: string
      city: string
      area: string
      other: string
    }
  }
}

export interface RawOrder {
  [key: string]: {
    content: {
      amount: number
      name: string
    }[]
    createTime: number
    total: number
  }
}

export interface Order {
  orderID: string
  content: {
    amount: number
    name: string
  }[]
  createTime: number
  total: number
}

export interface NewOrder {
  content: NewOrderContent[]
  total: number
  createTime: number
}

export interface NewOrderContent {
  name: string
  amount: number
}

export interface Password {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface Brands {
  brand: string
  fullBrand: string
}

export interface CityList {
  CityName: string
  CityEngName: string
  AreaList: {
    ZipCode: string
    AreaName: string
    AreaEngName: string
  }[]
}
