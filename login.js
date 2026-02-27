export default function handler(req,res){
  const {phone,password} = req.body;

  if(phone && password){
    res.json({success:true, token:"demo-token-123"});
  }else{
    res.status(401).json({success:false});
  }
}