# Stripe Setup for Vercel Serverless Functions

## Environment Variables Needed

### Backend (Vercel)

- `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
- `STRIPE_WEBHOOK_SECRET` - Webhook endpoint secret from Stripe dashboard

### Frontend (React)

- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (starts with `pk_test_` or `pk_live_`)

## Setup Steps

1. **Get your Stripe keys** from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. **Set environment variables in Vercel:**
   - Go to your Vercel project settings
   - Add the environment variables above
   - Redeploy your project

3. **Set up webhook endpoint:**
   - In Stripe Dashboard, go to Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

4. **Test the integration:**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

## How It Works

1. User fills out donation form (name + amount)
2. Frontend calls `/api/create-checkout-session`
3. Vercel function creates Stripe checkout session
4. User redirected to Stripe's hosted payment page
5. After payment, Stripe sends webhook to `/api/stripe-webhook`
6. User redirected back to success/cancel page
