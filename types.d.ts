// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation
interface IUser {
  id: string
  name: string
  image: string
  email: string
}

declare module "@auth/core/types" {
  interface Session {
    accessToken?: string
    user?: IUser
  }

  interface User extends DefaultUser {
    id: string
    name: string
    image: string
    email: string
  }
}
export {}
