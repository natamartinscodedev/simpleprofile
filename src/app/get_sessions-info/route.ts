import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

export default async function handler(req: any, res: any) {
  const { session_id } = req.query

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    return res.status(200).json(session) // Retorna os dados da sessão
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
