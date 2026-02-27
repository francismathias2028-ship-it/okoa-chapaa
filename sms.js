export default function handler(req,res){
  const {from, message} = req.body;
  console.log("SMS RECEIVED:", from, message);
  res.json({status:"received"});
}