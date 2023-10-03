import mercadopago from 'mercadopago'
import { HOST, MERCADOPAGO_API_KEY } from '../config.js';


export const createOrder = async (req , res) => {
    mercadopago.configure({
        access_token:MERCADOPAGO_API_KEY,
    });

    var preference = {
        items: [
          {
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
          }
        ],
        back_urls:{
            success:`${HOST}/success`,
            failure:`${HOST}/failure`,
            pending:`${HOST}/pending`,
        },
        notification_url:"https://29c2-181-230-170-151.ngrok.io/webhook",
      };
      
      const result = await mercadopago.preferences.create(preference)
    console.log(result)

    res.send(result.body)
}

export const receiveWebhook = async (req, res) => {
  const payment = (req.query)
try {

  if (payment.type === 'payment'){
    const data = await mercadopago.payment.findById(payment['data.id']);
    console.log(data)
    //store in database
  }
  
  res.sendStatus(204)
} catch (error) {
  console.log(error);
  return res.sendStatus(500).json({error: error.message});
}
}