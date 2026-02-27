let users = [];

export default function handler(req,res){
  const {name, phone, password} = req.body;
  users.push({name, phone, password});
  res.json({success:true, message:"User registered"});
}