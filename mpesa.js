import axios from "axios";

export default async function handler(req,res){
  const {phone, amount} = req.body;

  const auth = Buffer.from(
    process.env.MPESA_CONSUMER_KEY + ":" + process.env.MPESA_CONSUMER_SECRET
  ).toString("base64");

  const tokenRes = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers:{Authorization:`Basic ${auth}`} }
  );

  const access_token = tokenRes.data.access_token;

  const timestamp = new Date().toISOString().replace(/[^0-9]/g,"").slice(0,14);

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString("base64");

  const stk = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "OkoaChapaa",
      TransactionDesc: "Loan Fee"
    },
    { headers:{Authorization:`Bearer ${access_token}`} }
  );

  res.json(stk.data);
}