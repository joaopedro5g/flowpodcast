import jsonwebtoken from 'jsonwebtoken';
export default async function(req,res) {
  const { scopes, id } = req.query;
  const scopesArr = scopes.split(',');
  const token = await jsonwebtoken.sign({ id, scopes: scopesArr }, process.env.KEY_JWT);
  return res.json({
    token
  });
}