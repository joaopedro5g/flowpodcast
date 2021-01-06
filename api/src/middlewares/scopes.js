import jsonwebtoken from 'jsonwebtoken';
export default function Scopes(req,res,next) {
  const { token } = req.query;
  try {
    const { id, scopes } = jsonwebtoken.verify(token, process.env.KEY_JWT);
    res.scopes = scopes;
    return next();
  } catch (e) {
    return res.status(401).json({
      error: 'You not authorization',
      code: 401
    });
  }
}