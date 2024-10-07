import GithubProvider from "@auth/core/providers/github"
import type { AuthConfig } from "@auth/core/types"
import { NuxtAuthHandler } from "#auth"
import prisma from "~/lib/prisma"

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  trustHost: true,
  providers: [
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret
    })
  ],
  callbacks: {
    signIn: async ({ user }) => {
      try {
        if (!user.email) {
          return false
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        })

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "User #" + user.id,
              image: user.image ?? "",
              password: null
            }
          })

          return !!newUser
        }

        return true
      } catch (error) {
        console.error("Error during signIn callback", error)
        return false
      }
    },
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === "update" && session?.name) {
        token.name = session.name
      }

      if (user) return { ...token, name: user.name }
      return token
    },
    redirect: async ({ baseUrl }) => {
      return baseUrl
    },
    session: async ({ session, token }) => {
      return { ...session, user: { ...session.user, name: token.name } }
    }
  }
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
