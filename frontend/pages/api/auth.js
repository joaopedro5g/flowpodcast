import withSession from '../../utils/session';

export default withSession(async (req,res) => {
  const { email, password } = req.query;
  const user = await fetch('http://localhost:3333/auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => res.json());
  req.session.set('user', user.token);
  await req.session.save();
  return res.json({ sucess: true, token: user.token });
})