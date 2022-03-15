import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"
import { query as q } from "faunadb"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      const userEmail = user.email
      
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                 q.Index('user_by_email'),
                 q.Casefold(userEmail)   
                )
              )
            ), 
            q.Create(
              q.Collection('users'),
              { data: { email: userEmail }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(userEmail)     
              )
            )
          )
        )
        return true
      } catch {
        return false
      }
    }
  }
})
