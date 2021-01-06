import jwt from 'jsonwebtoken';
import withSession from '../../utils/session';
export default withSession(async (req,res) => {
  const key = process.env.key_jwt;
  const session = req.session.get('user')
  const { id } = await jwt.decode(session, key);
  const user = await fetch(`http://localhost:3333/user/${id}`).then(res => res.json());
  return res.json({...user, session});
})