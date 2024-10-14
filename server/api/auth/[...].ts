import { NuxtAuthHandler } from "#auth"
import GithubProvider from "@auth/core/providers/github"
import type { AuthConfig } from "@auth/core/types"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "~/lib/prisma"

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  adapter: PrismaAdapter(prisma) as any,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 1209600 },
  providers: [
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url
        }
      },
      allowDangerousEmailAccountLinking: true
    })
  ],
  callbacks: {
    signIn: ({ user }) => {
      console.log("signIn", user)

      try {
        if (!user.email || !user) {
          return false
        }

        const existingUser = prisma.user.findUnique({
          where: { email: user.email }
        })

        if (!existingUser) {
          const newUser = prisma.user.create({
            data: {
              email: user.email || `${user.id}@example.com`,
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
