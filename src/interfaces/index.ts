export interface RegistrationPayload {
  email: string
  name: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RefreshPayload {
  refreshToken: string
}

export interface JwtTokenPair {
  refreshToken: string
  accessToken: string
}

export interface JwtPayload {
  id: string
  email: string
  name: string
}

export interface TodoPayload {
  title: string
  complete: boolean
}
