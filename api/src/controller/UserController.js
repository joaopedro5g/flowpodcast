import db from '../database/UserData.json';

export default class UserController {
  async show(req,res) {
    const { id } = req.params;
    const data = db.filter(d => d.id === id);
    if(data.length <= 0) {
      return res.status(404).json({
        error: 'Not found user with id',
        code: 404
      })
    }
    return res.json({...data[0],senha: undefined});
  }
}