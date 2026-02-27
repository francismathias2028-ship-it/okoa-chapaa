export default function handler(req,res){
  const eligible = Math.random() > 0.3;
  res.json({
    eligible,
    amount: eligible ? 5000 : 0
  });
}