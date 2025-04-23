// This is your test secret API key.
const Stripe = require('stripe');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors(
    {
        // origin: true,
        "Access-Control-Allow-Origin": "*",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const YOUR_DOMAIN = 'http://localhost:8000';
app.post('/create-payment-session', async (req, res) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        const { productList } = req.body;

        const session = await stripe.checkout.sessions.create({
            line_items: productList.map(product => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            })),
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error('Stripe session creation failed:', error);
        res.status(500).json({ error: 'Stripe session creation failed' });
    }
});


app.listen(8000, () => console.log('Running on port 8000'));

