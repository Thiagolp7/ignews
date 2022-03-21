import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { query as q} from 'faunadb'
import { stripe } from "../../services/stripe";


type User = {
  ref: string;
  data: {
    stripe_customer_id: string;
  }
}

async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  
  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session.user.email)     
      )
    )
  )

  let stripeCustomerId = user.data.stripe_customer_id

  if(!stripeCustomerId){
    const stripeCustomer = await stripe.customers.create(
      {
        email: session.user.email,
        name: session.user.name
      } 
    )

    await fauna.query(
      q.Update(
        user.ref,
        {
          data: {
            stripe_customer_id: stripeCustomer.id
          } 
        }
      )
    )

    stripeCustomerId = stripeCustomer.id
  }
    
  if(req.method === 'POST'){
    const stripeCheckoutSession = await stripe.checkout.sessions.create(
      {
        customer: stripeCustomerId ,
        mode: 'subscription' ,
        cancel_url: process.env.STRIPE_CANCEL_URL,
        success_url: process.env.STRIPE_SUCCESS_URL,
        payment_method_types: ['card'],
        allow_promotion_codes: true,
        line_items: [{
          price: 'price_1KWOWmKnizw78TtYJhPsQFaB',
          quantity: 1
        }],
        billing_address_collection: 'required'
      }
    )
    
    return res.status(200).json({ sessionId: stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'Post')
    res.status(405).end('Method not allowed.')
  }
}