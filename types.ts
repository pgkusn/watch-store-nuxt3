export type OrNull<Type> = Type | null

export interface FetchError {
  statusCode: number
  data: {
    error: {
      message: string
    }
  }
}

interface RawProduct {
  brand: string
  description: string
  discount: number
  fullBrand: string
  name: string
  price: number
  url: string
}

export interface RawProducts {
  [key: string]: RawProduct
}

export interface Products extends RawProduct {
  id: string
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

export interface SignUpData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface LoginInfo extends SignUpData {
  displayName?: string
  registered?: boolean
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

interface OrderWithMemberID extends NewOrder {
  memberID: string
}

export interface RawOrder {
  [key: string]: OrderWithMemberID
}

export interface Order extends OrderWithMemberID {
  orderID: string
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
