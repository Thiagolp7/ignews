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
  // Pegars Subscription pelo user email e que está ativa
  callbacks: {
    async session({ session, user, token}){
      const userEmail = session.user.email
      
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(userEmail)
                    )
                  )
                )
              )
            ,
              q.Match(
                q.Index('subscription_by_status'),
                'active'
              )
            ])
          )
        )
          

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch(err) {
        console.log(err.message)
        return {
          ...session,
          activeSubscription: null
        }
      }
    },
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

