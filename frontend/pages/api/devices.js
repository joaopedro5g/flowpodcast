import withSession from '../../utils/session';

export default withSession(async (req,res) => {
  const user = req.session.get('user');
  const devices = await fetch(`http://localhost:3333/device?token=${user}`).then(res => res.json());
  return res.json(devices);
});