import db from '../database/UserData.json';
import Scopes from '../utils/scopes.json';

import jsonwebtoken from 'jsonwebtoken';

export default class AuthController {
  async store(req,res) {
    const { email,password } = req.body;
    const user = db.filter(u => u.email == email && u.senha == password);
    if(user.length > 0) {
      const token = await jsonwebtoken.sign({id: user[0].id, scopes: Scopes.scopes}, process.env.KEY_JWT);
      return res.json({token});
    } else {
      return res.status(404).json({
        error: 'User not found',
        code: 404
      });
    }
  }
}