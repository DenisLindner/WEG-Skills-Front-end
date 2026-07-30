export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN"

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = LoginInput & {
  name: string
}

export type AuthResponse = {
  accessToken: string
  tokenType: string
  expiresAt: string
}

export type Session = {
  authenticated: true
  userId: number
  email: string
  roles: UserRole[]
  expiresAt: string
}

export type AnonymousSession = {
  authenticated: false
}

export type SessionResponse = Session | AnonymousSession

